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
