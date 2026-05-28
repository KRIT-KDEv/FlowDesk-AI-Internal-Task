import type { Prisma, TaskPriority, TaskStatus } from "@prisma/client"

import { prisma } from "@/lib/prisma"

const DEFAULT_WORKSPACE_SLUG = "brightads-agency"

const taskListSelect = {
  id: true,
  title: true,
  description: true,
  status: true,
  priority: true,
  dueDate: true,
  createdAt: true,
  updatedAt: true,
  assignee: {
    select: {
      id: true,
      name: true,
      image: true,
    },
  },
  workspace: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
} satisfies Prisma.TaskSelect

export type TaskListItem = Prisma.TaskGetPayload<{
  select: typeof taskListSelect
}>

export type GetTasksFilters = {
  search?: string
  status?: TaskStatus
  priority?: TaskPriority
  assigneeId?: string
  workspaceSlug?: string
}

function getTasksWhere(filters: GetTasksFilters = {}): Prisma.TaskWhereInput {
  const {
    search,
    status,
    priority,
    assigneeId,
    workspaceSlug = DEFAULT_WORKSPACE_SLUG,
  } = filters

  const where: Prisma.TaskWhereInput = {
    workspace: {
      slug: workspaceSlug,
    },
  }

  const searchTerm = search?.trim()

  if (searchTerm) {
    where.title = {
      contains: searchTerm,
      mode: "insensitive",
    }
  }

  if (status) {
    where.status = status
  }

  if (priority) {
    where.priority = priority
  }

  if (assigneeId) {
    where.assigneeId = assigneeId
  }

  return where
}

export async function getTasks(filters: GetTasksFilters = {}) {
  return prisma.task.findMany({
    where: getTasksWhere(filters),
    orderBy: [
      {
        updatedAt: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
    select: taskListSelect,
  })
}

export async function getTaskListData(filters: GetTasksFilters = {}) {
  const tasks = await getTasks(filters)

  return {
    tasks,
  }
}
