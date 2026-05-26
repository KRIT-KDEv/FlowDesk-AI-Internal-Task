import Link from "next/link";
import type { getRecentTasks } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

type RecentTask = Awaited<ReturnType<typeof getRecentTasks>>[number];

type RecentTasksProps = {
  tasks: RecentTask[];
};

const statusLabels: Record<RecentTask["status"], string> = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  REVIEW: "Review",
  DONE: "Done",
  BLOCKED: "Blocked"
};

const statusStyles: Record<RecentTask["status"], string> = {
  TODO: "bg-background text-muted ring-border",
  IN_PROGRESS: "bg-accent-soft text-accent ring-accent/20",
  REVIEW: "bg-warning-soft text-warning ring-warning/20",
  DONE: "bg-success-soft text-success ring-success/20",
  BLOCKED: "bg-danger-soft text-danger ring-danger/20"
};

const dueDateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric"
});

function formatDueDate(dueDate: RecentTask["dueDate"]) {
  return dueDate ? dueDateFormatter.format(dueDate) : "No due date";
}

export function RecentTasks({ tasks }: RecentTasksProps) {
  return (
    <section className="rounded-lg border border-border bg-panel shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4">
        <div>
          <h2 className="text-base font-semibold">Recent tasks</h2>
          <p className="mt-1 text-sm text-muted">Latest active client work</p>
        </div>
        <Link href="/tasks" className="text-sm font-medium text-accent">
          View all
        </Link>
      </div>

      <div className="divide-y divide-border">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Link
              key={task.id}
              href={`/tasks/${task.id}`}
              className="grid gap-3 px-4 py-4 hover:bg-background sm:grid-cols-[minmax(0,1fr)_150px_110px]"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{task.title}</p>
                <p className="mt-1 text-xs text-muted">
                  {task.assignee?.name ?? "Unassigned"}
                </p>
              </div>
              <div className="text-sm text-muted">
                Due {formatDueDate(task.dueDate)}
              </div>
              <div>
                <span
                  className={cn(
                    "inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1",
                    statusStyles[task.status]
                  )}
                >
                  {statusLabels[task.status]}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="px-4 py-6 text-sm text-muted">
            No recent tasks in the demo workspace.
          </div>
        )}
      </div>
    </section>
  );
}
