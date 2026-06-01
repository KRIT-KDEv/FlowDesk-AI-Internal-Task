import type { Prisma } from "@prisma/client"

import { prisma } from "@/lib/prisma"

const DEFAULT_WORKSPACE_SLUG = "brightads-agency"

const aiSummarySelect = {
  id: true,
  type: true,
  title: true,
  content: true,
  fromDate: true,
  toDate: true,
  createdAt: true,
  updatedAt: true,
  workspace: {
    select: {
      id: true,
      name: true,
      slug: true,
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
} satisfies Prisma.AISummarySelect

export type AISummaryListItem = Prisma.AISummaryGetPayload<{
  select: typeof aiSummarySelect
}>

export async function getAISummaries(
  workspaceSlug = DEFAULT_WORKSPACE_SLUG
): Promise<AISummaryListItem[]> {
  return prisma.aISummary.findMany({
    where: {
      workspace: {
        slug: workspaceSlug,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: aiSummarySelect,
  })
}

export async function getAISummaryPageData(
  workspaceSlug = DEFAULT_WORKSPACE_SLUG
) {
  const summaries = await getAISummaries(workspaceSlug)

  return {
    summaries,
  }
}
