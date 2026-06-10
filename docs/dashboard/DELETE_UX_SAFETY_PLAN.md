# FlowDesk AI Delete UX / Safety Plan

## 1. FlowDesk AI Delete UX / Safety Plan

This document defines the UX and safety plan for a later Delete Task
implementation in FlowDesk AI.

This is Phase C2 of Workstream C. It is documentation-only and does not enable
delete behavior, create a delete server action, add a Delete button, change app
behavior, or modify the Prisma schema.

## 2. C1 Strategy Summary

Phase C1 concluded that the current schema does not support archive or soft
delete without schema and migration changes.

Current C1 findings:

- `Task` has no `archivedAt`, `deletedAt`, `isArchived`, or equivalent
  soft-delete field.
- `TaskStatus` supports `TODO`, `IN_PROGRESS`, `REVIEW`, `DONE`, and
  `BLOCKED`.
- No existing status safely represents archived or deleted state.
- Status-based archive is not recommended because current statuses represent
  workflow state, not record lifecycle state.

The recommended MVP implementation path is a limited hard delete flow in a
later phase if Delete Task is required soon.

For production-ready behavior, the preferred direction is archive or soft delete
after explicit schema/migration planning and Auth/Permission planning.

## 3. Recommended MVP Delete UX

The recommended MVP Delete Task flow should be intentionally small and
demo-safe:

- Place the Delete action only on `/tasks/[id]` in the first implementation.
- Do not place Delete on the `/tasks` list yet.
- Do not implement bulk delete.
- Do not add delete to `/board` yet.
- Do not add delete to `/tasks/[id]/edit` unless explicitly approved later.
- Use a confirmation step before delete.
- If the user confirms and delete succeeds, redirect to `/tasks`.
- Keep the feature visibly limited and documented as an MVP demo-only hard
  delete flow.

This keeps the first implementation narrow and easier to verify.

## 4. Delete Entry Point

`/tasks/[id]` is the safest first entry point for Delete Task.

Reasons:

- The user sees full task context before deleting.
- The risk of accidental deletion is lower than task list row actions.
- The implementation scope is smaller than adding delete to lists, boards, or
  bulk actions.
- Verification is easier because the flow starts from a single task detail
  page.
- It avoids multi-row delete complexity.
- It avoids board mutation complexity.
- It avoids adding destructive actions to the edit form before the delete flow
  is proven.

The first implementation should not add delete controls to `/tasks`, `/board`,
or `/tasks/[id]/edit`.

## 5. Confirmation Behavior

The recommended MVP confirmation behavior is a simple browser confirmation
dialog or similarly minimal confirmation mechanism.

Confirmation requirements:

- The confirmation copy should clearly say the action is permanent.
- The confirmation copy should clearly say the action cannot be undone.
- If the user cancels, no delete should happen.
- If the user confirms, the later server action may run.
- The UI should avoid implying a restore flow exists.

Future production versions may use:

- Custom modal confirmation.
- Type-to-confirm behavior.
- Archive instead of hard delete.
- Restore flow.
- Recycle bin.
- Audit log.

Those production-oriented features are not part of C2.

## 6. Server Action Boundary For Later Phase

C3 should implement the server-side behavior later. The recommended MVP
direction is to use a server action, not an API route, because existing Create
Task and Edit Task flows already use server actions.

Expected later server action behavior:

- Validate the task id.
- Check that the task exists.
- Ensure the task belongs to the BrightAds Agency MVP workspace.
- Delete the task only after the confirmation flow triggers the action.
- Revalidate affected pages.
- Redirect to `/tasks` after success.
- Handle not found safely.
- Handle invalid id safely.
- Avoid leaking internal database errors to the UI.

C2 does not create `deleteTaskAction()` or any server-side delete behavior.

## 7. Revalidation Plan

After a successful delete in a later phase, these pages may need revalidation:

- `/tasks`
- `/dashboard`
- `/board`
- `/team`
- `/ai-summary` if task-derived summaries are shown there

`/tasks` is required because it is the destination after delete and should no
longer show the deleted task.

Other routes should be considered if they show task-derived data:

- `/dashboard` may show task metrics, recent tasks, or overdue tasks.
- `/board` groups tasks by status.
- `/team` shows workload counts.
- `/ai-summary` is read-only summary history, but may need revalidation if any
  task-derived summary preview or related data is shown in a future version.

## 8. Error And Edge Case Plan

Recommended later UX behavior:

| Case | Recommended behavior |
| --- | --- |
| User cancels confirmation | Do nothing. Stay on `/tasks/[id]`. Do not call the delete action. |
| Task exists and delete succeeds | Delete the task, revalidate affected pages, and redirect to `/tasks`. |
| Task not found | Show or redirect to a safe not-found state. Do not throw raw database details. |
| Invalid task id | Handle safely as not found or redirect to `/tasks` with safe messaging. |
| Prisma relation or foreign key conflict | Show safe error wording and do not expose internal database details. Document as a blocker if hard delete is prevented by relations. |
| Delete action throws unexpected error | Show safe generic error wording. Do not expose stack traces or database details. |
| User refreshes deleted task detail URL | Show the existing task not-found state or a safe equivalent. |

The later implementation should avoid claiming that deleted tasks can be
restored.

## 9. Demo-safe Copy

Suggested UI copy for a later MVP implementation:

- Delete button label: `Delete task`
- Confirmation message: `Delete this task? This permanently removes the task and cannot be undone.`
- Success behavior wording: `Task deleted. Returning to the task list.`
- Error wording: `We could not delete this task. Please try again from the task detail page.`
- Not-found wording: `Task not found. It may have already been deleted.`

Suggested documentation/demo wording:

"Delete Task is available as an MVP demo-only hard delete flow. It permanently
removes a demo task and does not yet include production-grade access control,
role permissions, restore, recycle bin, audit log, or multi-user safeguards."

Until a later phase implements Delete Task, demo materials should continue to
say Delete Task is not enabled.

## 10. Explicit Non-Goals For C2

C2 does not include:

- Delete implementation
- `deleteTaskAction`
- DeleteButton component
- Route changes
- Component changes
- Page changes
- Layout changes
- Server action changes
- Prisma schema changes
- Migrations
- `prisma db push`
- Seed commands
- Database commands
- Auth
- Permission / Role Guard
- RLS
- Supabase Client
- API routes
- Billing
- Realtime
- Live AI / OpenAI SDK
- `.env` access
- README changes
- Existing documentation changes
- Source-file TODO comments

## 11. Acceptance Criteria

C2 is complete when:

- Exactly one new file is created:
  `docs/dashboard/DELETE_UX_SAFETY_PLAN.md`.
- No existing source files are modified.
- No existing docs are modified.
- No Prisma schema changes are made.
- No migrations are created or run.
- No database commands are run.
- No `.env` file is read or changed.
- The document clearly defines the recommended MVP Delete UX.
- The document clearly says Delete should first be available only from
  `/tasks/[id]`.
- The document clearly defines confirmation behavior.
- The document clearly defines redirect and revalidation expectations.
- The document clearly lists edge cases.
- The document does not claim production readiness.
