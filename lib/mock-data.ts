import type {
  AiSummary,
  Member,
  Task,
  TaskPriority,
  TaskStatus,
  Workspace
} from "@/types";

export const demoWorkspace: Workspace = {
  id: "workspace-brightads",
  name: "BrightAds Agency",
  description:
    "Demo small agency workspace for content, design, ads, and client work."
};

export const DEMO_TODAY = "2026-05-24";

export const demoMembers: Member[] = [
  {
    id: "member-admin",
    name: "Admin",
    role: "Team Lead"
  },
  {
    id: "member-designer",
    name: "Designer",
    role: "Design"
  },
  {
    id: "member-content-writer",
    name: "Content Writer",
    role: "Content"
  },
  {
    id: "member-ads-manager",
    name: "Ads Manager",
    role: "Paid Ads"
  },
  {
    id: "member-account-manager",
    name: "Account Manager",
    role: "Client Success"
  }
];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  REVIEW: "Review",
  DONE: "Done",
  BLOCKED: "Blocked"
};

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent"
};

export const TASK_STATUS_COLUMNS: Array<{
  status: TaskStatus;
  label: string;
}> = [
  { status: "TODO", label: TASK_STATUS_LABELS.TODO },
  { status: "IN_PROGRESS", label: TASK_STATUS_LABELS.IN_PROGRESS },
  { status: "REVIEW", label: TASK_STATUS_LABELS.REVIEW },
  { status: "DONE", label: TASK_STATUS_LABELS.DONE },
  { status: "BLOCKED", label: TASK_STATUS_LABELS.BLOCKED }
];

const taskSeeds: Array<
  Omit<Task, "statusLabel" | "priorityLabel" | "isOverdue">
> = [
  {
    id: "task-facebook-content-client-a",
    title: "Write Facebook content for Client A",
    description:
      "Draft a one-week Facebook content set for Client A's new campaign.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    dueDate: "2026-05-23",
    assigneeId: "member-content-writer",
    client: "Client A",
    tags: ["content", "facebook"],
    createdAt: "2026-05-20",
    updatedAt: "2026-05-22"
  },
  {
    id: "task-monthly-promotion-banner",
    title: "Design monthly promotion banner",
    description: "Create the main campaign banner for next month's promotion.",
    status: "REVIEW",
    priority: "MEDIUM",
    dueDate: "2026-05-24",
    assigneeId: "member-designer",
    client: "Retail Client",
    tags: ["design", "promotion"],
    createdAt: "2026-05-19",
    updatedAt: "2026-05-22"
  },
  {
    id: "task-weekly-ads-report",
    title: "Review weekly ads report",
    description: "Check ad performance and prepare notes for the client call.",
    status: "TODO",
    priority: "HIGH",
    dueDate: "2026-05-22",
    assigneeId: "member-ads-manager",
    client: "Client B",
    tags: ["ads", "reporting"],
    createdAt: "2026-05-21",
    updatedAt: "2026-05-21"
  },
  {
    id: "task-landing-page-feedback",
    title: "Fix landing page based on feedback",
    description: "Apply client feedback to headline, CTA copy, and hero layout.",
    status: "BLOCKED",
    priority: "URGENT",
    dueDate: "2026-05-21",
    assigneeId: "member-designer",
    client: "Client A",
    tags: ["landing-page", "client-feedback"],
    createdAt: "2026-05-18",
    updatedAt: "2026-05-22"
  },
  {
    id: "task-new-client-proposal",
    title: "Prepare proposal for new client",
    description: "Draft a simple service proposal for the discovery call.",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: "2026-05-27",
    assigneeId: "member-admin",
    client: "Prospect",
    tags: ["proposal", "sales"],
    createdAt: "2026-05-22",
    updatedAt: "2026-05-22"
  },
  {
    id: "task-send-draft-campaign",
    title: "Send draft campaign to client",
    description: "Send campaign draft and collect approval notes.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    dueDate: "2026-05-23",
    assigneeId: "member-account-manager",
    client: "Client C",
    tags: ["client", "campaign"],
    createdAt: "2026-05-21",
    updatedAt: "2026-05-22"
  },
  {
    id: "task-performance-dashboard",
    title: "Update campaign performance dashboard",
    description: "Refresh campaign metrics before the weekly review.",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: "2026-05-25",
    assigneeId: "member-ads-manager",
    client: "Client B",
    tags: ["dashboard", "performance"],
    createdAt: "2026-05-20",
    updatedAt: "2026-05-22"
  },
  {
    id: "task-ad-copy-variations",
    title: "Create ad copy variations",
    description: "Write three new ad copy angles for testing.",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    dueDate: "2026-05-26",
    assigneeId: "member-content-writer",
    client: "Client C",
    tags: ["ads", "copywriting"],
    createdAt: "2026-05-22",
    updatedAt: "2026-05-22"
  },
  {
    id: "task-review-client-feedback",
    title: "Review client feedback",
    description: "Review comments and turn them into follow-up task notes.",
    status: "REVIEW",
    priority: "LOW",
    dueDate: "2026-05-24",
    assigneeId: "member-account-manager",
    client: "Client A",
    tags: ["client-feedback"],
    createdAt: "2026-05-21",
    updatedAt: "2026-05-22"
  },
  {
    id: "task-schedule-content-calendar",
    title: "Schedule content calendar",
    description: "Place approved content into next week's publishing calendar.",
    status: "DONE",
    priority: "LOW",
    dueDate: "2026-05-22",
    assigneeId: "member-content-writer",
    client: "Client D",
    tags: ["content", "calendar"],
    createdAt: "2026-05-18",
    updatedAt: "2026-05-22"
  }
];

export const demoTasks: Task[] = taskSeeds.map((task) => ({
  ...task,
  statusLabel: TASK_STATUS_LABELS[task.status],
  priorityLabel: TASK_PRIORITY_LABELS[task.priority],
  isOverdue: task.status !== "DONE" && task.dueDate < DEMO_TODAY
}));

export const aiSummaries: AiSummary[] = [
  {
    title: "AI Daily Summary",
    body:
      "Focus today on the Facebook content, the draft campaign send-out, and the blocked landing page task. Two items need immediate follow-up."
  },
  {
    title: "AI Weekly Summary",
    body:
      "The team is moving client campaign work forward, but design and ads review tasks are becoming bottlenecks. Keep review cycles short this week."
  },
  {
    title: "Overdue Summary",
    body:
      "Two tasks are overdue: weekly ads report review and landing page fixes. The blocked landing page task is the highest-risk item."
  },
  {
    title: "Priority Suggestions",
    body:
      "Handle urgent blocked work first, then high-priority client-facing sends, followed by campaign reporting and upcoming content tasks."
  }
];
