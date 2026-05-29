import Link from "next/link";

import type { TaskDetailItem } from "@/lib/task-data";
import { getTaskDetailData } from "@/lib/task-data";

export const dynamic = "force-dynamic";

type TaskDetailPageProps = {
  params: {
    id: string;
  };
};

const statusLabels: Record<TaskDetailItem["status"], string> = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  REVIEW: "Review",
  DONE: "Done",
  BLOCKED: "Blocked"
};

const priorityLabels: Record<TaskDetailItem["priority"], string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent"
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric"
});

function formatOptionalDate(date: Date | null, fallback: string) {
  return date ? dateFormatter.format(date) : fallback;
}

function formatDate(date: Date) {
  return dateFormatter.format(date);
}

function getDisplayText(value: string | null | undefined, fallback: string) {
  const text = value?.trim();

  return text ? text : fallback;
}

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const data = await getTaskDetailData(params.id);

  if (!data) {
    return (
      <main className="space-y-6">
        <section className="rounded-lg border border-border bg-panel p-6">
          <p className="text-sm font-medium text-accent">Task detail</p>
          <h1 className="mt-2 text-3xl font-semibold">Task not found</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            This task could not be found in the BrightAds Agency workspace. It
            may have been removed, or the task link may be incorrect.
          </p>
          <Link
            className="mt-5 inline-flex rounded-md border border-border px-4 py-2 text-sm font-medium text-accent"
            href="/tasks"
          >
            Back to tasks
          </Link>
        </section>
      </main>
    );
  }

  const { task } = data;

  return (
    <main className="space-y-6">
      <section>
        <Link className="text-sm font-medium text-accent" href="/tasks">
          Back to tasks
        </Link>
        <p className="mt-3 text-sm font-medium text-accent">Task detail</p>
        <h1 className="text-3xl font-semibold">{task.title}</h1>
        <p className="mt-2 text-muted">
          {getDisplayText(task.description, "No description provided.")}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-panel p-4">
          <p className="text-sm text-muted">Status</p>
          <p className="mt-1 font-medium">{statusLabels[task.status]}</p>
        </div>
        <div className="rounded-lg border border-border bg-panel p-4">
          <p className="text-sm text-muted">Priority</p>
          <p className="mt-1 font-medium">{priorityLabels[task.priority]}</p>
        </div>
        <div className="rounded-lg border border-border bg-panel p-4">
          <p className="text-sm text-muted">Assignee</p>
          <p className="mt-1 font-medium">
            {getDisplayText(task.assignee?.name, "Unassigned")}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-panel p-4">
          <p className="text-sm text-muted">Due date</p>
          <p className="mt-1 font-medium">
            {formatOptionalDate(task.dueDate, "No due date")}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-panel p-4">
          <p className="text-sm text-muted">Created by</p>
          <p className="mt-1 font-medium">
            {getDisplayText(task.createdBy?.name, "Unknown creator")}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-panel p-4">
          <p className="text-sm text-muted">Workspace</p>
          <p className="mt-1 font-medium">
            {getDisplayText(task.workspace?.name, "Unknown workspace")}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-panel p-4">
          <p className="text-sm text-muted">Created</p>
          <p className="mt-1 font-medium">{formatDate(task.createdAt)}</p>
        </div>
        <div className="rounded-lg border border-border bg-panel p-4">
          <p className="text-sm text-muted">Updated</p>
          <p className="mt-1 font-medium">{formatDate(task.updatedAt)}</p>
        </div>
      </section>
    </main>
  );
}
