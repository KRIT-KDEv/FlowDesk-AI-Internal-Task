import { demoWorkspace } from "@/lib/mock-data";

export function AppTopbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-panel/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase text-muted">
            Demo workspace
          </p>
          <p className="text-sm font-semibold">{demoWorkspace.name}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-medium text-muted">
          <span className="rounded-full border border-border bg-background px-2.5 py-1">
            Mock auth
          </span>
          <span className="rounded-full border border-border bg-background px-2.5 py-1">
            Mock AI
          </span>
          <span className="rounded-full border border-border bg-background px-2.5 py-1">
            Prisma data
          </span>
        </div>
      </div>
    </header>
  );
}
