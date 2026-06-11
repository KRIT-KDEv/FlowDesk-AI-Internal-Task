import type { DemoSession } from "@/lib/demo-auth";
import { demoWorkspace } from "@/lib/mock-data";
import { logoutDemoAction } from "@/app/login/actions";

type AppTopbarProps = {
  demoSession: DemoSession | null;
};

export function AppTopbar({ demoSession }: AppTopbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-panel/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase text-muted">
            Demo workspace
          </p>
          <p className="text-sm font-semibold">{demoWorkspace.name}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
          <span className="rounded-full border border-border bg-background px-2.5 py-1">
            {demoSession ? `Demo role: ${demoSession.roleLabel}` : "Demo auth"}
          </span>
          <span className="rounded-full border border-border bg-background px-2.5 py-1">
            Mock AI
          </span>
          <span className="rounded-full border border-border bg-background px-2.5 py-1">
            Prisma data
          </span>
          {demoSession ? (
            <form action={logoutDemoAction}>
              <button
                className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted transition hover:border-red-200 hover:text-red-700"
                type="submit"
              >
                Logout
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </header>
  );
}
