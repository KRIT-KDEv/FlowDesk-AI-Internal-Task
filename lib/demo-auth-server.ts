import { cookies } from "next/headers";

import {
  DEMO_AUTH_COOKIE_NAME,
  demoRoleLabels,
  isValidDemoRole,
  type DemoRole,
  type DemoSession
} from "@/lib/demo-auth";

const demoCookieMaxAge = 60 * 60 * 8;

export function getDemoSession(): DemoSession | null {
  const role = cookies().get(DEMO_AUTH_COOKIE_NAME)?.value;

  if (!isValidDemoRole(role)) {
    return null;
  }

  return {
    role,
    roleLabel: demoRoleLabels[role]
  };
}

export function loginDemoUser(role: DemoRole) {
  cookies().set({
    name: DEMO_AUTH_COOKIE_NAME,
    value: role,
    httpOnly: true,
    maxAge: demoCookieMaxAge,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });
}

export function logoutDemoUser() {
  cookies().set({
    name: DEMO_AUTH_COOKIE_NAME,
    value: "",
    maxAge: 0,
    path: "/"
  });
}
