# FlowDesk AI Portfolio Case Study

## 1. Project Overview

FlowDesk AI is an AI-ready internal task and workflow dashboard MVP for small
teams. It brings task status, ownership, workload visibility, and saved summary
history into one Prisma-backed dashboard.

The project is designed as both a portfolio case study and a productized
freelance dashboard concept. It is demo-ready, but it should not be presented
as a production-ready SaaS product.

At a glance:

| Area | Current MVP status |
| --- | --- |
| Core data | Prisma-backed dashboard, tasks, board, AI summary history, team, and settings |
| Task actions | Create, edit, and limited MVP demo-only hard delete |
| Demo access | Demo Auth / Portfolio Auth with `admin`, `manager`, and `viewer` roles |
| AI scope | Read-only saved AI summary history; live AI is optional future add-on scope |
| Production scope | Production Auth, workspace isolation, RLS, billing, realtime, and API routes are not enabled |

## 2. Problem Statement

Small teams often manage work across chat, spreadsheets, manual notes, and
separate task tools. This creates practical operations problems:

- Tasks are scattered across too many places.
- Ownership and priority are unclear.
- Team leads lack a fast workflow overview.
- Status reporting takes manual effort.
- Overdue or blocked work is easy to miss.

FlowDesk AI focuses on a simple product promise: make internal work visible
before it becomes a client, customer, or operations problem.

## 3. Target Users

- Small business owners
- Operations teams
- Admin teams
- Support teams
- Freelance clients who need internal workflow dashboards
- Portfolio reviewers evaluating dashboard, data, and product-thinking work

The strongest demo use case is a small agency or operations team that needs a
clear internal system for tasks, ownership, deadlines, blockers, and reporting
context.

## 4. MVP Scope

The current MVP supports:

- Prisma-backed dashboard data
- Task list with search/filter
- Create task through `createTaskAction()`
- Task detail from Prisma
- Edit task through `updateTaskAction()`
- Limited MVP demo-only Delete Task from `/tasks/[id]`
- Demo Auth / Portfolio Auth with `admin`, `manager`, and `viewer` roles
- Read-only board
- Read-only saved AI summary history
- Read-only team workload
- Read-only workspace settings

The MVP intentionally prioritizes workflow visibility, task operations, and
demo-safe role behavior before heavier SaaS features.

## 5. Key Implemented Features

### Dashboard Overview

The dashboard shows Prisma-backed operational metrics, recent tasks, overdue
tasks, and the latest saved AI summary preview.

### Task List And Filtering

The task list is Prisma-backed and supports title search, status filtering, and
priority filtering.

### Task Create / Detail / Edit

Task creation uses `/tasks/new` and `createTaskAction()`. Task detail shows key
context such as status, priority, due date, assignee, creator, workspace, and
timestamps. Task editing uses `/tasks/[id]/edit` and `updateTaskAction()`.

### Limited Delete Task

Admin can delete a demo task from `/tasks/[id]` through a limited MVP demo-only
hard delete flow. This is not archive/soft delete and does not include restore,
recycle bin, audit log, or production multi-user safeguards.

### Read-only Supporting Views

The board, AI summary history, team workload, and workspace settings pages are
read-only. They support workflow understanding without expanding the MVP into a
large operations platform.

## 6. Demo Roles And Permission Behavior

Demo Auth / Portfolio Auth supports controlled walkthroughs with three demo
roles:

| Demo role | Current behavior |
| --- | --- |
| `admin` | Can access all MVP routes and create, edit, and delete demo tasks |
| `manager` | Can access workflow routes and create/edit tasks, but cannot delete tasks or access settings |
| `viewer` | Read-only role for dashboard, task list/detail, board, and AI summary history |

The app includes app-level demo route guards, role-aware navigation, role-aware
task action visibility, and server-side demo mutation guards. This is not
production-grade authentication or authorization.

## 7. Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Prisma
- Server Actions for task create/edit/delete flows
- Demo-only cookie auth for controlled portfolio walkthroughs

The MVP does not use Supabase Client, production auth providers, OpenAI/Gemini
API integration, OpenAI SDK, Stripe, Realtime, Billing, or API routes as
implemented technologies.

## 8. Route Overview

