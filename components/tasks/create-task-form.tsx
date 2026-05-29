import Link from "next/link";
import type { TaskPriority, TaskStatus } from "@prisma/client";

type AssigneeOption = {
  id: string;
  name: string;
};

type CreateTaskFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  assigneeOptions?: AssigneeOption[];
};

const statusOptions = [
  { value: "TODO", label: "Todo" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "REVIEW", label: "Review" },
  { value: "DONE", label: "Done" },
  { value: "BLOCKED", label: "Blocked" }
] as const satisfies ReadonlyArray<{ value: TaskStatus; label: string }>;

const priorityOptions = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "URGENT", label: "Urgent" }
] as const satisfies ReadonlyArray<{ value: TaskPriority; label: string }>;

const fieldClassName =
  "h-10 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent";

const labelClassName = "grid gap-2 text-sm font-medium";

export function CreateTaskForm({
  action,
  assigneeOptions = []
}: CreateTaskFormProps) {
  return (
    <form
      action={action}
      className="rounded-lg border border-border bg-panel p-5 shadow-sm"
    >
      <div className="grid gap-5">
        <label className={labelClassName}>
          Title
          <input
            className={fieldClassName}
            name="title"
            placeholder="Add a clear task title"
            type="text"
          />
        </label>

        <label className={labelClassName}>
          Description
          <textarea
            className="min-h-28 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            name="description"
            placeholder="Optional context, next step, or client note"
          />
        </label>

        <div className="grid gap-5 md:grid-cols-2">
          <label className={labelClassName}>
            Status
            <select
              className={fieldClassName}
              defaultValue="TODO"
              name="status"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className={labelClassName}>
            Priority
            <select
              className={fieldClassName}
              defaultValue="MEDIUM"
              name="priority"
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className={labelClassName}>
            Due date
            <input className={fieldClassName} name="dueDate" type="date" />
          </label>

          <label className={labelClassName}>
            Assignee
            <select className={fieldClassName} defaultValue="" name="assigneeId">
              <option value="">Unassigned</option>
              {assigneeOptions.map((assignee) => (
                <option key={assignee.id} value={assignee.id}>
                  {assignee.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-end">
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm font-medium"
          href="/tasks"
        >
          Cancel
        </Link>
        <button
          className="inline-flex h-10 items-center justify-center rounded-md bg-accent px-4 text-sm font-medium text-white"
          type="submit"
        >
          Create task
        </button>
      </div>
    </form>
  );
}
