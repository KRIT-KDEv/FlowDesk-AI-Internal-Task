import Link from "next/link";

import type { TaskListItem } from "@/lib/task-data";
import { getTaskListData } from "@/lib/task-data";

export const dynamic = "force-dynamic";

const statusLabels: Record<TaskListItem["status"], string> = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  REVIEW: "Review",
  DONE: "Done",
  BLOCKED: "Blocked"
};

const priorityLabels: Record<TaskListItem["priority"], string> = {
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

function formatDueDate(dueDate: TaskListItem["dueDate"]) {
  return dueDate ? dueDateFormatter.format(dueDate) : "No due date";
}

export default async function TasksPage() {
  const { tasks } = await getTaskListData();

  return (
    <main className="space-y-6">
      <section>
        <p className="text-sm font-medium text-accent">Task management</p>
        <h1 className="text-3xl font-semibold">Tasks</h1>
        <p className="mt-2 text-muted">
          Read-only task list from the BrightAds Agency workspace.
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
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Link
              key={task.id}
              href={`/tasks/${task.id}`}
              className="grid grid-cols-5 border-b border-border px-4 py-3 text-sm last:border-b-0 hover:bg-background"
            >
              <span className="font-medium">{task.title}</span>
              <span>{statusLabels[task.status]}</span>
              <span>{priorityLabels[task.priority]}</span>
              <span>{task.assignee?.name ?? "Unassigned"}</span>
              <span>{formatDueDate(task.dueDate)}</span>
            </Link>
          ))
        ) : (
          <div className="px-4 py-6 text-sm text-muted">
            No tasks in the BrightAds Agency workspace.
          </div>
        )}
      </section>
    </main>
  );
}
