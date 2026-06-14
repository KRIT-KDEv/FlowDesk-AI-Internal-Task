# FlowDesk AI Deployment Audit

## Purpose

This document captures the Workstream B Phase B1 deployment readiness audit for
the FlowDesk AI Internal Task Dashboard.

The goal is to document whether the current MVP is ready to move into
deployment verification, not to change app behavior or claim production
readiness. This audit is documentation-only and uses the existing MVP status and
known limitations as the source of truth.

## Current MVP Deployment Scope

The current deployment scope is the FlowDesk AI MVP demo for the BrightAds
Agency workspace. The app includes Demo Auth / Portfolio Auth for controlled
portfolio walkthroughs. It should not be described as production-authenticated,
multi-tenant, or production-secure.

Demo deployment route scope:

| Route | Current data mode | Interaction level | Deployment note |
| --- | --- | --- | --- |
| `/dashboard` | Prisma-backed | Read-only | Dashboard overview for metrics, recent tasks, overdue tasks, and latest saved AI summary preview. |
| `/tasks` | Prisma-backed | Read-only | Task list with search and filter behavior. |
| `/tasks/new` | Prisma-backed | Interactive create task | Creates tasks through `createTaskAction()`. |
| `/tasks/[id]` | Prisma-backed | Detail + limited delete | Task detail page with admin-only MVP demo hard delete. |
| `/tasks/[id]/edit` | Prisma-backed | Interactive edit task | Updates editable task fields through `updateTaskAction()`. |
| `/board` | Prisma-backed | Read-only | Workflow board grouped by status; no drag-and-drop or board mutation. |
| `/ai-summary` | Prisma-backed | Read-only | Saved AI summary history only; no live AI generation. |
| `/team` | Prisma-backed | Read-only | Team workload visibility only. |
| `/settings` | Prisma-backed | Read-only | Workspace settings and MVP status snapshot only. |

Create Task, Edit Task, and limited Delete Task are the mutation-capable flows
in the current MVP. All other pages should be presented as read-only demo views.

## Deployment Blockers

No app changes were made during this audit. The following items should be
treated as deployment blockers or verification needs before a public demo or
production-style deployment:

- **Production Auth and access control are not enabled.** Demo Auth and demo
  role guards are available for controlled walkthroughs, but the app should not
  be deployed as a protected production system until production Auth,
  workspace isolation, and production Permission / Role Guard are scoped and
  implemented.
- **Environment configuration needs verification.** Production or demo hosting
  must define required environment variables in the hosting provider dashboard.
  Real values must never be committed or exposed.
- **Database availability needs verification.** The deployed app requires a
  reachable database configured for Prisma access.
- **Migration and seed state need verification.** This audit did not run
  migrations, `prisma db push`, seed commands, or any database commands.
- **Demo data readiness needs verification.** The BrightAds Agency workspace and
  expected demo records should be confirmed before a live walkthrough.
- **Build, lint, and route smoke tests were not run in B1.** These should be
  completed in a later deployment verification phase.
- **No custom `vercel.json` is present.** Platform-specific deployment settings
  should be verified in B2 or a later deployment-readiness phase.

Items that cannot be confirmed without running commands or checking deployment
provider settings are marked as Needs verification rather than assumed ready.

## Environment And Secret Safety

Real environment values must never be committed, printed, logged, or exposed.
This audit did not read, print, inspect, modify, overwrite, delete, or expose
`.env` files.

Production or demo deployment will require environment variables to be
configured in the hosting provider dashboard. Documentation should use
placeholders only.

Expected placeholder names:

- `DATABASE_URL`
- `DIRECT_URL`

Do not include real database URLs, tokens, keys, or secrets in documentation,
source files, screenshots, issue comments, commits, or demo materials.

## Prisma And Database Readiness

The current MVP uses server-side Prisma-backed data access. Prisma is the main
database access layer for dashboard, task, board, AI summary, team, and settings
data.

Deployment considerations:

- Prisma Client must be available in the deployment build.
- `DATABASE_URL` must be configured for Prisma runtime access.
- `DIRECT_URL` must be configured where Prisma direct database access is
  required by the deployment or maintenance workflow.
- The database must be reachable from the hosting provider runtime.
- The deployed database must contain the expected schema and demo data.
- BrightAds Agency demo assumptions should be verified before demo deployment.

No Prisma migrations, `prisma db push`, seed commands, or database commands were
run in B1.

## Unsupported Features And Demo Boundaries

The following features are intentionally not enabled in the current MVP:

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

Demo Auth / Portfolio Auth, app-level demo role guard, demo mutation guard, and
limited MVP demo-only Delete Task are enabled only for controlled walkthroughs.

Demo language should make these boundaries clear. The app can be presented as a
Prisma-backed internal workflow dashboard MVP, but it should not be presented as
a production-ready SaaS platform.

## Build And Verification Status

Build and verification commands were not run in B1.

Current B1 command status:

- `npm run lint`: Not run in B1
- `npm run build`: Not run in B1
- Route smoke tests: Not run in B1
- Database connectivity checks: Not run in B1
- Prisma migrations, `prisma db push`, and seed commands: Not run in B1

Recommended checks for later phases:

- Run lint and build in a safe environment.
- Run a deployment-oriented route smoke test for all MVP routes.
- Confirm required hosting environment variables are configured without
  exposing values.
- Confirm database connectivity and demo data availability.
- Confirm create, edit, and limited admin delete task flows work in the
  deployment target for the intended demo roles.
- Confirm unsupported features are not accidentally presented as enabled.

## Risk Matrix

| Risk | Impact | Current status | Recommended next phase |
| --- | --- | --- | --- |
| Missing production Auth and access control | Public or client-facing deployment would not be production protected. | Demo Auth only; production Auth not enabled | Scope production Auth, workspace isolation, and Permission / Role Guard in a future security workstream. |
| Missing RLS or tenant isolation | The app should not be described as production-grade multi-tenant software. | Not enabled in MVP | Define access isolation requirements before production use. |
| Database and environment configuration not verified | Deployed pages may fail if `DATABASE_URL`, `DIRECT_URL`, or database reachability are incorrect. | Needs verification | Verify hosting environment variables and database connectivity in B2. |
| Build and route smoke tests not run in B1 | Deployment readiness cannot be fully confirmed from documentation alone. | Needs verification | Run lint, build, and route checks in B2. |
| Hardcoded BrightAds Agency demo assumptions | Demo depends on expected workspace and seeded records. | Accepted MVP assumption | Confirm demo workspace and records before deployment walkthrough. |
| Unsupported features may be overclaimed | Demo or sales discussion could imply capabilities that do not exist. | Documented limitation | Use MVP status, known limitations, and demo script during presentation. |
| No custom `vercel.json` present | Platform defaults may be enough, but deployment settings are not explicitly documented in config. | Needs verification | Confirm hosting platform settings during deployment setup. |

## B1 Conclusion

Based on this documentation-level audit, FlowDesk AI appears ready to proceed to
B2 deployment verification.

B1 does not confirm production readiness. The next phase should verify build,
route behavior, hosting environment variables, database connectivity, demo data,
and deployment platform settings without exposing secrets or expanding MVP
scope.
