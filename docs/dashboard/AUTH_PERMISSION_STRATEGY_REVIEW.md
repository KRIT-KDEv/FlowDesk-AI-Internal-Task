# FlowDesk AI Auth + Permission Strategy Review

## Purpose

This document defines the planned Auth and Permission / Role Guard direction for
FlowDesk AI.

It is a planning document for Workstream D, not an implementation. D1 does not
add login, logout, middleware, route guards, mutation guards, schema changes,
RLS, Supabase Client, API routes, or production security.

The goal is to support Demo Auth / Portfolio Auth first while keeping a clear
path toward production hardening later.

## Current MVP Boundary

The current FlowDesk AI MVP includes:

- Prisma-backed `/dashboard`
- Prisma-backed `/tasks` with search/filter
- `/tasks/new` with Create Task through `createTaskAction()`
- Prisma-backed `/tasks/[id]` task detail
- `/tasks/[id]/edit` with Edit Task through `updateTaskAction()`
- Limited MVP demo-only hard delete from `/tasks/[id]`
- Prisma-backed read-only `/board`
- Prisma-backed read-only `/ai-summary`
- Prisma-backed read-only `/team`
- Prisma-backed read-only `/settings`

Current mutation flows:

- Create Task
- Edit Task
- Delete Task as a limited MVP demo-only hard delete from `/tasks/[id]`

Demo Auth / Portfolio Auth is now implemented after Workstream D D2-D4.
Production Auth and production-grade permission hardening are still not enabled.

Still not enabled for production:

- RLS
- Supabase Client
- Invites
- Billing
- Realtime
- API routes
- Live AI generation
- OpenAI SDK
- Audit Log
- Restore / Recycle Bin
- Archive / Soft Delete
- Multi-user safeguards

The MVP should not be described as protected, production-secure,
multi-tenant-secure, or production-ready.

## Workstream D Implementation Status

Workstream D D2-D4 implemented Demo Auth / Portfolio Auth for controlled
portfolio walkthroughs.

Implemented demo auth and app-level demo authorization:

- `/login` demo role selection
- Login/logout server actions
- Cookie-based demo roles: `admin`, `manager`, and `viewer`
- Logged-out route protection for protected MVP pages
- Logged-in redirect from `/login` to `/dashboard`
- Demo role-based route guard
- Role-aware sidebar/navigation
- Role-aware task action visibility
- Server-side demo mutation guards for task create, edit, and delete actions

Current demo mutation permissions:

- `admin` can create, edit, and delete demo tasks.
- `manager` can create and edit tasks, but cannot delete tasks.
- `viewer` is read-only and cannot create, edit, or delete tasks.

This is app-level demo authorization only. It is not production-grade Auth,
database-backed identity, workspace isolation, tenant isolation, RLS, audit log,
or multi-user production security.

## Demo Auth / Portfolio Auth vs Production Direction Auth

| Area | Demo Auth / Portfolio Auth | Production Direction Auth |
| --- | --- | --- |
| Purpose | Support controlled portfolio walkthroughs and demo storytelling. | Protect real users, organizations, tasks, settings, and production data. |
| User source | Demo-only users or a simple controlled session concept. | Database-backed or provider-backed users with persistent identity. |
| Session complexity | Minimal and easy to understand. | Secure session lifecycle, provider configuration, refresh behavior, and logout handling. |
| Role guard | Lightweight demo-level role checks. | Server-enforced role and permission model. |
| Workspace isolation | Not production-grade; demo scope only. | Workspace or organization isolation enforced by data access rules. |
| Mutation protection | Planned guard behavior for demo mutations. | Server-side authorization checks for every mutation path. |
| Delete safety | Delete remains MVP/demo-only and especially restricted. | Delete should be paired with audit log, archive/soft delete, restore, or other safeguards. |
| Audit log | Not included. | Required for production-sensitive mutations. |
| RLS | Not included. | Possible future hardening if Supabase Client or direct client access is introduced later. |
| Security claims | Must not be described as production-safe. | May be described as production-ready only after implementation, review, and verification. |

Demo Auth / Portfolio Auth is for controlled walkthroughs only. It should help
explain the product experience without pretending the app has production-grade
access control.

Production Direction Auth requires a future hardening path with persistent
identity, workspace or organization isolation, membership/role persistence,
server-side authorization checks, audit log, archive/restore safeguards, secure
auth provider setup, invite flow, and possibly RLS later.

## Recommended D1 Decision

The recommended next implementation path is Demo Auth / Portfolio Auth.

Reasons:

- It supports portfolio and demo storytelling without turning the MVP into a
  full production security project.
- It keeps scope small enough for the current product stage.
- It gives future viewers a clearer sense of roles and access intent.
- It avoids prematurely adding RLS, invites, billing, audit log, or production
  identity infrastructure.

