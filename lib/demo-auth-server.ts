import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  canCreateDemoTask,
  canDeleteDemoTask,
  canEditDemoTask,
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

function redirectUnauthorizedMutation(): never {
  redirect("/tasks");
}

export function requireDemoCreateTaskPermission() {
  const demoSession = getDemoSession();

  if (!demoSession || !canCreateDemoTask(demoSession.role)) {
    redirectUnauthorizedMutation();
  }

  return demoSession;
}

export function requireDemoEditTaskPermission() {
  const demoSession = getDemoSession();

  if (!demoSession || !canEditDemoTask(demoSession.role)) {
    redirectUnauthorizedMutation();
  }

  return demoSession;
}

export function requireDemoDeleteTaskPermission() {
  const demoSession = getDemoSession();

  if (!demoSession || !canDeleteDemoTask(demoSession.role)) {
    redirectUnauthorizedMutation();
  }

  return demoSession;
}
