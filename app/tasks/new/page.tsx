import Link from "next/link";

import { CreateTaskForm } from "@/components/tasks/create-task-form";

export default function NewTaskPage() {
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
            Capture a new internal work item for the BrightAds Agency workspace.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-panel px-4 py-3 text-sm shadow-sm">
          <p className="text-xs font-medium uppercase text-muted">Workspace</p>
          <p className="mt-1 font-semibold">BrightAds Agency</p>
        </div>
      </section>

      <CreateTaskForm />
    </main>
  );
}
