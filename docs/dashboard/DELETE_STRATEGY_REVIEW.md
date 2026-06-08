# FlowDesk AI Delete Strategy Review

## 1. FlowDesk AI Delete Strategy Review

This document compares safe Delete Task strategy options for the FlowDesk AI
Internal Task Dashboard.

It is a planning document for Workstream C. It does not enable Delete Task,
change app behavior, modify Prisma schema, run migrations, or create any
database behavior.

The goal is to decide which delete direction fits the current MVP constraints
before later implementation phases.

## 2. Current MVP Context

The current FlowDesk AI MVP is Prisma-backed for the main dashboard and task
workflows:

- `/tasks` shows a Prisma-backed task list with search and filter behavior.
- `/tasks/new` creates tasks through `createTaskAction()`.
- `/tasks/[id]` displays Prisma-backed task detail.
- `/tasks/[id]/edit` updates tasks through `updateTaskAction()`.
- `/board` is a Prisma-backed read-only board.
- `/team` is a Prisma-backed read-only team workload view.
- `/ai-summary` is a Prisma-backed read-only AI summary history page.
- `/settings` is a Prisma-backed read-only workspace settings page.

The current MVP does not enable:

- Auth
- Permission / Role Guard
- RLS
- Supabase Client
- API routes
- Billing
- Realtime
- Live AI generation
- OpenAI SDK

Delete Task is not enabled yet. Create Task and Edit Task are the only current
task mutation flows.

Schema facts confirmed from `prisma/schema.prisma`:

- `Task` has no `archivedAt`, `deletedAt`, `isArchived`, or equivalent
  soft-delete field.
- `TaskStatus` currently includes `TODO`, `IN_PROGRESS`, `REVIEW`, `DONE`, and
  `BLOCKED`.
- No current `TaskStatus` value safely represents archived or deleted work.

## 3. Delete Options Compared

| Option | Description | Benefits | Risks | Implementation impact | Demo suitability | Prisma schema changes required | Database migration required | Suitable before Auth/Permission exists |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hard Delete | Permanently remove the task record from the database. | Simple MVP implementation; no new schema field; clear user outcome. | Irreversible; no restore flow; no audit log; risky without Auth or Permission / Role Guard. | Add a delete server action in a later phase, wire UI confirmation, revalidate affected pages, redirect after delete. | Acceptable for a demo MVP only if clearly documented as not production-safe. | No, based on current schema. | No schema migration expected. | Cautiously yes for demo-only use, but not production-safe. |
| Archive / Soft Delete | Mark a task as archived/deleted while keeping the record. | Safer for SaaS behavior; supports restore, audit, and history later. | More complex; requires filtering archived tasks; may need restore UI and clear states. | Add archive/deleted fields, update list/detail/board/dashboard queries, design archive UX. | Stronger long-term direction, but heavier than current MVP needs. | Yes, because no archive/deleted field exists. | Yes, if adding fields. | Better after Auth/Permission planning, not ideal for C1/C2 without schema work. |
| Status-based Archive | Reuse an existing task status to represent archived/deleted tasks. | Could avoid migration if a safe status already existed. | Misuses workflow status; can confuse board/list/dashboard metrics; no current archive status exists. | Would require semantic changes across filters, labels, board columns, metrics, and demo copy. | Not recommended for current MVP. | No only if an existing status safely supported archive, but it does not. | No only if no schema change were needed, but current statuses do not fit. | Not suitable with the current status model. |

## 4. Hard Delete Analysis

Hard Delete permanently removes the task record from the database.

This is the simplest implementation path for the current MVP because the
existing `Task` model can be deleted without adding a new archive field or
changing the Prisma schema.

Hard Delete may be acceptable for a demo MVP if the flow is clearly documented,
requires a confirmation step, and is not presented as production-safe.

Risks:

- There is no Auth.
- There is no Permission / Role Guard.
- There is no restore flow.
- There is no recycle bin.
- There is no audit log.
- There is no production-grade access control.
- Deleted tasks would disappear from dashboard metrics, task lists, board
  columns, team workload counts, and task detail access.

