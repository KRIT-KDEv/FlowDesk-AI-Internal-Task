# FlowDesk AI Deployment Guide

## Purpose

This guide documents safe demo and portfolio deployment steps for the current
FlowDesk AI Internal Task Dashboard MVP.

It is not a production hardening guide. The current MVP uses Demo Auth /
Portfolio Auth for controlled walkthroughs, and this guide should not be used
to claim production readiness or production-grade security.

## Deployment Scope

The demo deployment scope includes these MVP routes:

| Route | Current scope | Interaction level |
| --- | --- | --- |
| `/dashboard` | Prisma-backed dashboard overview | Read-only |
| `/tasks` | Prisma-backed task list with search/filter | Read-only |
| `/tasks/new` | Create Task flow through `createTaskAction()` | Interactive |
| `/tasks/[id]` | Prisma-backed task detail with limited admin demo delete | Detail + limited delete |
| `/tasks/[id]/edit` | Edit Task flow through `updateTaskAction()` | Interactive |
| `/board` | Prisma-backed workflow board | Read-only |
| `/ai-summary` | Prisma-backed AI summary history | Read-only |
| `/team` | Prisma-backed team workload overview | Read-only |
| `/settings` | Prisma-backed workspace settings/status page | Read-only |

Deployment scope notes:

- `/tasks/new`, `/tasks/[id]/edit`, and limited admin Delete Task from
  `/tasks/[id]` are the current interactive task flows.
- `/board`, `/ai-summary`, `/team`, and `/settings` are read-only in the
  current MVP.
- The app uses Demo Auth / Portfolio Auth for controlled portfolio
  walkthroughs.
- Do not describe this deployment as production-secure, protected, or complete
  SaaS.

## Recommended Hosting Approach

Use a provider-neutral, Vercel-friendly deployment flow:

- Connect the GitHub repository to the hosting provider.
- Use default Next.js or framework detection if the provider supports it.
- Configure environment variables in the hosting provider dashboard only.
- Use a separate demo database from local development where possible.
- Redeploy after changing environment variables.
- Keep deployment logs, docs, screenshots, commits, and demo scripts free of
  secrets.
- Do not add custom deployment config in B4.
- Do not paste secrets into source code or commit env files.

## Required Environment Variables

Reference: `docs/dashboard/ENVIRONMENT_SETUP.md`.

The confirmed required variables are:

| Variable | Required for | Placeholder only |
| --- | --- | --- |
| `DATABASE_URL` | Prisma runtime database access | `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public` |
| `DIRECT_URL` | Prisma direct database connection configuration | `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public` |

Environment rules:

- Use placeholders only in docs.
- Do not include real values in source control.
- Do not suggest committing env files.
- Configure real values only in the hosting provider dashboard.
- Do not add unsupported feature variables unless the feature has been scoped,
  implemented, and verified.

## Build Settings

Reference: `docs/dashboard/BUILD_AND_ROUTE_VERIFICATION.md`.

Expected scripts from `package.json`:

| Script | Purpose | Current status |
| --- | --- | --- |
| `npm run build` | Production build | Available |
| `npm run lint` | Lint check | Available |
| `npm run dev` | Local development server | Available |
| `npm run start` | Start production server after build | Available |
| `npm run typecheck` | Standalone typecheck | Not currently available |

B4 does not run lint or build. Build verification was completed in B3, and any
future deployment verification should keep environment values secret.

## Prisma And Database Deployment Notes

The MVP uses Prisma-backed routes and server-side Prisma data access.

Deployment requirements:

- The hosted app needs a reachable database.
- The database must have the expected schema before demo use.
- Demo data should be prepared before the walkthrough.
- The BrightAds Agency workspace assumptions should be verified in the demo
  database.
- If migrations, `prisma db push`, seed commands, or database commands are
  needed later, they should be planned as a separate explicit phase.

B4 does not run migrations, `prisma db push`, seed commands, or database
commands.

## Demo Data Readiness

Reference: `docs/dashboard/DEMO_DATA_PLAN.md`.

Demo data guidance:

- Use safe sample data only.
- Avoid real client, customer, user, payment, or private business data.
- Confirm enough tasks exist for dashboard metrics, task list, board columns,
  AI summary history, and team workload pages.
- Include mixed statuses and priorities so the demo feels realistic.
- Treat BrightAds Agency as sample/demo context only.
- Confirm the demo data supports create and edit task walkthroughs without
  exposing private information.

## Post-Deploy Smoke Test Checklist

B4 does not perform deployment or production smoke tests. Use this checklist
manually after a deployment is available.

- [ ] Visit `/dashboard` and confirm the page loads with Prisma-backed overview
      data.
- [ ] Visit `/tasks` and confirm the task list loads with search/filter UI.
- [ ] Visit `/tasks/new` and confirm the Create Task page loads.
- [ ] Create a safe demo task from `/tasks/new` if the demo database is ready.
- [ ] Visit `/tasks/[id]` for a real task and confirm task detail loads.
- [ ] If signed in as admin, confirm the limited Delete Task UI appears only
      from task detail and is presented as demo-only hard delete.
- [ ] Visit `/tasks/[id]/edit` for a real task and confirm the Edit Task page
      loads.
- [ ] Edit a safe demo task only if the demo database is ready.
- [ ] Visit `/board` and confirm tasks appear in read-only status columns.
- [ ] Visit `/ai-summary` and confirm saved summary history appears if demo
      records exist.
- [ ] Visit `/team` and confirm workload data appears if demo members and tasks
      exist.
- [ ] Visit `/settings` and confirm workspace settings/status data appears.
- [ ] Confirm read-only pages do not imply unavailable write features.
- [ ] Confirm no demo copy claims production Auth, production-safe Delete Task,
      Live AI, Billing, RLS, Realtime, Invites, or API routes are enabled.

## Unsupported Feature Warning

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

These features should not be claimed during demos, portfolio walkthroughs,
deployment notes, or product/package discussions.

Demo Auth / Portfolio Auth, app-level demo role guard, demo mutation guard, and
limited MVP demo-only Delete Task are enabled only for controlled walkthroughs.

## Rollback Notes

Practical rollback guidance:

- Revert to a previous successful commit if deployment breaks after a code
  change.
- Do not patch production by committing env files or hardcoded secrets.
- Keep deployment changes reviewable through commits.
- If database or environment issues occur, resolve them through hosting provider
  environment settings or a planned database phase.
- If demo data is incorrect, fix it through a planned demo data or database
  readiness phase.
- Avoid emergency changes that expand MVP scope or add unsupported features.

## B4 Conclusion

FlowDesk AI now has a documented deployment guide for safe demo and portfolio
hosting.

This does not mean the app is production-secure or production-ready. The current
MVP remains a demo-authenticated portfolio app with clear read-only boundaries
and not-enabled production feature limits.

The project is ready to proceed to B5 Final Deployment Readiness Checklist.
