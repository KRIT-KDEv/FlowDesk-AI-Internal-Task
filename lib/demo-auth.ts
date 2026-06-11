export const DEMO_AUTH_COOKIE_NAME = "flowdesk_demo_role";

export const demoRoles = ["admin", "manager", "viewer"] as const;

export type DemoRole = (typeof demoRoles)[number];

export type DemoSession = {
  role: DemoRole;
  roleLabel: string;
};

export const demoRoleLabels: Record<DemoRole, string> = {
  admin: "Admin",
  manager: "Manager",
  viewer: "Viewer"
};

export const protectedDemoRoutePrefixes = [
  "/dashboard",
  "/tasks",
  "/board",
  "/ai-summary",
  "/team",
  "/settings"
] as const;

const taskDetailPattern = /^\/tasks\/[^/]+$/;
const taskEditPattern = /^\/tasks\/[^/]+\/edit$/;

function normalizePathname(pathname: string) {
  if (pathname.length <= 1) {
    return pathname;
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function isValidDemoRole(role: unknown): role is DemoRole {
  return (
    typeof role === "string" &&
    (demoRoles as readonly string[]).includes(role)
  );
}

export function isProtectedDemoRoute(pathname: string) {
  return protectedDemoRoutePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function canCreateDemoTask(role: DemoRole) {
  return role === "admin" || role === "manager";
}

export function canEditDemoTask(role: DemoRole) {
  return role === "admin" || role === "manager";
}

export function canDeleteDemoTask(role: DemoRole) {
  return role === "admin";
}

export function canShowDemoDeleteTaskAction(role: DemoRole) {
  return canDeleteDemoTask(role);
}

export function canViewDemoTeam(role: DemoRole) {
  return role === "admin" || role === "manager";
}

export function canViewDemoSettings(role: DemoRole) {
  return role === "admin";
}

export function canAccessDemoRoute(role: DemoRole, pathname: string) {
  const route = normalizePathname(pathname);

  if (route === "/dashboard") {
    return true;
  }

  if (route === "/tasks/new") {
    return canCreateDemoTask(role);
  }

  if (taskEditPattern.test(route)) {
    return canEditDemoTask(role);
  }

  if (route === "/tasks" || taskDetailPattern.test(route)) {
    return true;
  }

  if (route === "/board" || route === "/ai-summary") {
    return true;
  }

  if (route === "/team") {
    return canViewDemoTeam(role);
  }

  if (route === "/settings") {
    return canViewDemoSettings(role);
  }

  return false;
}
