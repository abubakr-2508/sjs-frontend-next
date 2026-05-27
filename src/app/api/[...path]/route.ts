import { NextRequest, NextResponse } from "next/server";

/**
 * Catch-all proxy for the SJS backend.
 *
 * Every browser request to `/api/<anything>` is handled by this route,
 * which forwards method + selected headers + body to
 * BACKEND_API_URL/<anything>.
 *
 * Why a proxy?
 * - Keeps API calls same-origin from the browser's POV (localhost:3000 →
 *   localhost:3000/api/...).
 * - That makes the backend's SameSite=Lax cookies flow correctly on XHR
 *   (cross-site XHR with SameSite=Lax would otherwise be blocked).
 */

const BACKEND_API_URL =
  process.env.BACKEND_API_URL ??
  "https://api.secondjobsearch.com";

// Force this route to be dynamic so Next.js never caches the response.
// Critical: without this, GET responses get cached and we'd see stale
// 401s after a successful login.
export const dynamic = "force-dynamic";

// Allow this route to receive any HTTP method.
export const runtime = "nodejs";

async function proxy(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const targetUrl =
    `${BACKEND_API_URL}/${path.join("/")}` +
    req.nextUrl.search;

  const hasBody =
    req.method !== "GET" &&
    req.method !== "HEAD" &&
    req.method !== "OPTIONS";

  // Read body as text. JSON bodies survive as exact bytes; multipart/binary
  // would need a different approach, but we don't have those endpoints yet.
  const bodyText = hasBody
    ? await req.text()
    : undefined;

  // Forward only essential headers — the safer minimum set.
  const forwardHeaders: Record<string, string> = {};

  const contentType = req.headers.get(
    "content-type"
  );
  if (contentType) {
    forwardHeaders["content-type"] =
      contentType;
  }

  // Filter Cookie header — only forward auth-relevant cookies, drop the
  // rest. The browser accumulates many cookies for localhost (dev tools,
  // old test sessions, RSC payloads, etc.) and a large Cookie header
  // can trip the backend's nginx `client_header_buffer_size` limit
  // (default ~8 KB), resulting in a 400 before the request even reaches
  // Node.
  const rawCookie =
    req.headers.get("cookie");
  if (rawCookie) {
    const ALLOWED_COOKIES = new Set([
      "access_token",
      "refresh_token",
    ]);
    const authCookies = rawCookie
      .split(";")
      .map((c) => c.trim())
      .filter((c) => {
        const eq = c.indexOf("=");
        const name =
          eq >= 0
            ? c.slice(0, eq)
            : c;
        return ALLOWED_COOKIES.has(
          name
        );
      });
    if (authCookies.length > 0) {
      forwardHeaders["cookie"] =
        authCookies.join("; ");
    }
  }

  const authorization = req.headers.get(
    "authorization"
  );
  if (authorization) {
    forwardHeaders["authorization"] =
      authorization;
  }

  const userAgent = req.headers.get(
    "user-agent"
  );
  if (userAgent) {
    forwardHeaders["user-agent"] =
      userAgent;
  }

  const accept = req.headers.get("accept");
  if (accept) {
    forwardHeaders["accept"] = accept;
  }

  // Dev-only logging — helps debug the proxy
  if (process.env.NODE_ENV !== "production") {
    console.log(
      `[proxy] ${req.method} ${req.nextUrl.pathname} → ${targetUrl}`
    );
    if (hasBody) {
      console.log(
        `[proxy]   body (${bodyText?.length ?? 0} bytes):`,
        bodyText?.slice(0, 200)
      );
    }
    if (rawCookie) {
      const filteredCookie =
        forwardHeaders["cookie"];
      console.log(
        `[proxy]   cookies: ${rawCookie.length} bytes in → ${
          filteredCookie?.length ?? 0
        } bytes forwarded`
      );
    }
  }

  let backendResponse: Response;
  try {
    backendResponse = await fetch(
      targetUrl,
      {
        method: req.method,
        headers: forwardHeaders,
        body: bodyText,
        redirect: "manual",
        // No `cache` option — we always go to network
        cache: "no-store",
      }
    );
  } catch (err) {
    console.error(
      "[proxy] fetch failed:",
      err
    );
    return NextResponse.json(
      { error: "Proxy fetch failed" },
      { status: 502 }
    );
  }

  // Read response body as bytes (works for JSON, text, binary)
  const responseBody =
    await backendResponse.arrayBuffer();

  if (process.env.NODE_ENV !== "production") {
    const responsePreview = new TextDecoder().decode(
      responseBody.slice(0, 200)
    );
    console.log(
      `[proxy]   ← ${backendResponse.status} (${responseBody.byteLength} bytes): ${responsePreview}`
    );
  }

  // Build response headers, forwarding most things
  const responseHeaders = new Headers();
  backendResponse.headers.forEach(
    (value, key) => {
      const lower = key.toLowerCase();
      // Skip hop-by-hop response headers and Set-Cookie (handled below)
      if (
        lower !== "content-encoding" &&
        lower !== "content-length" &&
        lower !== "transfer-encoding" &&
        lower !== "connection" &&
        lower !== "set-cookie"
      ) {
        responseHeaders.set(key, value);
      }
    }
  );

  // Set-Cookie can have multiple values — forward each one individually.
  const setCookies =
    backendResponse.headers.getSetCookie();
  for (const cookie of setCookies) {
    responseHeaders.append(
      "set-cookie",
      cookie
    );
  }

  return new NextResponse(responseBody, {
    status: backendResponse.status,
    statusText:
      backendResponse.statusText,
    headers: responseHeaders,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const OPTIONS = proxy;
export const HEAD = proxy;
