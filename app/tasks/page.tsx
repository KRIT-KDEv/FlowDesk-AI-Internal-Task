import Link from "next/link";
import type { TaskPriority, TaskStatus } from "@prisma/client";

import { canCreateDemoTask } from "@/lib/demo-auth";
import { getDemoSession } from "@/lib/demo-auth-server";
import type { GetTasksFilters, TaskListItem } from "@/lib/task-data";
import { getTaskListData } from "@/lib/task-data";

export const dynamic = "force-dynamic";

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

const allowedStatuses = new Set<TaskStatus>(
  statusOptions.map((option) => option.value)
);

const allowedPriorities = new Set<TaskPriority>(
  priorityOptions.map((option) => option.value)
);

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

type TasksPageSearchParams = {
  search?: string | string[];
  status?: string | string[];
  priority?: string | string[];
};

type TasksPageProps = {
  searchParams?: TasksPageSearchParams;
};

function getSingleSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getValidatedTaskFilters(
  searchParams: TasksPageSearchParams = {}
): GetTasksFilters {
  const search = getSingleSearchParam(searchParams.search)?.trim();
  const status = getSingleSearchParam(searchParams.status);
  const priority = getSingleSearchParam(searchParams.priority);

  return {
    ...(search ? { search } : {}),
    ...(status && allowedStatuses.has(status as TaskStatus)
      ? { status: status as TaskStatus }
      : {}),
    ...(priority && allowedPriorities.has(priority as TaskPriority)
      ? { priority: priority as TaskPriority }
      : {})
  };
}

export default async function TasksPage({
  searchParams = {}
}: TasksPageProps) {
  const demoSession = getDemoSession();
  const filters = getValidatedTaskFilters(searchParams);
  const { tasks } = await getTaskListData(filters);
  const searchValue = filters.search ?? "";
  const statusValue = filters.status ?? "";
  const priorityValue = filters.priority ?? "";
  const hasFilters = Boolean(filters.search || filters.status || filters.priority);
  const canCreateTask = demoSession ? canCreateDemoTask(demoSession.role) : false;

  return (
    <main className="space-y-6">
      <section>
        <p className="text-sm font-medium text-accent">Task management</p>
        <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-semibold">Tasks</h1>
          {canCreateTask ? (
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-accent px-4 text-sm font-medium text-white"
              href="/tasks/new"
            >
              New task
            </Link>
          ) : null}
        </div>
        <p className="mt-2 text-muted">
          {canCreateTask
            ? "Search, create, and review tasks from the BrightAds Agency workspace."
            : "Search and review tasks from the BrightAds Agency workspace."}
        </p>
      </section>

      <form
        action="/tasks"
        className="grid gap-3 rounded-lg border border-border bg-panel p-4 md:grid-cols-[minmax(0,1fr)_180px_180px_auto]"
        method="get"
      >
        <label className="grid gap-2 text-sm font-medium">
          Search
          <input
            className="h-10 rounded-md border border-border bg-background px-3 text-sm font-normal outline-none focus:border-accent"
            defaultValue={searchValue}
            name="search"
            placeholder="Search task title"
            type="search"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Status
          <select
            className="h-10 rounded-md border border-border bg-background px-3 text-sm font-normal outline-none focus:border-accent"
            defaultValue={statusValue}
            name="status"
          >
            <option value="">All statuses</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Priority
          <select
            className="h-10 rounded-md border border-border bg-background px-3 text-sm font-normal outline-none focus:border-accent"
            defaultValue={priorityValue}
            name="priority"
          >
            <option value="">All priorities</option>
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-end gap-2">
          <button
            className="h-10 rounded-md bg-accent px-4 text-sm font-medium text-white"
            type="submit"
          >
            Apply
          </button>
          {hasFilters ? (
            <Link
              className="flex h-10 items-center rounded-md border border-border px-4 text-sm font-medium"
              href="/tasks"
            >
              Clear
            </Link>
          ) : null}
        </div>
      </form>

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
            {hasFilters
              ? "No tasks match these filters. Try clearing search, status, or priority."
              : "No tasks yet. Create the first BrightAds Agency task to start tracking work."}
          </div>
        )}
      </section>
    </main>
  );
}
