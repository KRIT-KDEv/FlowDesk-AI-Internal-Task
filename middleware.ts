import { NextResponse, type NextRequest } from "next/server";

import {
  DEMO_AUTH_COOKIE_NAME,
  isProtectedDemoRoute,
  isValidDemoRole
} from "@/lib/demo-auth";

function hasDemoSession(request: NextRequest) {
  return isValidDemoRole(request.cookies.get(DEMO_AUTH_COOKIE_NAME)?.value);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = hasDemoSession(request);

  if (!isLoggedIn && isProtectedDemoRoute(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && pathname === "/login") {
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
