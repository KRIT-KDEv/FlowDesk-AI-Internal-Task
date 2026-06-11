import { NextResponse, type NextRequest } from "next/server";

import {
  canAccessDemoRoute,
  DEMO_AUTH_COOKIE_NAME,
  isProtectedDemoRoute,
  isValidDemoRole
} from "@/lib/demo-auth";

function getDemoRole(request: NextRequest) {
  const role = request.cookies.get(DEMO_AUTH_COOKIE_NAME)?.value;

  return isValidDemoRole(role) ? role : null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const demoRole = getDemoRole(request);
  const isLoggedIn = Boolean(demoRole);

  if (!isLoggedIn && isProtectedDemoRoute(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    demoRole &&
    isProtectedDemoRoute(pathname) &&
    !canAccessDemoRoute(demoRole, pathname)
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    "/tasks/:path*",
    "/board/:path*",
    "/ai-summary/:path*",
    "/team/:path*",
    "/settings/:path*"
  ]
};
