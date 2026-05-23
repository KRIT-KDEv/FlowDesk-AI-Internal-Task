export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "REVIEW"
  | "DONE"
  | "BLOCKED";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type Workspace = {
  id: string;
  name: string;
  description: string;
};

export type Member = {
  id: string;
  name: string;
  role: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  statusLabel: string;
  priority: TaskPriority;
  priorityLabel: string;
  dueDate: string;
  assigneeId: string;
  client: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isOverdue: boolean;
};

export type AiSummary = {
  title: string;
  body: string;
};
