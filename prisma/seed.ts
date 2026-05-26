import {
  AISummaryType,
  MemberRole,
  PrismaClient,
  TaskPriority,
  TaskStatus,
} from "@prisma/client"

const prisma = new PrismaClient()

const workspaceSeed = {
  name: "BrightAds Agency",
  slug: "brightads-agency",
}

const userSeeds = [
  {
    name: "Admin",
    email: "admin@brightads.example",
    role: MemberRole.OWNER,
  },
  {
    name: "Designer",
    email: "designer@brightads.example",
    role: MemberRole.MEMBER,
  },
  {
    name: "Content Writer",
    email: "content.writer@brightads.example",
    role: MemberRole.MEMBER,
  },
  {
    name: "Ads Manager",
    email: "ads.manager@brightads.example",
    role: MemberRole.MEMBER,
  },
  {
    name: "Account Manager",
    email: "account.manager@brightads.example",
    role: MemberRole.MEMBER,
  },
]

function dateFromToday(dayOffset: number, hour = 9) {
  const date = new Date()
  date.setHours(hour, 0, 0, 0)
  date.setDate(date.getDate() + dayOffset)
  return date
}

async function upsertTask(input: {
  workspaceId: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: Date
  assigneeId: string
  createdById: string
}) {
  const existingTask = await prisma.task.findFirst({
    where: {
      workspaceId: input.workspaceId,
      title: input.title,
    },
    select: {
      id: true,
    },
  })

  if (existingTask) {
    return prisma.task.update({
      where: {
        id: existingTask.id,
      },
      data: {
        description: input.description,
        status: input.status,
        priority: input.priority,
        dueDate: input.dueDate,
        assigneeId: input.assigneeId,
        createdById: input.createdById,
      },
    })
  }

  return prisma.task.create({
    data: input,
  })
}

async function upsertAISummary(input: {
  workspaceId: string
  type: AISummaryType
  title: string
  content: string
  fromDate: Date
  toDate: Date
  createdById: string
}) {
  const existingSummary = await prisma.aISummary.findFirst({
    where: {
      workspaceId: input.workspaceId,
      type: input.type,
    },
    select: {
      id: true,
    },
  })

  if (existingSummary) {
    return prisma.aISummary.update({
      where: {
        id: existingSummary.id,
      },
      data: {
        title: input.title,
        content: input.content,
        fromDate: input.fromDate,
        toDate: input.toDate,
        createdById: input.createdById,
      },
    })
  }

  return prisma.aISummary.create({
    data: input,
  })
}

