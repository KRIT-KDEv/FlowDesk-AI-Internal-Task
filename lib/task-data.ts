import type { MemberRole, Prisma, TaskPriority, TaskStatus } from "@prisma/client"

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

const taskDetailSelect = {
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
  createdBy: {
    select: {
      id: true,
      name: true,
      email: true,
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

const editTaskFormSelect = {
  id: true,
  title: true,
  description: true,
  status: true,
  priority: true,
  dueDate: true,
  assigneeId: true,
  workspaceId: true,
} satisfies Prisma.TaskSelect

export type TaskListItem = Prisma.TaskGetPayload<{
  select: typeof taskListSelect
}>

export type TaskDetailItem = Prisma.TaskGetPayload<{
  select: typeof taskDetailSelect
}>

export type EditTaskFormTask = Prisma.TaskGetPayload<{
  select: typeof editTaskFormSelect
}>

export type GetTasksFilters = {
  search?: string
  status?: TaskStatus
  priority?: TaskPriority
  assigneeId?: string
  workspaceSlug?: string
}

export type TaskFormAssigneeOption = {
  id: string
  name: string
  role: MemberRole
}

const boardStatusColumns = [
  { status: "TODO", label: "Todo" },
  { status: "IN_PROGRESS", label: "In Progress" },
  { status: "REVIEW", label: "Review" },
  { status: "DONE", label: "Done" },
  { status: "BLOCKED", label: "Blocked" },
] as const satisfies ReadonlyArray<{
  status: TaskStatus
  label: string
}>

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function isUuid(value: string) {
  return uuidPattern.test(value)
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

export async function getBoardData(filters: GetTasksFilters = {}) {
  const tasks = await getTasks(filters)
  const tasksByStatus = new Map<TaskStatus, TaskListItem[]>(
    boardStatusColumns.map((column) => [column.status, []])
  )

  for (const task of tasks) {
    tasksByStatus.get(task.status)?.push(task)
  }

  return {
    columns: boardStatusColumns.map((column) => ({
      status: column.status,
      label: column.label,
      tasks: tasksByStatus.get(column.status) ?? [],
    })),
  }
}

export async function getWorkspaceMembersForTaskForm(
  workspaceSlug = DEFAULT_WORKSPACE_SLUG
): Promise<TaskFormAssigneeOption[]> {
  const members = await prisma.workspaceMember.findMany({
    where: {
      workspace: {
        slug: workspaceSlug,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      role: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  return members.map((member) => ({
    id: member.user.id,
    name: member.user.name,
    role: member.role,
  }))
}

export async function getCreateTaskFormData() {
  const assigneeOptions = await getWorkspaceMembersForTaskForm()

  return {
    assigneeOptions,
  }
}

export async function getTaskById(id: string) {
  const taskId = id.trim()

  if (!isUuid(taskId)) {
    return null
  }

  return prisma.task.findUnique({
    where: {
      id: taskId,
    },
    select: taskDetailSelect,
  })
}

export async function getTaskDetailData(id: string) {
  const task = await getTaskById(id)

  if (!task) {
    return null
  }

  return {
    task,
  }
}

export async function getEditTaskFormData(id: string) {
  const taskId = id.trim()

  if (!isUuid(taskId)) {
    return null
  }

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      workspace: {
        slug: DEFAULT_WORKSPACE_SLUG,
      },
    },
    select: editTaskFormSelect,
  })

  if (!task) {
    return null
  }

  const assigneeOptions = await getWorkspaceMembersForTaskForm()

  return {
    task,
    assigneeOptions,
  }
}
