"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DemoSession } from "@/lib/demo-auth";
import { demoWorkspace } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", hint: "Overview" },
  { href: "/tasks", label: "Tasks", hint: "List" },
  { href: "/board", label: "Board", hint: "Status" },
  { href: "/ai-summary", label: "AI Summary", hint: "Mock" },
  { href: "/team", label: "Team", hint: "Workload" },
  { href: "/settings", label: "Settings", hint: "Demo" }
];

type AppSidebarProps = {
  demoSession: DemoSession | null;
};

export function AppSidebar({ demoSession }: AppSidebarProps) {
  const pathname = usePathname();
  const isLoggedIn = Boolean(demoSession);

  return (
    <aside className="border-border bg-panel/95 lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:border-r">
      <div className="px-4 py-4 sm:px-5 lg:flex lg:h-full lg:flex-col lg:py-6">
        <Link href={isLoggedIn ? "/dashboard" : "/login"} className="block">
          <p className="text-xs font-semibold uppercase text-accent">
            FlowDesk AI
          </p>
          <h1 className="mt-1 text-lg font-semibold">Dashboard</h1>
          <p className="mt-1 text-xs text-muted">{demoWorkspace.name}</p>
        </Link>

        <div className="mt-5 hidden rounded-lg border border-border bg-background px-3 py-3 lg:block">
          <p className="text-xs font-medium text-muted">
            {isLoggedIn ? "Demo role" : "Demo access"}
          </p>
          <p className="mt-1 text-sm font-semibold">
            {demoSession?.roleLabel ?? "Sign in required"}
          </p>
        </div>

        {isLoggedIn ? (
          <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group min-w-max rounded-md border border-transparent px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-border hover:bg-background hover:text-foreground lg:min-w-0",
                  pathname === item.href &&
                    "border-border bg-background text-foreground shadow-sm"
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                <span className="flex items-center justify-between gap-4">
                  <span>{item.label}</span>
                  <span className="hidden text-xs font-normal text-muted lg:inline">
                    {item.hint}
                  </span>
                </span>
              </Link>
            ))}
          </nav>
        ) : null}

        <div className="mt-auto hidden border-t border-border pt-5 text-xs leading-5 text-muted lg:block">
          <p>Scope guard</p>
          <p>
            Demo auth and AI preview remain. Task data runs server-side through
            Prisma.
          </p>
        </div>
      </div>
    </aside>
  );
}
