import { TaskStatus } from "@prisma/client"

import { prisma } from "@/lib/prisma"

const DEFAULT_WORKSPACE_SLUG = "brightads-agency"
const RECENT_TASK_LIMIT = 5
const OVERDUE_TASK_LIMIT = 5

const dashboardTaskSelect = {
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
}

const latestAISummarySelect = {
  id: true,
  type: true,
  title: true,
  content: true,
  fromDate: true,
  toDate: true,
  createdAt: true,
  updatedAt: true,
}

function getTodayRange(now = new Date()) {
  const startOfToday = new Date(now)
  startOfToday.setHours(0, 0, 0, 0)

  const startOfTomorrow = new Date(startOfToday)
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1)

  return {
    startOfToday,
    startOfTomorrow,
  }
}

function getCurrentWeekRange(now = new Date()) {
  const startOfWeek = new Date(now)
  startOfWeek.setHours(0, 0, 0, 0)

  const dayOfWeek = startOfWeek.getDay()
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  startOfWeek.setDate(startOfWeek.getDate() + mondayOffset)

  const startOfNextWeek = new Date(startOfWeek)
  startOfNextWeek.setDate(startOfNextWeek.getDate() + 7)

  return {
    startOfWeek,
    startOfNextWeek,
  }
}

function workspaceTaskWhere(workspaceSlug = DEFAULT_WORKSPACE_SLUG) {
  return {
    workspace: {
      slug: workspaceSlug,
    },
  }
}

export async function getDashboardMetrics(workspaceSlug = DEFAULT_WORKSPACE_SLUG) {
  const { startOfToday, startOfTomorrow } = getTodayRange()
  const { startOfWeek, startOfNextWeek } = getCurrentWeekRange()
  const workspaceWhere = workspaceTaskWhere(workspaceSlug)

  const [
    totalTasks,
    inProgressTasks,
    dueTodayTasks,
    overdueTasks,
    completedThisWeek,
  ] = await Promise.all([
    prisma.task.count({
      where: workspaceWhere,
    }),
    prisma.task.count({
      where: {
        ...workspaceWhere,
        status: TaskStatus.IN_PROGRESS,
      },
    }),
    prisma.task.count({
      where: {
        ...workspaceWhere,
        dueDate: {
          gte: startOfToday,
          lt: startOfTomorrow,
        },
      },
    }),
    prisma.task.count({
      where: {
        ...workspaceWhere,
        dueDate: {
          lt: startOfToday,
        },
        status: {
          not: TaskStatus.DONE,
        },
      },
    }),
    prisma.task.count({
      where: {
        ...workspaceWhere,
        status: TaskStatus.DONE,
        updatedAt: {
          gte: startOfWeek,
          lt: startOfNextWeek,
        },
      },
    }),
  ])

  return {
    totalTasks,
    inProgressTasks,
    dueTodayTasks,
    overdueTasks,
    completedThisWeek,
  }
}

export async function getRecentTasks(
  workspaceSlug = DEFAULT_WORKSPACE_SLUG,
  limit = RECENT_TASK_LIMIT,
) {
  return prisma.task.findMany({
    where: workspaceTaskWhere(workspaceSlug),
    orderBy: [
      {
        updatedAt: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
    take: limit,
    select: dashboardTaskSelect,
  })
}

export async function getOverdueTasks(
  workspaceSlug = DEFAULT_WORKSPACE_SLUG,
  limit = OVERDUE_TASK_LIMIT,
) {
  const { startOfToday } = getTodayRange()

  return prisma.task.findMany({
    where: {
      ...workspaceTaskWhere(workspaceSlug),
      dueDate: {
        lt: startOfToday,
      },
      status: {
        not: TaskStatus.DONE,
      },
    },
    orderBy: [
      {
        dueDate: "asc",
      },
      {
        priority: "desc",
      },
    ],
    take: limit,
    select: dashboardTaskSelect,
  })
}

export async function getLatestAISummary(workspaceSlug = DEFAULT_WORKSPACE_SLUG) {
  return prisma.aISummary.findFirst({
    where: {
      workspace: {
        slug: workspaceSlug,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: latestAISummarySelect,
  })
}

export async function getDashboardData(workspaceSlug = DEFAULT_WORKSPACE_SLUG) {
  const [metrics, recentTasks, overdueTasks, latestAISummary] = await Promise.all([
    getDashboardMetrics(workspaceSlug),
    getRecentTasks(workspaceSlug),
    getOverdueTasks(workspaceSlug),
    getLatestAISummary(workspaceSlug),
  ])

  return {
    metrics,
    recentTasks,
    overdueTasks,
    latestAISummary,
  }
}
