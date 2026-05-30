import Link from "next/link";
import type { TaskPriority, TaskStatus } from "@prisma/client";

import type {
  EditTaskFormTask,
  TaskFormAssigneeOption
} from "@/lib/task-data";

type EditTaskFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  assigneeOptions: TaskFormAssigneeOption[];
  cancelHref: string;
  task: EditTaskFormTask;
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

function formatDateInputValue(dueDate: Date | null) {
  return dueDate ? dueDate.toISOString().slice(0, 10) : "";
}

export function EditTaskForm({
  action,
  assigneeOptions,
  cancelHref,
  task
}: EditTaskFormProps) {
  return (
    <form
      action={action}
      className="rounded-lg border border-border bg-panel p-5 shadow-sm"
    >
      <input name="taskId" type="hidden" value={task.id} />
      <div className="grid gap-5">
        <label className={labelClassName}>
          Title
          <input
            className={fieldClassName}
            defaultValue={task.title}
            name="title"
            placeholder="Add a clear task title"
            type="text"
          />
        </label>

        <label className={labelClassName}>
          Description
          <textarea
            className="min-h-28 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            defaultValue={task.description ?? ""}
            name="description"
            placeholder="Optional context, next step, or client note"
          />
        </label>

        <div className="grid gap-5 md:grid-cols-2">
          <label className={labelClassName}>
            Status
            <select
              className={fieldClassName}
              defaultValue={task.status}
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
              defaultValue={task.priority}
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
            <input
              className={fieldClassName}
              defaultValue={formatDateInputValue(task.dueDate)}
              name="dueDate"
              type="date"
            />
          </label>

          <label className={labelClassName}>
            Assignee
            <select
              className={fieldClassName}
              defaultValue={task.assigneeId ?? ""}
              name="assigneeId"
            >
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
          href={cancelHref}
        >
          Cancel
        </Link>
        <button
          className="inline-flex h-10 items-center justify-center rounded-md bg-accent px-4 text-sm font-medium text-white"
          type="submit"
        >
          Save changes
        </button>
      </div>
    </form>
  );
}
