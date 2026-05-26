# Backend Auth Migration Spec — httpOnly Cookie

**Context:** The SJS frontend is being ported to Next.js. As part of this, we are migrating JWT storage from `localStorage` (sent as `Authorization: Bearer ...`) to **httpOnly cookies** set by the backend. This is a security upgrade (XSS-resistant) and a Next.js middleware enablement (server-side cookie reading for route protection without DB round-trips).

This document lists the 11 backend changes required. All references are to files in `C:\Users\HP OMEN\SecondJobSearch_Backend-main\`.

**Frontend changes are out of scope for the backend dev** — those happen on the Next.js side after backend ships.

---

## Pre-requisites

```bash
npm install cookie-parser
```

---

## Change 1 — Register cookie-parser middleware (`app.js`)

Add **before** the routes registration:

```js
const cookieParser = require("cookie-parser");
app.use(cookieParser());
```

---

## Change 2 — Add Next.js dev origin to CORS (`app.js`)

In the `allowedOrigins` array, add `http://localhost:3000` alongside the existing Vite origin:

```js
const allowedOrigins = [
  "http://localhost:3000",  // Next.js dev — NEW
  "http://localhost:3003",
  "http://localhost:5173",  // can be removed once Vite codebase is retired
  "http://127.0.0.1:5173",
  "https://demo.secondjobsearch.com",
];
```

CORS already has `credentials: true` set — no other change needed here.

---

## Change 3 — Unify JWT payload to include role

**Problem:** The OTP-login access token is signed with `{ id }` only, while the Google OAuth token includes `{ id, email, role }`. This inconsistency blocks the Next.js middleware from making role-based routing decisions without a DB query.

**Fix:** In `controllers/userController_new.js`, the `generateAccessToken` helper must include `role` in the payload. Look up role from the User document at sign-time:

```js
async function generateAccessToken(userId) {
  const user = await User.findById(userId).select('role');
  if (!user) throw new Error('User not found');
  return jwt.sign(
    { id: userId, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}
```

Every call site of `generateAccessToken(user._id)` must `await` it.

The refresh token can stay as `{ id }` only — only the access token needs role.

---

## Change 4 — Set cookies in `loginWithOtp` (`userController_new.js` line ~726)

**Before:**
```js
return res.json({ token: accessToken, refreshToken, role: user.role });
```

**After:**
```js
res.cookie('access_token', accessToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 1000,        // 1 hour — match JWT expiry
  path: '/',
});

res.cookie('refresh_token', refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days — match refresh JWT expiry
  path: '/refresh-token',           // narrow scope: only sent to refresh endpoint
});

return res.json({ success: true, role: user.role });
```

The `role` stays in the JSON body so the frontend can immediately redirect to the right dashboard without decoding the token client-side.

---

## Change 5 — Read refresh token from cookie (`userController_new.js` line ~1614)

**Before:**
```js
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "Refresh token is required" });
    // ... validation ...
    const newAccessToken = generateAccessToken(user._id);
    return res.json({ accessToken: newAccessToken });
  } catch (...) {}
}
```

**After:**
```js
const refreshTokenHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) return res.status(401).json({ message: "Refresh token required" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = await generateAccessToken(user._id);

    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
      path: '/',
    });

    return res.json({ success: true });
  } catch (error) {
    console.error("Error refreshing token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
```

Note: the export name was previously `refreshToken` which conflicts with the local variable. Consider renaming to `refreshTokenHandler` (also update the export at line ~1655 and the route in `userRoutes_new.js` line 19).

---

## Change 6 — Clear cookies in `logout` (`userController_new.js` line ~1178)

In the existing `logout` function, after clearing the DB refresh token, also clear the cookies:

```js
res.clearCookie('access_token', { path: '/' });
res.clearCookie('refresh_token', { path: '/refresh-token' });
return res.json({ success: true });
```

---

## Change 7 — Update auth middleware to prefer cookie (`middleware/authMiddleware.js`)

For backward compatibility during the transition, read the cookie first, fall back to Bearer header:

**Before:**
```js
const authHeader = req.header("Authorization");
if (!authHeader || !authHeader.startsWith("Bearer ")) {
  return res.status(401).json({ message: "Unauthorized" });
}
const token = authHeader.replace("Bearer ", "");
```

**After:**
```js
const token = req.cookies?.access_token
            || req.header("Authorization")?.replace("Bearer ", "");

if (!token) {
  return res.status(401).json({ message: "Unauthorized" });
}
```

Rest of the middleware (JWT verify + `User.findById` + `req.user = user`) stays unchanged.

---

## Change 8 — Move hardcoded URLs to env vars

**`config/passport.js` line 12:** Replace hardcoded `callbackURL`:

