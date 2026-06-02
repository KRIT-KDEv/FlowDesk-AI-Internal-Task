import { TaskStatus, type Prisma } from "@prisma/client"

import { prisma } from "@/lib/prisma"

const DEFAULT_WORKSPACE_SLUG = "brightads-agency"

const workspaceSettingsSelect = {
  id: true,
  name: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.WorkspaceSelect

const mvpStatus = {
  database: "Database connected",
  auth: "Mock auth",
  permissions: "Not enabled",
  billing: "Out of scope",
  liveAI: "AI preview only",
  deleteTask: "Not enabled",
} as const

export type WorkspaceSettingsData = {
  workspace: Prisma.WorkspaceGetPayload<{
    select: typeof workspaceSettingsSelect
  }>
  counts: {
    memberCount: number
    taskCount: number
    aiSummaryCount: number
    overdueTaskCount: number
  }
  mvpStatus: typeof mvpStatus
}

function getStartOfToday(now = new Date()) {
  const startOfToday = new Date(now)
  startOfToday.setHours(0, 0, 0, 0)

  return startOfToday
}

export async function getWorkspaceSettingsData(
  workspaceSlug = DEFAULT_WORKSPACE_SLUG
): Promise<WorkspaceSettingsData | null> {
  const workspace = await prisma.workspace.findUnique({
    where: {
      slug: workspaceSlug,
    },
    select: workspaceSettingsSelect,
  })

  if (!workspace) {
    return null
  }

  const workspaceWhere = {
    workspaceId: workspace.id,
  }

  const [memberCount, taskCount, aiSummaryCount, overdueTaskCount] =
    await Promise.all([
      prisma.workspaceMember.count({
        where: workspaceWhere,
      }),
      prisma.task.count({
        where: workspaceWhere,
      }),
      prisma.aISummary.count({
        where: workspaceWhere,
      }),
      prisma.task.count({
        where: {
          ...workspaceWhere,
          dueDate: {
            lt: getStartOfToday(),
          },
          status: {
            not: TaskStatus.DONE,
          },
        },
      }),
    ])

  return {
    workspace,
    counts: {
      memberCount,
      taskCount,
      aiSummaryCount,
      overdueTaskCount,
    },
    mvpStatus,
  }
}
