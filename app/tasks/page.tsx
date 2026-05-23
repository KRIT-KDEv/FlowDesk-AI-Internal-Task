import Link from "next/link";
import { demoMembers, demoTasks } from "@/lib/mock-data";

export default function TasksPage() {
  return (
    <main className="space-y-6">
      <section>
        <p className="text-sm font-medium text-accent">Task management</p>
        <h1 className="text-3xl font-semibold">Tasks</h1>
        <p className="mt-2 text-muted">
          Placeholder task list using BrightAds Agency demo data.
        </p>
      </section>

      <section className="overflow-hidden rounded-lg border border-border bg-panel">
        <div className="grid grid-cols-5 border-b border-border px-4 py-3 text-sm font-medium text-muted">
          <span>Task</span>
          <span>Status</span>
          <span>Priority</span>
          <span>Assignee</span>
          <span>Due date</span>
        </div>
        {demoTasks.map((task) => {
          const assignee = demoMembers.find(
            (member) => member.id === task.assigneeId
          );

          return (
            <Link
              key={task.id}
              href={`/tasks/${task.id}`}
              className="grid grid-cols-5 border-b border-border px-4 py-3 text-sm last:border-b-0 hover:bg-background"
            >
              <span className="font-medium">{task.title}</span>
              <span>{task.statusLabel}</span>
              <span>{task.priorityLabel}</span>
              <span>{assignee?.name ?? "Unassigned"}</span>
              <span>{task.dueDate}</span>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
