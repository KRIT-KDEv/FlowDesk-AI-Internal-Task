# FlowDesk AI - Internal Task Dashboard

FlowDesk AI is an internal workflow and task dashboard MVP for small teams,
freelancers, and agencies that need clearer visibility into work ownership,
deadlines, task status, and team workload.

The current MVP uses Prisma-backed database access for core dashboard and task
data. It includes Demo Auth / Portfolio Auth for controlled walkthroughs and
saved AI summary history, but live AI generation is not enabled yet.

## Product Overview

FlowDesk AI helps small teams see what work is active, overdue, blocked, or
ready for review from one internal dashboard.

The MVP focuses on:

- Task tracking across status, priority, due date, and assignee
- Dashboard visibility for workload and overdue work
- Team workload overview
- Saved AI summary history
- Read-only workspace status and MVP boundaries

Live AI generation is planned future scope. The current AI Summary page displays
saved summary records only.

## Problem Statement

Small teams often manage work across chat, spreadsheets, Notion pages, Trello
boards, and manual updates. This creates scattered task ownership, unclear
workflow status, missed deadlines, and slow reporting.

FlowDesk AI is designed to make the work visible: who owns what, what is due,
what is overdue, and what needs attention before client work slips.

## MVP Scope

This MVP focuses on a polished internal dashboard experience with Prisma-backed
server-side data access:

- Prisma-backed dashboard data
- Task list with search and filters
- Create task
- Task detail
- Edit task
- Limited MVP demo-only Delete Task from task detail
- Read-only workflow board
- Read-only AI summary history
- Read-only team workload
- Read-only workspace settings
- Demo Auth / Portfolio Auth with admin, manager, and viewer roles

## Implemented Features

- Dashboard overview
- Task list with search/filter
- Create task
- Task detail page
- Edit task
- Limited Delete Task from `/tasks/[id]`
- Board view, read-only
- AI summary history, read-only
- Team workload, read-only
- Workspace settings, read-only
- Prisma-backed data layer
- Demo role guard and demo mutation guard

## Not Enabled Yet

The following features are not enabled in the current MVP:

- Production Auth
- Database-backed users
- Workspace / Organization isolation
- Production-grade Permission / Role Guard
- RLS
- Supabase Client
- Live AI generation
- OpenAI/Gemini API integration
- OpenAI SDK
- Invites
- Billing
- Realtime
- API routes
- Archive / Soft Delete
- Restore / Recycle Bin
- Audit Log
- Multi-user production safeguards

## Demo Pages

| Route | Purpose | Mode |
| --- | --- | --- |
| `/dashboard` | Shows Prisma-backed metrics, recent tasks, overdue tasks, and latest saved AI summary preview. | Read-only |
| `/tasks` | Lists Prisma-backed tasks with title search, status filter, and priority filter. | Read-only |
| `/tasks/new` | Provides the Create Task form and creates tasks through a Server Action for allowed demo roles. | Interactive |
| `/tasks/[id]` | Shows Prisma-backed task detail and limited admin demo Delete Task. | Detail + limited delete |
| `/tasks/[id]/edit` | Provides the Edit Task form and updates editable task fields through a Server Action for allowed demo roles. | Interactive |
| `/board` | Groups Prisma-backed tasks by workflow status. | Read-only |
| `/ai-summary` | Shows saved AI summary records from the database. | Read-only |
| `/team` | Shows Prisma-backed team members and workload counts. | Read-only |
| `/settings` | Shows Prisma-backed workspace details, counts, and MVP status. | Read-only |

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Prisma
- Server Actions for Create Task, Edit Task, and limited Delete Task
- Demo-only cookie auth for controlled portfolio walkthroughs
- Database access through Prisma

Supabase Client, production Auth, OpenAI/Gemini API integration, Stripe,
Billing, Realtime, and API routes are not implemented in the current MVP.

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure the required local environment variables.

   The project expects local database environment variables for Prisma. Do not
   commit real values and do not print secrets.

3. Generate Prisma Client if needed:

   ```bash
   npx prisma generate
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

Database migrations and `prisma db push` should only be run when explicitly
planned for a database workstream.

## Project Documentation

- [MVP Status](docs/dashboard/MVP_STATUS.md)
- [Known Limitations](docs/dashboard/KNOWN_LIMITATIONS.md)
- [Portfolio Case Study](docs/dashboard/PORTFOLIO_CASE_STUDY.md)
- [Demo Script](docs/dashboard/DEMO_SCRIPT.md)
- [Product Tiers](docs/dashboard/PRODUCT_TIERS.md)

Additional planning docs:

- `docs/dashboard/DEMO_DATA_PLAN.md`
- `docs/dashboard/DEPLOYMENT_READINESS_CHECKLIST.md`
- `docs/dashboard/AUTH_PERMISSION_STRATEGY_REVIEW.md`

## Portfolio Positioning

This project can be presented as:

- An internal task/workflow dashboard MVP
- A productized freelance dashboard concept
- A case study for dashboard UX, CRUD workflow, Prisma-backed data, and
  AI-ready product planning

The project is intentionally transparent about what is implemented and what is
planned future scope, making it suitable for portfolio review, demo discussion,
and product discovery conversations.

Demo roles are available for portfolio walkthroughs: admin can create, edit,
and delete demo tasks; manager can create and edit; viewer is read-only. This
is not production-grade authentication or authorization.
