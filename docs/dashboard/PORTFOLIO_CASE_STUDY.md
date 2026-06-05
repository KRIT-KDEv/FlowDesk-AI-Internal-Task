# FlowDesk AI Portfolio Case Study

## 1. Project Summary

FlowDesk AI is a Prisma-backed internal task and workflow dashboard MVP for
small teams. It helps a team see task status, ownership, workload pressure, and
saved AI summary history from one internal dashboard.

The current project is an MVP and a productized freelance dashboard concept. It
is portfolio-ready, but it is not a production-ready SaaS product.

The MVP demonstrates:

- Task tracking
- Workflow visibility
- Team workload overview
- AI summary history
- Prisma-backed data access
- Create Task and Edit Task workflows

Live AI generation, Auth, Billing, Delete Task, Permission / Role Guard, RLS,
Realtime, Invites, Supabase Client, OpenAI SDK, and API routes are not enabled
in the current MVP.

## 2. Problem

Small teams often manage work across chat, spreadsheets, manual notes, and
separate task tools. This creates several operational problems:

- Tasks are scattered across too many places.
- Ownership is unclear.
- There is no central workflow visibility.
- Status reporting takes manual effort.
- Team workload is hard to monitor.
- Overdue or blocked work is easy to miss.

FlowDesk AI is designed around a simple idea: make internal work visible before
it becomes a client, customer, or operations problem.

## 3. Target Users

- Small business owners
- Operations teams
- Admin teams
- Support teams
- Freelance clients who need internal workflow dashboards

The strongest demo use case is a small team that needs a clear internal system
for tasks, ownership, deadlines, blockers, and reporting context.

## 4. Product Goal

The goal is to create a simple internal dashboard that helps teams:

- Track tasks
- See status and ownership
- Understand workload
- Review summary/history data
- Prepare for future AI-assisted reporting

The MVP intentionally focuses on workflow visibility before advanced SaaS
features such as Auth, Billing, Realtime, or live AI generation.

## 5. MVP Scope

The current MVP supports:

- Prisma-backed dashboard data
- Task list with search/filter
- Create task through `createTaskAction()`
- Task detail from Prisma
- Edit task through `updateTaskAction()`
- Read-only board
- Read-only AI summary history
- Read-only team workload
- Read-only workspace settings

Create Task and Edit Task are the current interactive task actions. Board, AI
summary history, team workload, and workspace settings are read-only in the
current MVP.

## 6. Implemented Features

### Dashboard Overview

The dashboard shows Prisma-backed operational metrics, recent tasks, overdue
tasks, and the latest saved AI summary preview. It is the main overview page
for workflow visibility.

### Task List And Filtering

The task list is Prisma-backed and supports search/filter behavior for title,
status, and priority. It helps users review task ownership and workflow state.

### Task Creation

The Create Task flow is implemented through `/tasks/new` and
`createTaskAction()`. Users can create a task with core fields such as title,
description, status, priority, due date, and assignee.

### Task Detail

The task detail page reads one task from Prisma and displays key context:
title, description, status, priority, due date, assignee, creator, workspace,
created date, and updated date.

### Task Editing

The Edit Task flow is implemented through `/tasks/[id]/edit` and
`updateTaskAction()`. Users can update editable task fields such as title,
description, status, priority, due date, and assignee.

### Read-only Board

The board groups Prisma-backed tasks by status. It is read-only in the current
MVP. Drag-and-drop and board status mutation are not enabled.

### Read-only AI Summary History

The AI Summary page displays saved AI summary history records. Live AI
generation is not enabled, and OpenAI SDK is not integrated.

### Read-only Team Workload

The Team page shows members and workload counts for visibility. It does not
include invites, member management, permissions, or role guard behavior.

### Read-only Workspace Settings

The Settings page shows workspace information, counts, and MVP status. It is
read-only and does not include billing, editable settings, or permission
controls.

### Prisma-backed Data Layer

The MVP keeps database access server-side through Prisma-backed helper
functions and server actions where applicable.

## 7. Demo Flow

A clear demo flow:

1. Start with the workflow visibility problem.
2. Show `/dashboard` for metrics, recent tasks, overdue tasks, and latest saved
   AI summary preview.
3. Show `/tasks` for task list search/filter.
4. Create a task through `/tasks/new`.
5. Open `/tasks/[id]` to review task detail.
6. Edit a task through `/tasks/[id]/edit`.
7. Show `/board` as a read-only workflow view.
8. Show `/ai-summary` as read-only AI summary history.
9. Show `/team` as read-only team workload.
10. Close with `/settings` or the dashboard to explain MVP limitations and
    future scope.