| Route | Purpose | Current interaction |
| --- | --- | --- |
| `/dashboard` | Operational overview with task metrics and saved AI summary preview | Read-only |
| `/tasks` | Searchable/filterable Prisma-backed task list | Read-only |
| `/tasks/new` | Create Task flow for allowed demo roles | Interactive |
| `/tasks/[id]` | Task detail with limited admin demo delete | Detail + limited delete |
| `/tasks/[id]/edit` | Edit Task flow for allowed demo roles | Interactive |
| `/board` | Tasks grouped by status | Read-only |
| `/ai-summary` | Saved AI summary history records | Read-only |
| `/team` | Team workload visibility | Read-only |
| `/settings` | Workspace status and counts | Read-only |

## 9. Product Decisions And Trade-offs

- **Dashboard-first scope:** The MVP emphasizes visibility and clarity before
  advanced SaaS infrastructure.
- **Server-side Prisma access:** Database-backed pages and task mutations stay
  server-side through Prisma.
- **Server Actions over API routes:** Create, edit, and delete flows use Server
  Actions, avoiding public API surface in the MVP.
- **Read-only supporting pages:** Board, AI summary history, team, and settings
  remain read-only to keep the MVP focused and demoable.
- **Demo Auth before production Auth:** Demo roles support portfolio
  storytelling, while production identity, workspace isolation, and real
  authorization stay future scope.
- **Hard delete as MVP-only:** Limited Delete Task improves workflow demo
  completeness, but production-safe archive/restore is still a future decision.

## 10. AI Boundary And Future Add-on Positioning

FlowDesk AI is an AI-ready task dashboard designed for future AI summary
integration. The current MVP includes a read-only saved AI summary history page.

Live AI generation is not enabled. OpenAI/Gemini API integration is not
connected. The project should not be described as an autonomous AI agent,
real-time AI analysis system, or production AI automation tool.

For client packaging, live AI summary generation can be positioned as an
optional paid add-on that would require provider setup, prompt design, cost
controls, logging, safety review, and error handling.

## 11. Current Limitations

Current limitations are intentionally clear:

- Demo Auth is not production Auth.
- Demo role guard is not production RBAC or tenant-safe access control.
- Delete Task is demo-only hard delete, not archive/soft delete.
- No restore, recycle bin, audit log, or production multi-user safeguards.
- No database-backed users or workspace/organization isolation.
- No RLS, Supabase Client, invites, billing, realtime, or API routes.
- No live AI generation or OpenAI/Gemini connection.

Detailed limitation language is maintained in
`docs/dashboard/KNOWN_LIMITATIONS.md`.

## 12. Future Roadmap / Client Add-on Opportunities

Practical future workstreams:

1. Archive / Soft Delete and restore safeguards
2. Production Auth and database-backed users
3. Production-grade role and permission model
4. Live AI summary generation as optional paid add-on
5. Invite/team management
6. Realtime notifications or updates
7. Billing only after product validation

For freelance/client discussion, these should be scoped as separate add-ons or
future phases rather than implied as part of the current MVP.

## 13. Resume / Portfolio Bullets

- Built a Prisma-backed internal task dashboard MVP with task list filtering,
  task creation, task detail, task edit, and limited demo delete workflows.
- Implemented Demo Auth / Portfolio Auth with admin, manager, and viewer roles,
  route/navigation guards, and server-side demo mutation guards.
- Designed read-only workflow board, team workload, workspace settings, and AI
  summary history views to support demo-ready product storytelling.
- Created product documentation for demo flow, product tiers, known
  limitations, deployment readiness, and portfolio positioning.
- Framed the project as a productized freelance dashboard concept with honest
  MVP boundaries and clear add-on opportunities.

## 14. Final Summary

FlowDesk AI is a polished internal workflow dashboard MVP for portfolio,
GitHub, resume, and client-offer discussion. It demonstrates full-stack product
planning, Prisma-backed task workflows, demo auth and role behavior, and
AI-ready reporting direction without overclaiming production security or live
AI capability.

The strongest positioning is: a demo-ready internal task dashboard foundation
that can become a paid client system after production Auth, workspace
isolation, safer delete/archive behavior, and optional live AI generation are
explicitly scoped.
