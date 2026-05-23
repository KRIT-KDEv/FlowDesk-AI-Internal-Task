import { demoWorkspace } from "@/lib/mock-data";

export function AppTopbar() {
  return (
    <header className="border-b border-border bg-panel px-5 py-4 lg:px-8">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">Demo workspace</p>
          <p className="font-semibold">{demoWorkspace.name}</p>
        </div>
        <p className="text-sm text-muted">Mock auth - Mock AI - No database</p>
      </div>
    </header>
  );
}