Production-grade role guard, workspace isolation, audit log, restore/recycle
bin, archive/soft delete, and RLS should be reserved for later workstreams.

Demo Auth must not be described as production-safe.

## Proposed Demo Role Model

The future demo role model should be simple:

| Demo role | Intended access |
| --- | --- |
| `admin` | Can access dashboard, tasks, create task, edit task, delete demo task, board, AI summary, team, and settings. |
| `manager` | Can access dashboard, tasks, create task, edit task, board, AI summary, and team. No settings. Delete should be optional but preferably restricted. |
| `viewer` | Read-only access to dashboard, tasks, task detail, board, and AI summary. No create, edit, delete, or settings. |

These roles are demo-level only until backed by future production data models
and server-side permission enforcement.

D1 does not assume that `User`, `Workspace`, `WorkspaceMember`, `MemberRole`, or
similar schema objects exist. User, workspace, membership, organization, and role
models should be treated as possible future production-hardening concepts unless
confirmed and explicitly planned in a later implementation phase.

## Route-Level Planning

This matrix is planned future behavior only. D1 does not implement route guards.

| Route | Admin | Manager | Viewer | Notes |
| --- | --- | --- | --- | --- |
| `/dashboard` | Allow | Allow | Allow | Viewer can inspect dashboard visibility. |
| `/tasks` | Allow | Allow | Allow | Viewer gets read-only task list access. |
| `/tasks/new` | Allow | Allow | Block | Create Task should require a write-capable role. |
| `/tasks/[id]` | Allow | Allow | Allow | Viewer can inspect task detail but should not see mutation actions. |
| `/tasks/[id]/edit` | Allow | Allow | Block | Edit Task should require a write-capable role. |
| `/board` | Allow | Allow | Allow | Board remains read-only in the current MVP. |
| `/ai-summary` | Allow | Allow | Allow | AI summary history remains read-only. |
| `/team` | Allow | Allow | Block or limited | Team visibility may be manager/admin only in demo auth. |
| `/settings` | Allow | Block | Block | Settings should be admin-only in demo auth. |

Route guard planning should not rely only on hiding navigation links. Future
implementation should protect direct URL access too.

## Mutation-Level Planning

This matrix is planned future behavior only. D1 does not implement mutation
guards.

| Mutation | Admin | Manager | Viewer | Notes |
| --- | --- | --- | --- | --- |
| `createTaskAction()` | Allow | Allow | Block | UI hiding is not enough; the action must be guarded server-side later. |
| `updateTaskAction()` | Allow | Allow | Block | Server-side permission checks are required in a future phase. |
| `deleteTaskAction()` | Allow | Prefer restricted or block | Block | Delete remains MVP/demo-only and should be especially restricted. |

Hiding buttons in the UI is not enough. Future implementation must guard
mutation paths server-side so direct form submissions or route access cannot
bypass role intent.

Delete Task should remain clearly described as limited MVP/demo-only until
production safeguards exist.

## Production Hardening Path

Future production readiness may require:

- Database-backed or provider-backed user identity
- Workspace or organization model
- Membership model
- Role and permission persistence
- Workspace-scoped tasks and data access rules
- Server-side authorization checks for pages and mutations
- Audit log for sensitive mutations
- Archive / Soft Delete
- Restore / Recycle Bin
- Multi-user safeguards
- RLS if Supabase Client or direct client access is introduced later
- Invite flow
- Secure production auth provider
- Session security review
- Deployment and secret-management review

These requirements are not part of D1.

## Phased Workstream D Plan

| Phase | Name | Goal |
| --- | --- | --- |
| D1 | Auth + Permission Strategy Review | Define demo auth direction and production hardening path. |
| D2 | Demo Auth Foundation | Add controlled demo auth foundation without production-security claims. |
| D3 | Route Guard + Navigation Guard | Protect planned routes and hide unavailable navigation/actions by demo role. |
| D4 | Mutation Permission Guard | Add server-side guards to Create, Edit, and Delete task mutations. |
| D5 | Production Hardening Review / Documentation Update | Review remaining production gaps and update docs/status claims. |

## Non-Goals For D1

D1 does not include:

- Auth implementation
- Login/logout
- Middleware
- Route guards
- Mutation guards
- Prisma schema changes
- Migrations
- Seed changes
- `.env` access
- Supabase Client
- RLS
- Billing
- Realtime
- OpenAI SDK
- Live AI generation
- Invites
- API routes
- Production security claim

## Verification Checklist

- Exactly one file is created:
  `docs/dashboard/AUTH_PERMISSION_STRATEGY_REVIEW.md`.
- No source code files are modified.
- Prisma schema is not inspected or modified.
- No migration files are created.
- No package files or lock files are modified.
- `.env` is not read, printed, modified, or exposed.
- No database command is run.
- No Auth implementation is added.
- Demo Auth is clearly separated from production-grade Auth.
- The document does not claim production readiness or production security.
