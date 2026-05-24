import Link from "next/link";
import type { Member, Task } from "@/types";

type OverdueTasksProps = {
  tasks: Task[];
  members: Member[];
};

export function OverdueTasks({ tasks, members }: OverdueTasksProps) {
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
          tasks.map((task) => {
            const assignee = members.find(
              (member) => member.id === task.assigneeId
            );

            return (
              <Link
                key={task.id}
                href={`/tasks/${task.id}`}
                className="block px-4 py-4 hover:bg-background"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="mt-1 text-xs text-muted">
                      {assignee?.name ?? "Unassigned"} - {task.client}
                    </p>
                  </div>
                  <span className="rounded-full bg-danger-soft px-2.5 py-1 text-xs font-medium text-danger">
                    {task.priorityLabel}
                  </span>
                </div>
                <p className="mt-3 text-xs text-muted">Due {task.dueDate}</p>
              </Link>
            );
          })
        ) : (
          <div className="px-4 py-6 text-sm text-muted">
            No overdue tasks in the demo workspace.
          </div>
        )}
      </div>
    </section>
  );
}
