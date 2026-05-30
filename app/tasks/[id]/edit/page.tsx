import Link from "next/link";

import { EditTaskForm } from "@/components/tasks/edit-task-form";
import { getEditTaskFormData } from "@/lib/task-data";
import { updateTaskAction } from "./actions";

export const dynamic = "force-dynamic";

type EditTaskPageProps = {
  params: {
    id: string;
  };
  searchParams?: {
    error?: string | string[];
  };
};

const errorMessages: Record<string, string> = {
  "invalid-assignee": "Choose a valid BrightAds Agency assignee.",
  "invalid-due-date": "Use a valid due date.",
  "invalid-priority": "Choose a valid priority.",
  "invalid-status": "Choose a valid status.",
  "title-required": "Add a task title before saving changes."
};

function getSingleSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function EditTaskPage({
  params,
  searchParams = {}
}: EditTaskPageProps) {
  const data = await getEditTaskFormData(params.id);

  if (!data) {
    return (
      <main className="space-y-6">
        <section className="rounded-lg border border-border bg-panel p-6">
          <p className="text-sm font-medium text-accent">Edit task</p>
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

  const { assigneeOptions, task } = data;
  const taskHref = `/tasks/${task.id}`;
  const error = getSingleSearchParam(searchParams.error);
  const errorMessage = error ? errorMessages[error] : null;

  return (
    <main className="space-y-6">
      <section className="flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link className="text-sm font-medium text-accent" href={taskHref}>
            Back to task
          </Link>
          <p className="mt-3 text-sm font-medium text-accent">
            Task management
          </p>
          <h1 className="text-3xl font-semibold">Edit task</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Update the task details for the BrightAds Agency workspace.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-panel px-4 py-3 text-sm shadow-sm">
          <p className="text-xs font-medium uppercase text-muted">Task</p>
          <p className="mt-1 font-semibold">{task.title}</p>
        </div>
      </section>

      {errorMessage ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <EditTaskForm
        action={updateTaskAction}
        assigneeOptions={assigneeOptions}
        cancelHref={taskHref}
        task={task}
      />
    </main>
  );
}