```js
// Before:
callbackURL: 'http://localhost:3003/auth/google/callback',
// After:
callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
```

**`controllers/authController.js` `googleCallback` (if still used, lines 14 and 18):** Replace hardcoded frontend URLs:

```js
// Before:
const redirectURL = `http://localhost:5173/auth/callback?token=${token}&role=${req.user.role}`;
res.redirect(redirectURL);
// ... and the error redirect:
res.redirect("http://localhost:5173/auth/callback?error=true");

// After (set cookie + redirect without token in URL):
res.cookie('access_token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 1000,
  path: '/',
});
res.redirect(`${process.env.FRONTEND_URL}/auth/callback?role=${req.user.role}`);
// Error case:
res.redirect(`${process.env.FRONTEND_URL}/auth/callback?error=true`);
```

⚠️ Putting the token in the URL is a security smell — it ends up in browser history, referer headers, and server logs. The cookie approach is strictly better.

---

## Change 9 — Add new env vars to `.env`

```
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3003
```

And in production:
```
FRONTEND_URL=https://app.secondjobsearch.com    # or wherever the Next.js app deploys
BACKEND_URL=https://api.secondjobsearch.com
```

---

## Change 10 — (Optional cleanup) Delete dead code

The following files are dead code that mirrors but contradicts the active flow. Recommend deleting to prevent future confusion:

- `controllers/authController.js` — duplicate-but-different logic. Real auth lives in `userController_new.js`.
- `routes/authRoutes.js` — commented out in `routes/index.js` already.

If anything in `authController.js` is actually still used (e.g., the orphaned `googleCallback`), move that logic into `userController_new.js` first.

---

## Change 11 — (Optional but recommended) Same-domain deployment

The cleanest production setup is hosting the frontend and backend on subdomains of the same parent domain (e.g., `app.secondjobsearch.com` for the Next.js app and `api.secondjobsearch.com` for the backend). Then:

- Set cookies on the parent domain: add `domain: '.secondjobsearch.com'` to the cookie options in changes 4 and 5
- Cookies work seamlessly across subdomains
- `sameSite: 'lax'` is sufficient (no need for `'none'`)

If the apps are on different parent domains, cookies still work but need `sameSite: 'none'` + `secure: true` and explicit cross-origin cookie handling. Doable but more friction. Same-domain is the strong recommendation.

---

## Verification checklist (when done)

The backend dev can confirm completion by running through these checks:

- [ ] `npm install cookie-parser` — installed
- [ ] `cookieParser()` middleware registered before routes in `app.js`
- [ ] `http://localhost:3000` in `allowedOrigins`
- [ ] `generateAccessToken` now includes `role` in payload — verify by decoding a fresh OTP-login token at jwt.io and confirming `role` claim is present
- [ ] `loginWithOtp` response body is `{ success: true, role }` — no token in body
- [ ] After login, browser DevTools shows `access_token` and `refresh_token` cookies marked `HttpOnly` ✓ `Secure` (in prod) ✓ `SameSite=Lax`
- [ ] `refresh-token` endpoint reads from cookie, sets new cookie, returns `{ success: true }`
- [ ] `logout` clears both cookies (DevTools shows them gone)
- [ ] `authMiddleware` works with either cookie OR Bearer header (test both)
- [ ] No hardcoded `localhost:5173` or `localhost:3003` remains in `passport.js`, `authController.js`
- [ ] `.env` has `FRONTEND_URL` and `BACKEND_URL`
- [ ] Existing Vite-based frontend still works (Bearer fallback) — no regression

---

## What happens after backend ships

Once the backend dev confirms all 11 changes are in and the verification checklist passes:

1. The Next.js port resumes (Step 3 of the port plan)
2. `lib/api/client.ts` is configured with `withCredentials: true` (axios sends cookies automatically)
3. `middleware.ts` reads the `access_token` cookie, decodes with `jwt-decode`, makes role-based routing decisions
4. All `localStorage.getItem("access_token")` + inline `jwtDecode` code in components is deleted
5. End-to-end test: login on the Next.js app → cookies set by backend → middleware reads cookie → protected routes work → API calls authenticate via cookie

---

## Questions for the backend dev (optional, before starting)

- Does `generateAccessToken` need to remain synchronous anywhere? (Making it async — Change 3 — requires `await` at all call sites.)
- Are there other endpoints I missed that issue JWTs (admin login? employer-specific flow?) that also need to set cookies?
- Is the production deployment on subdomains of one parent domain, or fully separate domains? (Affects `domain` cookie attribute.)
- Are there any third-party integrations that depend on the Bearer header pattern? (If yes, keep the fallback in `authMiddleware` permanently, not just transitionally.)
