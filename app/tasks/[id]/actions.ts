"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireDemoDeleteTaskPermission } from "@/lib/demo-auth-server";
import { prisma } from "@/lib/prisma";

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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

async function getTaskForDelete(taskId: string) {
  if (!uuidPattern.test(taskId)) {
    return null;
  }

  try {
    return await prisma.task.findUnique({
      where: {
        id: taskId
      },
      select: {
        id: true
      }
    });
  } catch {
    return null;
  }
}

async function hardDeleteTask(taskId: string) {
  try {
    await prisma.task.delete({
      where: {
        id: taskId
      }
    });

    return true;
  } catch {
    return false;
  }
}

export async function deleteTaskAction(formData: FormData) {
  requireDemoDeleteTaskPermission();

  const normalizedTaskId = getNormalizedTaskId(getFormString(formData, "taskId"));
  const task = await getTaskForDelete(normalizedTaskId);

  if (!task) {
    redirect("/tasks");
  }

  const deleted = await hardDeleteTask(task.id);

  if (!deleted) {
    redirect("/tasks");
  }

  revalidatePath("/tasks");
  revalidatePath("/dashboard");
  revalidatePath("/board");
  revalidatePath("/team");
  revalidatePath("/ai-summary");
  redirect("/tasks");
}
