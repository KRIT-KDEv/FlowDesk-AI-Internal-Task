# FlowDesk AI Demo Script

## 1. Demo Purpose

Use this script to present FlowDesk AI in a GitHub/portfolio walkthrough,
freelance client discussion, recorded demo video, or interview project
explanation.

The demo should show that FlowDesk AI is an AI-ready internal task dashboard
MVP for workflow visibility, task ownership, team workload, and saved summary
history. It should also stay honest: live AI generation and production-grade
security are not enabled in the current MVP.

## 2. Short Opening Pitch

"FlowDesk AI is an internal task and workflow dashboard MVP for small teams. It
helps a team see active work, overdue tasks, ownership, workload pressure, and
saved AI summary history from one Prisma-backed dashboard. The app includes
demo roles for portfolio walkthroughs, but it is not production-secure SaaS
yet."

## 3. Pre-demo Setup Notes

Before recording or presenting:

- Use safe demo data only.
- Start on `/login`.
- Choose the role that matches the story: admin for full walkthrough, manager
  for day-to-day task operations, viewer for read-only stakeholder review.
- Prepare one existing task to open on `/tasks/[id]`.
- If demonstrating Delete Task, use a disposable demo task only.
- Do not show real `.env` values, database URLs, secrets, or private client
  data.

## 4. Login / Role Selection

Route: `/login`

What to show:

- Demo role choices: `admin`, `manager`, `viewer`.
- Explain that this is Demo Auth / Portfolio Auth.

What to say:

"This login is built for controlled portfolio walkthroughs. It lets me show
different user experiences without claiming production authentication. Admin
can create, edit, and delete demo tasks. Manager can create and edit. Viewer is
read-only."

Avoid saying:

- Production auth is enabled.
- This is secure multi-user access control.
- This is tenant-safe authorization.

## 5. Admin Walkthrough

Use admin when you want to show the full MVP.

Recommended path:

1. Log in as `admin`.
2. Open `/dashboard`.
3. Open `/tasks` and use search/filter.
4. Create a task from `/tasks/new`.
5. Open task detail at `/tasks/[id]`.
6. Edit the task from `/tasks/[id]/edit`.
7. Optionally delete a disposable demo task from `/tasks/[id]`.
8. Show `/board`, `/ai-summary`, `/team`, and `/settings`.

Admin talking point:

"Admin represents the full demo role: create, edit, delete, and view all MVP
pages. Delete is still a limited demo hard delete, not production-safe delete."

## 6. Manager Walkthrough

Use manager to show a realistic team lead flow.

Recommended path:

1. Log in as `manager`.
2. Review `/dashboard`.
3. Use `/tasks` search/filter.
4. Create a task from `/tasks/new`.
5. Edit task status or assignee from `/tasks/[id]/edit`.
6. Show `/board`, `/ai-summary`, and `/team`.
7. Point out that settings and delete are not available to manager.

Manager talking point:

"Manager can run daily workflow actions like creating and editing tasks, but
cannot delete demo tasks or access settings."

## 7. Viewer Walkthrough

Use viewer when presenting a read-only stakeholder or reviewer flow.

Recommended path:

1. Log in as `viewer`.
2. Review `/dashboard`.
3. Open `/tasks`.
4. Open a task detail page from the list.
5. Show `/board` and `/ai-summary`.
6. Point out that create, edit, delete, team, and settings are not available.

Viewer talking point:

"Viewer is intentionally read-only. This is useful for a stakeholder who needs
visibility without changing task data."

## 8. Route-by-route Walkthrough

| Route | What to show | What to say |
| --- | --- | --- |
| `/dashboard` | Metrics, recent tasks, overdue tasks, latest saved AI summary preview | "This is the operational snapshot for task visibility." |
| `/tasks` | Search, status filter, priority filter, task list | "Tasks are Prisma-backed and searchable instead of scattered across chat." |
| `/tasks/new` | Create form | "Admin and manager can create tasks through a server action." |
| `/tasks/[id]` | Task fields and admin delete action | "Each task has a detail page. Admin can delete a disposable demo task here." |
| `/tasks/[id]/edit` | Edit form | "Admin and manager can update editable task fields." |
| `/board` | Status columns | "The board is a read-only workflow view grouped by task status." |
| `/ai-summary` | Saved summary history | "This is saved AI summary history, not live AI generation." |
| `/team` | Workload counts | "Team workload is visible, but member management is not included." |
| `/settings` | Workspace counts/status | "Settings is read-only and helps explain MVP boundaries." |

## 9. What To Say On `/dashboard`

"The dashboard gives a fast operational view: total tasks, in-progress work,
due today, overdue tasks, completed work, recent tasks, and saved summary
context. This is Prisma-backed data, not mock dashboard metrics."

Avoid claiming realtime updates.

## 10. What To Say On `/tasks`

"The task list lets a team search and filter work by title, status, and
priority. This is where a team lead can quickly find what needs attention."

Mention:

- List search/filter is available.
- Bulk actions are not enabled.
- Delete is not available from the list.

## 11. What To Say On `/tasks/new`

"Create Task is an interactive MVP flow. Admin and manager demo roles can add a
tracked work item with title, description, status, priority, due date, and
assignee."

