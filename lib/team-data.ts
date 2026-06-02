import { TaskStatus, type MemberRole, type Prisma } from "@prisma/client"

import { prisma } from "@/lib/prisma"

const DEFAULT_WORKSPACE_SLUG = "brightads-agency"

const roleLabels: Record<MemberRole, string> = {
  OWNER: "Owner",
  ADMIN: "Admin",
  MEMBER: "Member",
  VIEWER: "Viewer",
}

const teamMemberSelect = {
  id: true,
  role: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  },
} satisfies Prisma.WorkspaceMemberSelect

type TeamMemberRecord = Prisma.WorkspaceMemberGetPayload<{
  select: typeof teamMemberSelect
}>

type TaskCountGroup = {
  assigneeId: string | null
  _count: {
    _all: number
  }
}

export type TeamMemberWorkload = TeamMemberRecord & {
  roleLabel: string
  assignedTaskCount: number
  inProgressTaskCount: number
  overdueTaskCount: number
  completedTaskCount: number
}

function getStartOfToday(now = new Date()) {
  const startOfToday = new Date(now)
  startOfToday.setHours(0, 0, 0, 0)

  return startOfToday
}

function toCountMap(groups: TaskCountGroup[]) {
  return new Map(
    groups.flatMap((group) =>
      group.assigneeId ? [[group.assigneeId, group._count._all]] : []
    )
  )
}

function getWorkspaceTaskWhere(
  workspaceSlug: string,
  userIds: string[]
): Prisma.TaskWhereInput {
  return {
    workspace: {
      slug: workspaceSlug,
    },
    assigneeId: {
      in: userIds,
    },
  }
}

async function getTaskCountsByAssignee(
  where: Prisma.TaskWhereInput
): Promise<Map<string, number>> {
  const groups = await prisma.task.groupBy({
    by: ["assigneeId"],
    where,
    _count: {
      _all: true,
    },
  })

  return toCountMap(groups)
}

export async function getTeamMembers(
  workspaceSlug = DEFAULT_WORKSPACE_SLUG
): Promise<TeamMemberWorkload[]> {
  const members = await prisma.workspaceMember.findMany({
    where: {
      workspace: {
        slug: workspaceSlug,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    select: teamMemberSelect,
  })

  if (members.length === 0) {
    return []
  }

  const userIds = members.map((member) => member.user.id)
  const workspaceTaskWhere = getWorkspaceTaskWhere(workspaceSlug, userIds)
  const startOfToday = getStartOfToday()

  const [
    assignedTaskCounts,
    inProgressTaskCounts,
    overdueTaskCounts,
    completedTaskCounts,
  ] = await Promise.all([
    getTaskCountsByAssignee(workspaceTaskWhere),
    getTaskCountsByAssignee({
      ...workspaceTaskWhere,
      status: TaskStatus.IN_PROGRESS,
    }),
    getTaskCountsByAssignee({
      ...workspaceTaskWhere,
      dueDate: {
        lt: startOfToday,
      },
      status: {
        not: TaskStatus.DONE,
      },
    }),
    getTaskCountsByAssignee({
      ...workspaceTaskWhere,
      status: TaskStatus.DONE,
    }),
  ])

  return members.map((member) => ({
    ...member,
    roleLabel: roleLabels[member.role],
    assignedTaskCount: assignedTaskCounts.get(member.user.id) ?? 0,
    inProgressTaskCount: inProgressTaskCounts.get(member.user.id) ?? 0,
    overdueTaskCount: overdueTaskCounts.get(member.user.id) ?? 0,
    completedTaskCount: completedTaskCounts.get(member.user.id) ?? 0,
  }))
}

export async function getTeamPageData(workspaceSlug = DEFAULT_WORKSPACE_SLUG) {
  const members = await getTeamMembers(workspaceSlug)

  return {
    members,
  }
}
