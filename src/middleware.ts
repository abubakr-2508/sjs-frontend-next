import { NextResponse, type NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

type Role = "candidate" | "employer" | "admin" | "super-admin";

interface JwtPayload {
  id: string;
  role: Role;
  iat?: number;
  exp?: number;
}

const PROTECTED_PREFIXES = ["/candidate", "/employer", "/admin"] as const;
const AUTH_ROUTES = ["/login", "/register"] as const;

const DASHBOARD_FOR_ROLE: Record<Role, string> = {
  candidate: "/candidate/dashboard",
  employer: "/employer/dashboard",
  admin: "/admin/dashboard",
  "super-admin": "/admin/dashboard",
};

function clearAndRedirectToLogin(request: NextRequest, from?: string) {
  const url = new URL("/login", request.url);
  if (from) url.searchParams.set("from", from);
  const response = NextResponse.redirect(url);
  response.cookies.delete("access_token");
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname === r);

  // No token: only block protected routes
  if (!token) {
    if (isProtected) {
      const url = new URL("/login", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Has token: decode (no signature verification — backend handles that on protected API calls)
  let decoded: JwtPayload;
  try {
    decoded = jwtDecode<JwtPayload>(token);
  } catch {
    return clearAndRedirectToLogin(request, isProtected ? pathname : undefined);
  }

  // Token expired
  if (decoded.exp && decoded.exp * 1000 < Date.now()) {
    return clearAndRedirectToLogin(request, isProtected ? pathname : undefined);
  }

  // Logged-in user hitting an auth route → send to their dashboard
  if (isAuthRoute) {
    const dashboard = DASHBOARD_FOR_ROLE[decoded.role];
    if (dashboard) {
      return NextResponse.redirect(new URL(dashboard, request.url));
    }
    return NextResponse.next();
  }

  // Role mismatches on protected routes
  if (pathname.startsWith("/candidate") && decoded.role !== "candidate") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
  if (pathname.startsWith("/employer") && decoded.role !== "employer") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
  if (
    pathname.startsWith("/admin") &&
    decoded.role !== "admin" &&
    decoded.role !== "super-admin"
  ) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static  (Next.js static assets)
     * - _next/image   (Next.js image optimization endpoint)
     * - favicon.ico
     * - public image files (svg, png, jpg, jpeg, gif, webp, ico)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
