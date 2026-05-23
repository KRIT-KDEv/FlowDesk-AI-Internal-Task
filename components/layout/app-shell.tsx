import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppTopbar } from "@/components/layout/app-topbar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="min-h-screen lg:pl-64">
        <AppTopbar />
        <div className="px-5 py-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
