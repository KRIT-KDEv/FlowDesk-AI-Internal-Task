import Link from "next/link";
import type { Member, Task } from "@/types";
import { cn } from "@/lib/utils";

type RecentTasksProps = {
  tasks: Task[];
  members: Member[];
};

const statusStyles: Record<Task["status"], string> = {
  TODO: "bg-background text-muted ring-border",
  IN_PROGRESS: "bg-accent-soft text-accent ring-accent/20",
  REVIEW: "bg-warning-soft text-warning ring-warning/20",
  DONE: "bg-success-soft text-success ring-success/20",
  BLOCKED: "bg-danger-soft text-danger ring-danger/20"
};

export function RecentTasks({ tasks, members }: RecentTasksProps) {
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
        {tasks.map((task) => {
          const assignee = members.find(
            (member) => member.id === task.assigneeId
          );

          return (
            <Link
              key={task.id}
              href={`/tasks/${task.id}`}
              className="grid gap-3 px-4 py-4 hover:bg-background sm:grid-cols-[minmax(0,1fr)_150px_110px]"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{task.title}</p>
                <p className="mt-1 text-xs text-muted">
                  {task.client} - {assignee?.name ?? "Unassigned"}
                </p>
              </div>
              <div className="text-sm text-muted">Due {task.dueDate}</div>
              <div>
                <span
                  className={cn(
                    "inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1",
                    statusStyles[task.status]
                  )}
                >
                  {task.statusLabel}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
