import Link from "next/link";
import type { TaskPriority } from "@prisma/client";

import { getBoardData } from "@/lib/task-data";

export const dynamic = "force-dynamic";

const priorityLabels: Record<TaskPriority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent"
};

const dueDateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric"
});

function formatDueDate(dueDate: Date | null) {
  return dueDate ? dueDateFormatter.format(dueDate) : "No due date";
}

export default async function BoardPage() {
  const { columns } = await getBoardData();

  return (
    <main className="space-y-6">
      <section>
        <p className="text-sm font-medium text-accent">Basic Kanban board</p>
        <h1 className="text-3xl font-semibold">Board</h1>
        <p className="mt-2 text-muted">
          Prisma-backed board grouped by status. Drag-and-drop is not enabled
          yet; use Edit task to update status.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-5">
        {columns.map((column) => (
          <div
            key={column.status}
            className="rounded-lg border border-border bg-panel p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold">{column.label}</h2>
              <span className="rounded-full border border-border bg-background px-2 py-0.5 text-xs text-muted">
                {column.tasks.length}
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {column.tasks.length > 0 ? (
                column.tasks.map((task) => (
                  <Link
                    key={task.id}
                    className="block rounded-md border border-border bg-background p-3 hover:border-accent/40 hover:bg-panel"
                    href={`/tasks/${task.id}`}
                  >
                    <h3 className="text-sm font-medium">{task.title}</h3>
                    <div className="mt-3 space-y-1 text-xs text-muted">
                      <p>{priorityLabels[task.priority]} priority</p>
                      <p>{task.assignee?.name ?? "Unassigned"}</p>
                      <p>Due {formatDueDate(task.dueDate)}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-md border border-dashed border-border bg-background p-3 text-xs text-muted">
                  No tasks in this status.
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
