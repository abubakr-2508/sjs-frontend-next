import { create } from "zustand";

import type { User } from "@/types/auth";

/**
 * Auth state for the Next.js client.
 *
 * Cookie-based auth (httpOnly access_token + refresh_token) means the
 * browser sends the token automatically and JavaScript cannot read it.
 * So this store NO LONGER tracks tokens — it only holds the in-memory
 * user profile and loading state. Route protection is enforced server-side
 * by middleware.ts using the cookie's JWT.
 *
 * Sign-in:
 *   - Call /login/verify-otp (backend sets cookies)
 *   - Fetch /fetchProfile (or use whatever the login response returns)
 *   - Call setUser(user)
 *
 * Sign-out:
 *   - Call /logout (backend clears cookies)
 *   - Call setUser(null)
 *
 * The previous Vite version exposed `token`, `refreshToken`,
 * `isAuthenticated`, `login()`, `logout()` directly. Those have been
 * removed because they don't apply to cookie-based auth. Consumers that
 * referenced them (use-auth-init, login-page, the now-obsolete
 * protected-route + role-guard guards) are updated as they're ported.
 */
interface AuthStore {
  user: User | null;
  isLoading: boolean;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