This flow highlights the two interactive task actions: create task and edit
task. It also makes clear which supporting views are read-only.

## 8. System Design Overview

At a high level, FlowDesk AI uses:

- Next.js app structure for routes and server-rendered pages
- React UI for dashboard, task, board, AI summary, team, and settings screens
- TypeScript for safer development
- Prisma-backed data access for database reads and task mutations
- Server Actions for create and update task workflows
- App routes for dashboard and task views

The MVP does not use Supabase Client, Supabase Auth, OpenAI SDK, Stripe,
Realtime, or API routes as implemented technologies.

## 9. Data Model Overview

The current MVP data model is organized around a small internal workflow
dashboard:

- **Tasks:** Work items with title, description, status, priority, due date,
  workspace, creator, and optional assignee.
- **Owners/team members:** Users and workspace members represent the people who
  create, own, or are assigned work.
- **Workspace context:** Tasks, members, and AI summaries belong to a workspace.
- **Departments:** Departments are useful for demo and product planning, but
  they are not a separate implemented model in the current MVP.
- **Status and priority fields:** Status supports workflow visibility; priority
  helps show urgency.
- **AI summary history records:** Saved summary records provide reporting
  history and future AI product direction.

This model is intentionally small so the MVP stays clear and demo-ready.

## 10. Technical Decisions

- **Next.js:** Supports a full-stack app structure with app routes and
  server-rendered pages.
- **TypeScript:** Improves safety and clarity across data shapes, UI props, and
  server-side logic.
- **Prisma:** Provides structured database access and a clear data layer for
  tasks, workspace data, team workload, and summary records.
- **Server Actions:** Keep create and update task flows server-side without
  adding API routes in the current MVP.
- **Read-only supporting pages:** Board, AI summary, team, and settings stay
  read-only to reduce MVP complexity and avoid overbuilding.
- **Documentation-first workstream:** README, demo docs, product tiers, known
  limitations, and this case study make the project easier to present and
  scope honestly.

## 11. Product Decisions

- The MVP focuses on dashboard visibility before advanced SaaS features.
- Auth, Billing, Realtime, Invites, and Permission / Role Guard are deferred
  because they require product, security, and scope decisions.
- AI is positioned as saved summary history now and live AI generation later.
- Product tiers and pricing/package ideas are documented before building
  Billing so the business model can be validated before technical investment.
- Delete or Archive Task is a practical future workflow feature, but Delete
  Task is not enabled in the current MVP.

## 12. Known Limitations

Current limitations:

- Delete Task is not enabled.
- Auth is not enabled.
- Permission / Role Guard is not implemented.
- RLS is not implemented.
- Supabase Client is not enabled.
- Live AI generation is not enabled.
- OpenAI SDK is not integrated.
- Invites are not implemented.
- Billing is not implemented.
- Realtime is not implemented.
- API routes are not implemented.
- Board, AI summary history, team workload, and settings are read-only.

The MVP should not be described as protected, multi-tenant, realtime,
AI-generating, billing-enabled, or production-ready SaaS.

## 13. Future Roadmap

Practical future phases:

1. Delete or Archive Task
2. Authentication
3. Permission / Role Guard
4. Live AI summary generation
5. Invite/team management
6. Realtime notifications or updates
7. Billing only after product validation

These are planned future scope items, not implemented features.

## 14. Portfolio Value

This project demonstrates:

- Full-stack dashboard planning
- Scoped task read/create/update workflow implementation
- Prisma-backed data modeling
- Product thinking and MVP prioritization
- Demo planning and product documentation
- Honest MVP scoping
- Freelance package positioning

It is useful as both a technical portfolio project and a productized freelance
concept.

## 15. Resume Bullets

- Built a Prisma-backed internal task dashboard MVP with task list filtering,
  task creation, task detail, and task edit workflows.
- Designed read-only workflow board, team workload, workspace settings, and AI
  summary history views to support demo-ready product storytelling.
- Implemented server-side create and update task workflows with clear MVP
  boundaries and future-scope documentation.
- Created product documentation covering demo script, demo data, product tiers,
  known limitations, and portfolio positioning.
- Framed the project as a productized freelance dashboard concept with honest
  scope boundaries and roadmap planning.

## 16. Case Study Summary

FlowDesk AI is a demo-ready and portfolio-ready internal workflow dashboard MVP.
It shows how a small team could track tasks, understand ownership, review
workload, and prepare for AI-assisted reporting.

The project is intentionally transparent about its limitations. It is not a
production-ready SaaS product yet, but it is a strong foundation for future
workstreams such as Delete or Archive Task, Auth, Permission / Role Guard, Live
AI, Invites, Realtime, and Billing after product validation.
