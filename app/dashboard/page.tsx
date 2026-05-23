import { demoMembers, demoTasks, demoWorkspace } from "@/lib/mock-data";

export default function DashboardPage() {
  const overdueTasks = demoTasks.filter((task) => task.isOverdue);
  const highPriorityTasks = demoTasks.filter(
    (task) => task.priority === "HIGH" || task.priority === "URGENT"
  );

  return (
    <main className="space-y-6">
      <section>
        <p className="text-sm font-medium text-accent">Dashboard overview</p>
        <h1 className="text-3xl font-semibold">{demoWorkspace.name}</h1>
        <p className="mt-2 text-muted">
          Placeholder overview for task status, overdue work, workload, and AI
          summary previews.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-border bg-panel p-4">
          <p className="text-sm text-muted">Total tasks</p>
          <p className="mt-2 text-2xl font-semibold">{demoTasks.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-panel p-4">
          <p className="text-sm text-muted">Overdue</p>
          <p className="mt-2 text-2xl font-semibold">{overdueTasks.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-panel p-4">
          <p className="text-sm text-muted">High priority</p>
          <p className="mt-2 text-2xl font-semibold">
            {highPriorityTasks.length}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-panel p-4">
          <p className="text-sm text-muted">Team members</p>
          <p className="mt-2 text-2xl font-semibold">{demoMembers.length}</p>
        </div>
      </section>
    </main>
  );
}