async function main() {
  console.log("Seeding FlowDesk AI Dashboard demo data...")

  const workspace = await prisma.workspace.upsert({
    where: {
      slug: workspaceSeed.slug,
    },
    update: {
      name: workspaceSeed.name,
    },
    create: workspaceSeed,
  })

  const usersByName = new Map<string, Awaited<ReturnType<typeof prisma.user.upsert>>>()

  for (const userSeed of userSeeds) {
    const user = await prisma.user.upsert({
      where: {
        email: userSeed.email,
      },
      update: {
        name: userSeed.name,
      },
      create: {
        name: userSeed.name,
        email: userSeed.email,
      },
    })

    usersByName.set(user.name, user)

    await prisma.workspaceMember.upsert({
      where: {
        workspaceId_userId: {
          workspaceId: workspace.id,
          userId: user.id,
        },
      },
      update: {
        role: userSeed.role,
      },
      create: {
        workspaceId: workspace.id,
        userId: user.id,
        role: userSeed.role,
      },
    })
  }

  const admin = usersByName.get("Admin")
  const designer = usersByName.get("Designer")
  const contentWriter = usersByName.get("Content Writer")
  const adsManager = usersByName.get("Ads Manager")
  const accountManager = usersByName.get("Account Manager")

  if (!admin || !designer || !contentWriter || !adsManager || !accountManager) {
    throw new Error("Seed users were not created correctly.")
  }

  await Promise.all([
    upsertTask({
      workspaceId: workspace.id,
      title: "Write Facebook content for Client A",
      description: "Draft a week of Facebook captions for Client A's awareness campaign.",
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.HIGH,
      dueDate: dateFromToday(0, 10),
      assigneeId: contentWriter.id,
      createdById: admin.id,
    }),
    upsertTask({
      workspaceId: workspace.id,
      title: "Design monthly promotion banner",
      description: "Create banner options for the monthly promotion and prepare them for review.",
      status: TaskStatus.REVIEW,
      priority: TaskPriority.HIGH,
      dueDate: dateFromToday(0, 14),
      assigneeId: designer.id,
      createdById: admin.id,
    }),
    upsertTask({
      workspaceId: workspace.id,
      title: "Review weekly ads report",
      description: "Check campaign performance notes and identify changes needed for next week.",
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
      dueDate: dateFromToday(-2, 11),
      assigneeId: adsManager.id,
      createdById: admin.id,
    }),
    upsertTask({
      workspaceId: workspace.id,
      title: "Fix landing page based on feedback",
      description: "Apply client feedback to the landing page copy and hero layout.",
      status: TaskStatus.BLOCKED,
      priority: TaskPriority.URGENT,
      dueDate: dateFromToday(-1, 16),
      assigneeId: designer.id,
      createdById: admin.id,
    }),
    upsertTask({
      workspaceId: workspace.id,
      title: "Prepare proposal for new client",
      description: "Outline project scope, timeline, and estimated deliverables for the new client proposal.",
      status: TaskStatus.TODO,
      priority: TaskPriority.HIGH,
      dueDate: dateFromToday(3, 12),
      assigneeId: accountManager.id,
      createdById: admin.id,
    }),
    upsertTask({
      workspaceId: workspace.id,
      title: "Send draft campaign to client",
      description: "Package creative drafts and send the campaign preview to the client for comments.",
      status: TaskStatus.REVIEW,
      priority: TaskPriority.MEDIUM,
      dueDate: dateFromToday(1, 15),
      assigneeId: accountManager.id,
      createdById: admin.id,
    }),
    upsertTask({
      workspaceId: workspace.id,
      title: "Update campaign performance dashboard",
      description: "Refresh performance metrics and add notes about budget pacing.",
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.HIGH,
      dueDate: dateFromToday(2, 13),
      assigneeId: adsManager.id,
      createdById: admin.id,
    }),
    upsertTask({
      workspaceId: workspace.id,
      title: "Create ad copy variations",
      description: "Write new headline and primary text variations for the next ad test.",
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
      dueDate: dateFromToday(4, 10),
      assigneeId: contentWriter.id,
      createdById: admin.id,
    }),
    upsertTask({
      workspaceId: workspace.id,
      title: "Review client feedback",
      description: "Summarize feedback from the latest client review and mark follow-up actions.",
      status: TaskStatus.DONE,
      priority: TaskPriority.LOW,
      dueDate: dateFromToday(-3, 17),
      assigneeId: accountManager.id,
      createdById: admin.id,
    }),
    upsertTask({
      workspaceId: workspace.id,
      title: "Schedule content calendar",
      description: "Schedule approved posts and verify publishing dates for the upcoming week.",
      status: TaskStatus.DONE,
      priority: TaskPriority.MEDIUM,
      dueDate: dateFromToday(5, 9),
      assigneeId: contentWriter.id,
      createdById: admin.id,
    }),
  ])

  await Promise.all([
    upsertAISummary({
      workspaceId: workspace.id,
      type: AISummaryType.DAILY,
      title: "Daily Summary - BrightAds Agency",
      content:
        "Today has two tasks due, with campaign content and promotion design moving through active review. The landing page fix remains blocked and should be clarified before more design work continues.",
      fromDate: dateFromToday(0, 0),
      toDate: dateFromToday(0, 23),
      createdById: admin.id,
    }),
    upsertAISummary({
      workspaceId: workspace.id,
      type: AISummaryType.WEEKLY,
      title: "Weekly Summary - BrightAds Agency",
      content:
        "This week focuses on client campaign delivery, ads reporting, and proposal preparation. The highest-risk work is the blocked landing page fix and the overdue ads report review.",
      fromDate: dateFromToday(-6, 0),
      toDate: dateFromToday(0, 23),
      createdById: admin.id,
    }),
  ])

  console.log("Seed complete: BrightAds Agency demo data is ready.")
}

main()
  .catch(() => {
    console.error("Seed failed. Check database connection and Prisma schema.")
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
