"use server";

import { TaskPriority, TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireDemoCreateTaskPermission } from "@/lib/demo-auth-server";
import { prisma } from "@/lib/prisma";

const WORKSPACE_SLUG = "brightads-agency";
const ADMIN_EMAIL = "admin@brightads.example";

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

function redirectWithError(error: string): never {
  redirect(`/tasks/new?error=${error}`);
}

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function parseStatus(value: string) {
  if (!value) {
    return TaskStatus.TODO;
  }

  if (validStatuses.has(value as TaskStatus)) {
    return value as TaskStatus;
  }

  redirectWithError("invalid-status");
}

function parsePriority(value: string) {
  if (!value) {
    return TaskPriority.MEDIUM;
  }

  if (validPriorities.has(value as TaskPriority)) {
    return value as TaskPriority;
  }

  redirectWithError("invalid-priority");
}

function parseDueDate(value: string) {
  if (!value) {
    return null;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    redirectWithError("invalid-due-date");
  }

  const [year, month, day] = value.split("-").map(Number);
  const dueDate = new Date(Date.UTC(year, month - 1, day, 12));

  if (
    dueDate.getUTCFullYear() !== year ||
    dueDate.getUTCMonth() !== month - 1 ||
    dueDate.getUTCDate() !== day
  ) {
    redirectWithError("invalid-due-date");
  }

  return dueDate;
}

async function getWorkspaceAndCreator() {
  const workspace = await prisma.workspace.findUnique({
    where: {
      slug: WORKSPACE_SLUG
    },
    select: {
      id: true
    }
  });

  if (!workspace) {
    throw new Error("BrightAds Agency workspace was not found.");
  }

  const adminMember = await prisma.workspaceMember.findFirst({
    where: {
      workspaceId: workspace.id,
      user: {
        email: ADMIN_EMAIL
      }
    },
    select: {
      userId: true
    }
  });

  if (!adminMember) {
    throw new Error("Admin user was not found in BrightAds Agency.");
  }

  return {
    workspaceId: workspace.id,
    createdById: adminMember.userId
  };
}

async function getValidAssigneeId(assigneeId: string, workspaceId: string) {
  if (!assigneeId) {
    return null;
  }

  if (!uuidPattern.test(assigneeId)) {
    redirectWithError("invalid-assignee");
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
    redirectWithError("invalid-assignee");
  }

  return membership.userId;
}

export async function createTaskAction(formData: FormData) {
  requireDemoCreateTaskPermission();

  const title = getFormString(formData, "title");

  if (!title) {
    redirectWithError("title-required");
  }

  const description = getFormString(formData, "description");
  const status = parseStatus(getFormString(formData, "status"));
  const priority = parsePriority(getFormString(formData, "priority"));
  const dueDate = parseDueDate(getFormString(formData, "dueDate"));
  const { workspaceId, createdById } = await getWorkspaceAndCreator();
  const assigneeId = await getValidAssigneeId(
    getFormString(formData, "assigneeId"),
    workspaceId
  );

  const createdTask = await prisma.task.create({
    data: {
      workspaceId,
      title,
      description: description || null,
      status,
      priority,
      dueDate,
      assigneeId,
      createdById
    },
    select: {
      id: true
    }
  });

  revalidatePath("/tasks");
  revalidatePath("/dashboard");
  redirect(`/tasks/${createdTask.id}`);
}
