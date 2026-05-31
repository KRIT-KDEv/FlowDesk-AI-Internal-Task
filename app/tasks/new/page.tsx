import Link from "next/link";

import { CreateTaskForm } from "@/components/tasks/create-task-form";
import { getCreateTaskFormData } from "@/lib/task-data";

import { createTaskAction } from "./actions";

export const dynamic = "force-dynamic";

type NewTaskPageSearchParams = {
  error?: string | string[];
};

type NewTaskPageProps = {
  searchParams?: NewTaskPageSearchParams;
};

const errorMessages: Record<string, string> = {
  "invalid-assignee": "Choose a valid BrightAds Agency assignee.",
  "invalid-due-date": "Choose a valid due date.",
  "invalid-priority": "Choose a valid task priority.",
  "invalid-status": "Choose a valid task status.",
  "title-required": "Add a task title before creating the task."
};

function getSingleSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function NewTaskPage({
  searchParams = {}
}: NewTaskPageProps) {
  const { assigneeOptions } = await getCreateTaskFormData();
  const errorCode = getSingleSearchParam(searchParams.error);
  const errorMessage = errorCode ? errorMessages[errorCode] : null;

  return (
    <main className="space-y-6">
      <section className="flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link className="text-sm font-medium text-accent" href="/tasks">
            Back to tasks
          </Link>
          <p className="mt-3 text-sm font-medium text-accent">
            Task management
          </p>
          <h1 className="text-3xl font-semibold">New task</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Create a tracked internal work item for BrightAds Agency.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-panel px-4 py-3 text-sm shadow-sm">
          <p className="text-xs font-medium uppercase text-muted">Workspace</p>
          <p className="mt-1 font-semibold">BrightAds Agency</p>
        </div>
      </section>

      {errorMessage ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <CreateTaskForm
        action={createTaskAction}
        assigneeOptions={assigneeOptions}
      />
    </main>
  );
}
