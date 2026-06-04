# FlowDesk AI Demo Script

## 1. Demo Purpose

This demo shows how FlowDesk AI helps small teams improve task visibility,
ownership, workload awareness, and reporting clarity.

The goal is to make the viewer understand the product quickly: a team lead can
open one dashboard, see what work is active or overdue, create and update tasks,
review workload, and reference saved AI summary history.

## 2. Target Audience

- Small business owners
- Operations teams
- Admin teams
- Freelance clients who need an internal workflow dashboard
- Portfolio reviewers / recruiters

## 3. Demo Positioning

FlowDesk AI is currently an MVP, not a finished SaaS product.

The demo focuses on Prisma-backed workflow visibility, task tracking, team
workload overview, and AI summary history. It is designed to show a realistic
product foundation and portfolio-ready workflow, while staying transparent
about what is not enabled yet.

Live AI generation is not enabled in the current MVP. The AI Summary area shows
saved AI summary history only.

## 4. 3-Minute Demo Flow

| Step | Route | What to show | What to say | MVP status | Notes / risk of overclaiming |
| --- | --- | --- | --- | --- | --- |
| Opening problem | N/A | Brief setup before screen walkthrough. | Small teams often lose track of ownership, deadlines, and reporting because work is spread across chat, spreadsheets, and manual updates. | N/A | Keep the problem practical and avoid claiming this replaces every operations tool. |
| Dashboard | `/dashboard` | Metrics, recent tasks, overdue tasks, latest AI summary preview. | This is the executive snapshot: what is active, overdue, due today, and recently updated. | Read-only | Say Prisma-backed data. Do not claim realtime updates. |
| Task list | `/tasks` | Task table, search, status filter, priority filter. | The task list lets the team review work and narrow down what needs attention. | Read-only | Search/filter are available, but bulk actions and delete are not enabled. |
| Create task | `/tasks/new` | New task form with title, description, status, priority, due date, assignee. | This is one of the current interactive flows: creating a task through a server-side action. | Interactive | Do not claim auth or permissions decide who can create tasks. |
| Task detail | `/tasks/[id]` | Detail fields, assignee, creator, workspace, dates. | Each task has a clear detail page for ownership and status review. | Read-only | Edit is separate; Delete Task is not enabled. |
| Edit task | `/tasks/[id]/edit` | Edit form and validation message area. | This is the second interactive flow: updating task fields like status, priority, due date, and assignee. | Interactive | Do not claim role guard or approval workflow. |
| Board | `/board` | Columns grouped by status. | The board gives a workflow view grouped by Todo, In Progress, Review, Done, and Blocked. | Read-only | Drag-and-drop and board status mutation are not enabled. |
| AI Summary | `/ai-summary` | Saved AI summary cards. | This page shows saved AI summary history for reporting context. | Read-only | Live AI generation is not enabled. |
| Team | `/team` | Member cards and workload counts. | The team view helps a lead see task ownership and workload distribution. | Read-only | Invites, member management, permissions, and role management are not enabled. |
| Settings | `/settings` | Workspace info, counts, MVP status. | Settings is a transparent read-only snapshot of workspace data and MVP boundaries. | Read-only | No editable settings, billing, or permission controls. |
| Closing summary | N/A | Return to dashboard or tasks. | FlowDesk AI is a demo-ready MVP for task visibility, workflow tracking, and AI-ready reporting. | N/A | Emphasize MVP foundation and future scope. |

## 5. 5-Minute Demo Flow

1. **Open with the product problem**

   Small teams often track operations work across chat, spreadsheets, and
   scattered task tools. Ownership becomes unclear, overdue work is easy to
   miss, and weekly reporting becomes manual.

2. **Show `/dashboard`**

   Start with the operational overview. Point out total tasks, in-progress
   tasks, due today tasks, overdue tasks, completed work, recent tasks, overdue
   work, and the latest saved AI summary preview.

   Say: "This page is Prisma-backed, so the metrics and task sections are
   coming from the database-backed task layer."

3. **Show `/tasks`**

   Demonstrate the task list and use search, status filter, or priority filter.
   Explain that this is where a team lead can inspect work across the workspace.

   Say: "This is read-only list interaction. Create and edit happen through
   dedicated task flows."

4. **Show `/tasks/new`**

   Open the create form and explain title, description, status, priority, due
   date, and assignee. If doing a live demo, create a simple task with a clear
   title.

   Say: "Create Task is one of the two enabled interactive task actions in the
   current MVP."

5. **Show `/tasks/[id]`**

   Open the created or existing task detail page. Show title, description,
   status, priority, assignee, creator, workspace, created date, and updated
   date.

   Say: "The detail page makes ownership and workflow status explicit."

6. **Show `/tasks/[id]/edit`**

   Open the edit page and explain that the user can update editable task fields.
   Show status, priority, due date, and assignee as the most demo-friendly
   fields.

   Say: "Edit Task is enabled, but Delete Task and role-based permissions are
   not enabled in this MVP."

7. **Show `/board`**

   Explain the workflow columns: Todo, In Progress, Review, Done, and Blocked.
   Point out that the board helps viewers understand the shape of work without
   opening every task.

   Say: "This board is read-only. Status changes are made through Edit Task,
   not drag-and-drop."

