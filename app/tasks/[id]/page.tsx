import Link from "next/link";
import { demoMembers, demoTasks } from "@/lib/mock-data";

type TaskDetailPageProps = {
  params: {
    id: string;
  };
};

export default function TaskDetailPage({ params }: TaskDetailPageProps) {
  const task = demoTasks.find((item) => item.id === params.id);

  if (!task) {
    return (
      <main className="space-y-4">
        <h1 className="text-3xl font-semibold">Task not found</h1>
        <Link className="text-accent" href="/tasks">
          Back to tasks
        </Link>
      </main>
    );
  }

  const assignee = demoMembers.find((member) => member.id === task.assigneeId);

  return (
    <main className="space-y-6">
      <section>
        <p className="text-sm font-medium text-accent">Task detail</p>
        <h1 className="text-3xl font-semibold">{task.title}</h1>
        <p className="mt-2 text-muted">{task.description}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-panel p-4">
          <p className="text-sm text-muted">Status</p>
          <p className="mt-1 font-medium">{task.statusLabel}</p>
        </div>
        <div className="rounded-lg border border-border bg-panel p-4">
          <p className="text-sm text-muted">Priority</p>
          <p className="mt-1 font-medium">{task.priorityLabel}</p>
        </div>
        <div className="rounded-lg border border-border bg-panel p-4">
          <p className="text-sm text-muted">Assignee</p>
          <p className="mt-1 font-medium">{assignee?.name ?? "Unassigned"}</p>
        </div>
        <div className="rounded-lg border border-border bg-panel p-4">
          <p className="text-sm text-muted">Due date</p>
          <p className="mt-1 font-medium">{task.dueDate}</p>
        </div>
      </section>
    </main>
  );
}