Avoid claiming production permissions. This is a demo mutation guard, not
production authorization.

## 12. What To Say On `/tasks/[id]`

"The task detail page gives each task a single source of truth: title,
description, status, priority, due date, assignee, creator, workspace, and
timestamps."

If logged in as admin:

"Admin also sees Delete task here. It is a limited MVP demo-only hard delete
from task detail."

## 13. What To Say On `/tasks/[id]/edit`

"Edit Task is the second main task operation. Admin and manager can update
editable fields like title, description, status, priority, due date, and
assignee."

Mention:

- Viewer cannot access edit.
- This is not an approval workflow.
- No audit log is implemented.

## 14. What To Say On `/board`

"The board groups work by Todo, In Progress, Review, Done, and Blocked. It is a
read-only workflow view, so status changes happen through Edit Task rather than
drag-and-drop."

Avoid claiming board mutation or drag-and-drop.

## 15. What To Say On `/ai-summary`

"This page shows saved AI summary history records. It is designed for future AI
summary integration, but live AI generation is not connected in the current
MVP."

Safe phrasing:

- AI-ready task dashboard
- Read-only AI summary history
- Designed for AI summary integration
- Live AI generation can be scoped as an optional client add-on

## 16. What To Say On `/team`

"The team page shows workload visibility by member: assigned work, in-progress
tasks, overdue tasks, and completed tasks. It helps a lead understand workload
pressure without a separate report."

Mention:

- It is read-only.
- Invites and member management are not enabled.
- Production role management is not enabled.

## 17. What To Say On `/settings`

"Settings is a read-only workspace status page. It shows workspace information,
counts, and MVP status, so the project is transparent about what is implemented
and what is future scope."

Avoid claiming editable settings, billing, or production permissions.

## 18. AI Boundary Talking Points

Say:

- "FlowDesk AI is AI-ready, not live-AI-enabled yet."
- "The current app includes read-only saved AI summary history."
- "Live AI generation can be scoped later as a paid client add-on."

Do not say:

- Live AI generation is enabled.
- OpenAI or Gemini is connected.
- The app is an autonomous AI agent.
- The app performs real-time AI analysis.
- The app includes production AI automation.

## 19. Delete Task Talking Points

Say:

- "Delete Task is available only as a limited MVP demo-only hard delete from
  `/tasks/[id]`."
- "Only admin sees and can execute Delete Task in the demo role model."
- "Use only disposable demo data when showing delete."

Clarify:

- No archive / soft delete.
- No restore or recycle bin.
- No audit log.
- No production multi-user safeguards.
- Not production-safe delete behavior.

## 20. Demo Auth / Role Guard Talking Points

Say:

- "Demo Auth / Portfolio Auth supports controlled walkthroughs."
- "Admin can create, edit, and delete demo tasks."
- "Manager can create and edit tasks only."
- "Viewer is read-only."
- "Route navigation and task actions are role-aware."
- "Server-side demo mutation guards back up the role behavior."

Do not say:

- Production authentication is implemented.
- Production RBAC is implemented.
- Tenant-safe access control exists.
- This is secure for real client data.

## 21. Client Add-on Transition

Use this transition when discussing paid scope:

"The current MVP proves the internal workflow dashboard foundation. For a real
client, the next paid add-ons would depend on their workflow: production auth,
workspace isolation, archive/restore safeguards, live AI summary generation,
notifications, integrations, or billing."

Best add-on positioning:

- Production Auth and database-backed users
- Production-grade role/permission model
- Archive / Soft Delete and restore
- Live AI summary generation
- Invites or team management
- Realtime notifications
- Billing only after product validation

## 22. Do / Don't Claim Checklist

Do:

- Say Prisma-backed data.
- Say Demo Auth / Portfolio Auth.
- Say demo role guard and demo mutation guard.
- Say read-only board, AI summary history, team, and settings.
- Say AI-ready task dashboard.
- Say live AI is optional future/client add-on scope.
- Say this is demo-ready and portfolio-ready.

Don't:

- Do not claim production auth or production RBAC.
- Do not claim tenant-safe access control.
- Do not claim live AI generation.
- Do not claim OpenAI/Gemini is connected.
- Do not claim autonomous AI agent behavior.
- Do not claim real-time AI analysis.
- Do not claim production AI automation.
- Do not claim Delete Task is recoverable, audited, or production-safe.
- Do not claim billing, realtime, invites, API routes, RLS, or Supabase Client.
- Do not claim production-ready SaaS.

## 23. Closing Pitch

### Portfolio / Interview

"FlowDesk AI demonstrates full-stack product thinking: Prisma-backed dashboard
data, task workflows, demo auth roles, route and mutation guards, read-only
workflow views, and clear MVP boundaries."

### Freelance Client

"This is the kind of internal dashboard that can replace scattered manual
updates with a clear workflow view. The MVP proves the foundation, and
production auth, live AI, integrations, and safer delete behavior can be scoped
as separate paid add-ons."

### Short Final Line

"FlowDesk AI is a demo-ready, AI-ready internal task dashboard MVP: practical
for portfolio presentation today, and structured for careful client expansion
later."