8. **Show `/ai-summary`**

   Explain that saved summary records can support daily or weekly reporting.
   Make the limitation clear.

   Say: "This is AI summary history. Live AI generation is planned future
   scope and is not connected yet."

9. **Show `/team`**

   Show team members, roles, assigned task counts, in-progress counts, overdue
   counts, and completed counts.

   Say: "This helps a team lead see workload distribution without needing a
   separate report."

10. **Show `/settings`**

    End with the read-only workspace settings page because it clearly states
    the current MVP boundaries.

    Say: "This project is transparent about what is implemented and what is
    future scope."

11. **Close with product direction**

    Summarize that FlowDesk AI is a Prisma-backed MVP foundation for internal
    workflow tracking, task management, workload visibility, and AI-ready
    reporting.

## 6. Page-by-Page Talking Points

### `/dashboard`

- **Purpose:** Give a fast operational snapshot of work status and risk.
- **Already implemented:** Prisma-backed metrics, recent tasks, overdue tasks,
  and latest saved AI summary preview.
- **Not enabled yet:** Realtime updates and live AI generation.
- **Best demo line:** "This is the team lead view: what is active, overdue,
  due today, and recently updated."

### `/tasks`

- **Purpose:** Let users review workspace tasks and narrow the list by search,
  status, or priority.
- **Already implemented:** Prisma-backed task list with search/filter.
- **Not enabled yet:** Bulk actions and Delete Task.
- **Best demo line:** "This is where operational work becomes searchable and
  reviewable instead of scattered across chat."

### `/tasks/new`

- **Purpose:** Create a new internal work item.
- **Already implemented:** Create Task form and `createTaskAction()`.
- **Not enabled yet:** Auth-based creator selection, role guard, and permission
  checks.
- **Best demo line:** "This is one of the two interactive MVP flows: adding a
  new task to the workspace."

### `/tasks/[id]`

- **Purpose:** Show the full task context.
- **Already implemented:** Prisma-backed task detail with status, priority,
  due date, assignee, creator, workspace, and timestamps.
- **Not enabled yet:** Delete Task, comments, activity log, and permissions.
- **Best demo line:** "The detail page gives each task a single source of truth
  for ownership and status."

### `/tasks/[id]/edit`

- **Purpose:** Update editable task fields.
- **Already implemented:** Edit Task form and `updateTaskAction()`.
- **Not enabled yet:** Delete Task, role guard, approval workflow, and audit
  trail.
- **Best demo line:** "This is the second interactive MVP flow: updating task
  status, priority, due date, and assignee."

### `/board`

- **Purpose:** Show workflow shape by status.
- **Already implemented:** Prisma-backed read-only board grouped by Todo, In
  Progress, Review, Done, and Blocked.
- **Not enabled yet:** Drag-and-drop and board status mutation.
- **Best demo line:** "The board shows workflow distribution, while edits stay
  in the task edit flow for this MVP."

### `/ai-summary`

- **Purpose:** Show saved summary records for reporting context.
- **Already implemented:** Prisma-backed read-only AI summary history.
- **Not enabled yet:** Live AI generation, OpenAI SDK, and generate summary
  actions.
- **Best demo line:** "This is AI-ready product planning: saved summary history
  exists, while live generation remains future scope."

### `/team`

- **Purpose:** Show workload by team member.
- **Already implemented:** Prisma-backed read-only member and workload counts.
- **Not enabled yet:** Invites, member management, permissions, and role guard.
- **Best demo line:** "This helps a lead see who owns work and where workload
  pressure is building."

### `/settings`

- **Purpose:** Show workspace information, counts, and MVP status.
- **Already implemented:** Prisma-backed read-only workspace settings page.
- **Not enabled yet:** Editable settings, billing, permissions, and live AI
  controls.
- **Best demo line:** "This page makes the MVP boundaries transparent."

## 7. Demo Do / Don't

### Do

- Say "Prisma-backed data."
- Say "AI summary history."
- Say "read-only" for `/board`, `/ai-summary`, `/team`, and `/settings`.
- Say "MVP" and "future scope" clearly.
- Say Create Task and Edit Task are the current interactive task actions.

### Don't

- Do not claim live AI generation.
- Do not claim authentication.
- Do not claim billing.
- Do not claim permissions or role guard.
- Do not claim realtime updates.
- Do not claim Delete Task is available.
- Do not imply the read-only board supports drag-and-drop.

## 8. Closing Pitch

### Portfolio Reviewer

FlowDesk AI is a portfolio-ready internal dashboard MVP that demonstrates
dashboard UX, Prisma-backed data, task CRUD workflow for create/edit, read-only
workflow views, and clear product scope management.

### Freelance Client

FlowDesk AI shows how a small business could replace scattered manual updates
with one internal dashboard for tasks, ownership, deadlines, workload, and
reporting context.

### Future Product Direction

The current MVP is a stable foundation for future workstreams such as Delete
Task, authentication, permissions, deployment readiness, and live AI summary
generation.