The current schema does not show direct child records that depend on `Task`, but
hard deletion still removes task history and may affect demo data, metrics, and
workload visibility.

Hard Delete should not be described as production-safe.

## 5. Archive / Soft Delete Analysis

Archive / Soft Delete keeps the task record and marks it as archived or deleted
instead of permanently removing it.

This is safer for real SaaS behavior because it avoids immediate permanent
removal and can support restore, audit, compliance, and reporting needs later.

A typical soft-delete model uses fields such as:

- `archivedAt`
- `deletedAt`
- `isArchived`
- `archivedById`
- `deletedById`

The current `Task` model does not include these fields. Adding them would
require Prisma schema changes and a database migration.

Archive / Soft Delete would also require app behavior changes:

- Task list queries would need to exclude archived tasks by default.
- Dashboard metrics would need archived-task rules.
- Board columns would need archived-task filtering.
- Task detail would need safe handling for archived tasks.
- Team workload counts would need archived-task filtering.
- A restore or archive-management UX may be needed later.

Archive / Soft Delete is a better long-term production direction, but it is more
complex than Hard Delete and should be planned as its own schema-aware phase if
selected.

## 6. Status-based Archive Analysis

Status-based Archive means using a task status value to represent archived or
deleted work.

This is only possible if the existing `Task` model already has a status value
that can safely represent archived or deleted tasks.

The current status enum is:

- `TODO`
- `IN_PROGRESS`
- `REVIEW`
- `DONE`
- `BLOCKED`

None of these safely means archived or deleted. They represent workflow state,
not record lifecycle state.

Using `DONE` or `BLOCKED` as an archive substitute would be misleading because
those statuses still describe real workflow outcomes. It would also distort
board columns, task filters, dashboard metrics, and demo language.

Status-based Archive is not recommended for the current schema. If an archive
status is desired later, it should be planned explicitly with schema, migration,
query, and UX changes.

## 7. Recommended Direction For Current MVP

For the current MVP constraints, the recommended direction is a limited Hard
Delete flow in a later Workstream C phase if Delete Task is required soon.

Reasoning:

- The current schema does not support archive or soft delete.
- The current status enum does not support status-based archive.
- C1 must not modify Prisma schema or run migrations.
- Hard Delete is the smallest implementation path for a demo MVP.

This recommendation is cautious. A Hard Delete flow should be documented as
MVP/demo-only and should not be described as production-safe.

The later implementation should include at minimum:

- A confirmation step.
- Clear destructive-action wording.
- BrightAds Agency scoping consistent with existing MVP flows.
- Revalidation for affected pages.
- Redirect behavior after deletion.
- Documentation that no Auth, Permission / Role Guard, restore flow, recycle
  bin, or audit log exists yet.

For a production-ready product direction, Archive / Soft Delete is preferable,
but it should wait for an explicit schema/migration phase and Auth/Permission
planning.

No delete behavior is enabled by C1.

## 8. Proposed Workstream C Phases

| Phase | Name | Goal |
| --- | --- | --- |
| C1 | Delete Strategy Review | Compare delete options and choose the safest MVP direction. |
| C2 | Delete UX / Safety Plan | Plan confirmation UX, warnings, redirects, scope, and demo-safe wording. |
| C3 | Server Action Implementation | Add the server-side delete action if approved. |
| C4 | UI Integration | Add Delete Task UI in the selected location with confirmation flow. |
| C5 | Verification / Documentation Update | Test delete behavior and update docs to reflect the implemented scope. |

## 9. Explicit Non-Goals

C1 does not include:

- Auth
- Permission / Role Guard
- RLS
- Supabase Client
- API routes
- Billing
- Realtime
- Live AI / OpenAI SDK
- Prisma schema changes
- Migrations
- `prisma db push`
- Seed commands
- Database commands
- `.env` access
- Delete Task implementation
- App behavior changes

## 10. Demo-safe Claim

Future demo wording, if a limited hard delete flow is implemented:

"Delete Task is available as an MVP demo flow for removing demo tasks. It does
not yet include production-grade access control, role permissions, restore,
recycle bin, audit log, or multi-user safeguards."

Until a later phase implements the flow, Delete Task should continue to be
described as not enabled.
