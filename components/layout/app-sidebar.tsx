import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tasks", label: "Tasks" },
  { href: "/board", label: "Board" },
  { href: "/ai-summary", label: "AI Summary" },
  { href: "/team", label: "Team" },
  { href: "/settings", label: "Settings" }
];

export function AppSidebar() {
  return (
    <aside className="border-border bg-panel lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:border-r">
      <div className="px-5 py-5">
        <Link href="/dashboard" className="block">
          <p className="text-sm font-medium text-accent">FlowDesk AI</p>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </Link>
        <nav className="mt-6 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted hover:bg-background hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
