import { TASK_STATUS_COLUMNS, demoTasks } from "@/lib/mock-data";

export default function BoardPage() {
  return (
    <main className="space-y-6">
      <section>
        <p className="text-sm font-medium text-accent">Basic Kanban board</p>
        <h1 className="text-3xl font-semibold">Board</h1>
        <p className="mt-2 text-muted">
          Static board grouped by status. Drag-and-drop is intentionally out of
          scope for the MVP.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-5">
        {TASK_STATUS_COLUMNS.map((column) => (
          <div
            key={column.status}
            className="rounded-lg border border-border bg-panel p-4"
          >
            <h2 className="font-semibold">{column.label}</h2>
            <div className="mt-4 space-y-3">
              {demoTasks
                .filter((task) => task.status === column.status)
                .map((task) => (
                  <article
                    key={task.id}
                    className="rounded-md border border-border bg-background p-3"
                  >
                    <h3 className="text-sm font-medium">{task.title}</h3>
                    <p className="mt-2 text-xs text-muted">
                      {task.priorityLabel} priority - Due {task.dueDate}
                    </p>
                  </article>
                ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
