# FlowDesk AI Dashboard MVP Status

## 1. MVP Core Status

This document captures the current FlowDesk MVP Core checkpoint.

The MVP is a Prisma-backed internal workflow dashboard for the BrightAds Agency
demo workspace. The app now has database-backed dashboard, task, board, AI
summary, team, and settings views. Create Task and Edit Task are enabled as the
only mutation-capable flows.

This checkpoint is not a production-readiness signoff. Auth, permissions, RLS,
live AI generation, billing, realtime, invites, API routes, and Delete Task are
still intentionally out of scope.

## 2. Route Map

| Route | Data source | Prisma-backed | Mode | Main limitation |
| --- | --- | --- | --- | --- |
| `/dashboard` | `getDashboardData()` from `lib/dashboard-data.ts` | Yes | Read-only | Shows saved database data only; no live AI generation. |
| `/tasks` | `getTaskListData()` from `lib/task-data.ts` | Yes | Read-only | Search/filter are read-only; no bulk actions or delete. |
| `/tasks/new` | `getCreateTaskFormData()` and `createTaskAction()` | Yes | Mutation-capable | Uses seeded BrightAds Agency workspace and Admin user; no auth. |
| `/tasks/[id]` | `getTaskDetailData()` from `lib/task-data.ts` | Yes | Read-only | Detail view only; edit is a separate route and delete is disabled. |
| `/tasks/[id]/edit` | `getEditTaskFormData()` and `updateTaskAction()` | Yes | Mutation-capable | Updates only editable task fields; no role guard. |
| `/board` | `getBoardData()` from `lib/task-data.ts` | Yes | Read-only | No drag-and-drop or status mutation from the board. |
| `/ai-summary` | `getAISummaryPageData()` from `lib/ai-summary-data.ts` | Yes | Read-only | Displays saved summaries only; no live AI generation. |
| `/team` | `getTeamPageData()` from `lib/team-data.ts` | Yes | Read-only | Workload view only; no invites, permissions, or member management. |
| `/settings` | `getWorkspaceSettingsData()` from `lib/settings-data.ts` | Yes | Read-only | Status snapshot only; no editable settings or billing. |

## 3. Prisma-backed Areas

- Dashboard metrics, recent tasks, overdue tasks, and latest AI summary preview
- Task list, title search, status filter, and priority filter
- Task detail page
- Create Task flow
- Edit Task flow
- Board read-only task grouping by status
- AI Summary read-only saved records
- Team workload read-only member and task counts
- Settings read-only workspace, counts, and MVP status

## 4. Mutation Boundaries

- Create Task is enabled through `createTaskAction()` in
  `app/tasks/new/actions.ts`.
- Edit Task is enabled through `updateTaskAction()` in
  `app/tasks/[id]/edit/actions.ts`.
- Delete Task is not enabled.
- No other mutation routes, API routes, or unrelated server actions are part of
  the MVP checkpoint.

## 5. Mock / Static Areas

- `lib/mock-data.ts` still exists.
- Primary MVP route data no longer depends on `lib/mock-data.ts`.
- The app shell still uses `demoWorkspace.name` from `lib/mock-data.ts` only as
  a static workspace label in:
  - `components/layout/app-sidebar.tsx`
  - `components/layout/app-topbar.tsx`

The remaining mock usage is display-only shell copy. It is not the source for
dashboard metrics, task lists, task detail, board columns, AI summaries, team
workload, or settings counts.

## 6. Not Enabled Yet

- Delete Task
- Auth
- Permissions / Role Guard
- RLS
- Supabase Client
- Live AI generation
- OpenAI SDK
- Invites
- Billing
- Realtime
- API routes

## 7. Hardcoded MVP Assumptions

- BrightAds Agency workspace slug: `brightads-agency`
- Seeded Admin user: `admin@brightads.example`
- Server-side Prisma only
- No auth scoping yet
- No role guard yet

These assumptions are acceptable for the MVP demo checkpoint, but they should be
revisited before production use or multi-workspace use.

## 8. Known Warnings / Technical Debt

- Prisma `package.json#prisma` seed config deprecation warning for Prisma 7.
  The seed config should eventually move to the newer Prisma config path.
- Webpack cache warning may appear during builds or temp-copy validation.
- LF/CRLF warning may appear on Windows when files are edited.
- Test data may exist from manual create/edit regression if it has not been
  cleaned yet. Review clearly named test tasks before demo or release handoff.

## 9. Suggested Next Workstreams

- Sub Chat A: Product Docs / Demo / Pricing
- Sub Chat B: Deployment Readiness
- Sub Chat C: Delete Task Flow
- Sub Chat D: Auth + Permission
- Sub Chat E: Live AI Summary

## 10. Safe Scope Rules for Future Work

- Do not read, print, modify, overwrite, or delete `.env`.
- Do not run migrations or `prisma db push` unless explicitly planned.
- Do not modify Prisma schema unless explicitly planned.
- Keep features scoped to one workstream at a time.
- Keep database access server-side through Prisma until a new security plan is
  explicitly approved.
- Do not add Supabase Client, Auth, RLS, live AI, API routes, or Delete Task
  outside their dedicated workstreams.
