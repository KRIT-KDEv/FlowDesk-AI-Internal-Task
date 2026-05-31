import Link from "next/link";
import type { getOverdueTasks } from "@/lib/dashboard-data";

type OverdueTask = Awaited<ReturnType<typeof getOverdueTasks>>[number];

type OverdueTasksProps = {
  tasks: OverdueTask[];
};

const priorityLabels: Record<OverdueTask["priority"], string> = {
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

function formatDueDate(dueDate: OverdueTask["dueDate"]) {
  return dueDate ? dueDateFormatter.format(dueDate) : "No due date";
}

export function OverdueTasks({ tasks }: OverdueTasksProps) {
  return (
    <section className="rounded-lg border border-border bg-panel shadow-sm">
      <div className="border-b border-border px-4 py-4">
        <h2 className="text-base font-semibold">Overdue tasks</h2>
        <p className="mt-1 text-sm text-muted">
          Work that needs a team lead follow-up
        </p>
      </div>

      <div className="divide-y divide-border">
        {tasks.length > 0 ? (
          tasks.map((task) => (
              <Link
                key={task.id}
                href={`/tasks/${task.id}`}
                className="block px-4 py-4 hover:bg-background"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="mt-1 text-xs text-muted">
                      {task.assignee?.name ?? "Unassigned"}
                    </p>
                  </div>
                  <span className="rounded-full bg-danger-soft px-2.5 py-1 text-xs font-medium text-danger">
                    {priorityLabels[task.priority]}
                  </span>
                </div>
                <p className="mt-3 text-xs text-muted">
                  Due {formatDueDate(task.dueDate)}
                </p>
              </Link>
          ))
        ) : (
          <div className="px-4 py-6 text-sm text-muted">
            No overdue tasks. BrightAds work is currently on schedule.
          </div>
        )}
      </div>
    </section>
  );
}
