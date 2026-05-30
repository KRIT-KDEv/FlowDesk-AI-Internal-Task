import Link from "next/link";

import { EditTaskForm } from "@/components/tasks/edit-task-form";
import { getEditTaskFormData } from "@/lib/task-data";

export const dynamic = "force-dynamic";

type EditTaskPageProps = {
  params: {
    id: string;
  };
};

export default async function EditTaskPage({ params }: EditTaskPageProps) {
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

      <EditTaskForm
        assigneeOptions={assigneeOptions}
        cancelHref={taskHref}
        task={task}
      />
    </main>
  );
}
