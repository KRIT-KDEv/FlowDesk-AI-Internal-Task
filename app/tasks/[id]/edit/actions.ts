"use server";

import { TaskPriority, TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

const WORKSPACE_SLUG = "brightads-agency";

const validStatuses = new Set<TaskStatus>([
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.REVIEW,
  TaskStatus.DONE,
  TaskStatus.BLOCKED
]);

const validPriorities = new Set<TaskPriority>([
  TaskPriority.LOW,
  TaskPriority.MEDIUM,
  TaskPriority.HIGH,
  TaskPriority.URGENT
]);

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function redirectWithError(taskId: string, error: string): never {
  redirect(`/tasks/${taskId}/edit?error=${error}`);
}

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function getNormalizedTaskId(taskId: string) {
  const trimmedTaskId = taskId.trim();

  if (uuidPattern.test(trimmedTaskId)) {
    return trimmedTaskId;
  }

  try {
    const parsedTaskId = JSON.parse(trimmedTaskId);

    if (Array.isArray(parsedTaskId) && typeof parsedTaskId[0] === "string") {
      return parsedTaskId[0].trim();
    }
  } catch {
  }

  return trimmedTaskId;
}

function parseStatus(taskId: string, value: string) {
  if (validStatuses.has(value as TaskStatus)) {
    return value as TaskStatus;
  }

  redirectWithError(taskId, "invalid-status");
}

function parsePriority(taskId: string, value: string) {
  if (validPriorities.has(value as TaskPriority)) {
    return value as TaskPriority;
  }

  redirectWithError(taskId, "invalid-priority");
}

function parseDueDate(taskId: string, value: string) {
  if (!value) {
    return null;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    redirectWithError(taskId, "invalid-due-date");
  }

  const [year, month, day] = value.split("-").map(Number);
  const dueDate = new Date(Date.UTC(year, month - 1, day, 12));

  if (
    dueDate.getUTCFullYear() !== year ||
    dueDate.getUTCMonth() !== month - 1 ||
    dueDate.getUTCDate() !== day
  ) {
    redirectWithError(taskId, "invalid-due-date");
  }

  return dueDate;
}

async function getTaskForUpdate(taskId: string) {
  if (!uuidPattern.test(taskId)) {
    return null;
  }

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    select: {
      id: true,
      workspaceId: true,
      workspace: {
        select: {
          slug: true,
        },
      },
    },
  });

  if (task?.workspace.slug !== WORKSPACE_SLUG) {
    return null;
  }

  return task;
}

async function getValidAssigneeId(
  taskId: string,
  assigneeId: string,
  workspaceId: string
) {
  if (!assigneeId) {
    return null;
  }

  if (!uuidPattern.test(assigneeId)) {
    redirectWithError(taskId, "invalid-assignee");
  }

  const membership = await prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId: assigneeId
      }
    },
    select: {
      userId: true
    }
  });

  if (!membership) {
    redirectWithError(taskId, "invalid-assignee");
  }

  return membership.userId;
}

export async function updateTaskAction(formData: FormData) {
  const normalizedTaskId = getNormalizedTaskId(getFormString(formData, "taskId"));
  const task = await getTaskForUpdate(normalizedTaskId);

  if (!task) {
    redirect("/tasks");
  }

  const title = getFormString(formData, "title");

  if (!title) {
    redirectWithError(task.id, "title-required");
  }

  const description = getFormString(formData, "description");
  const status = parseStatus(task.id, getFormString(formData, "status"));
  const priority = parsePriority(task.id, getFormString(formData, "priority"));
  const dueDate = parseDueDate(task.id, getFormString(formData, "dueDate"));
  const assigneeId = await getValidAssigneeId(
    task.id,
    getFormString(formData, "assigneeId"),
    task.workspaceId
  );

  await prisma.task.update({
    where: {
      id: task.id
    },
    data: {
      title,
      description: description || null,
      status,
      priority,
      dueDate,
      assigneeId
    }
  });

  revalidatePath("/tasks");
  revalidatePath(`/tasks/${task.id}`);
  revalidatePath("/dashboard");
  redirect(`/tasks/${task.id}`);
}
