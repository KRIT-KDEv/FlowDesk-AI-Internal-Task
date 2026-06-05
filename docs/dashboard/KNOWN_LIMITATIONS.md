# FlowDesk AI Known Limitations

## 1. Purpose

This document defines the current FlowDesk AI MVP boundaries, demo-safe claims,
known limitations, and future-scope items.

It helps prevent overclaiming during portfolio presentation, demo walkthroughs,
and product or pricing discussions. The current MVP is demo-ready for workflow
visibility, but it should not be described as a complete production SaaS
platform.

## 2. Current MVP Boundary

The current MVP supports:

- Prisma-backed dashboard overview
- Prisma-backed task list with search/filter
- Create task through `createTaskAction()`
- Task detail page from Prisma
- Edit task through `updateTaskAction()`
- Read-only board
- Read-only AI summary history
- Read-only team workload
- Read-only workspace settings

Create Task and Edit Task are the current interactive task actions. The board,
AI summary history, team workload, and workspace settings pages are read-only
in the current MVP.

## 3. Page Status Matrix

| Route | Current status | Interaction level | Safe demo claim | Limitation |
| --- | --- | --- | --- | --- |
| `/dashboard` | Prisma-backed dashboard overview | Read-only | Shows task/workflow visibility with metrics, recent work, overdue work, and latest saved AI summary preview. | No realtime updates and no live AI generation. |
| `/tasks` | Prisma-backed task list with search/filter | Read-only | Users can review tasks and filter by title, status, or priority. | No bulk actions and no Delete Task. |
| `/tasks/new` | Create Task page | Interactive create task | Users can create a task through `createTaskAction()`. | No Auth, Permission / Role Guard, or production access control. |
| `/tasks/[id]` | Prisma-backed task detail | Read-only | Users can view task ownership, status, priority, due date, creator, workspace, and timestamps. | No comments, activity log, or Delete Task. |
| `/tasks/[id]/edit` | Edit Task page | Interactive edit task | Users can update editable task fields through `updateTaskAction()`. | No role-based approval, audit trail, or permission guard. |
| `/board` | Prisma-backed workflow board | Read-only | Shows tasks grouped by Todo, In Progress, Review, Done, and Blocked. | No drag-and-drop and no board status mutation. |
| `/ai-summary` | Prisma-backed AI summary history | Read-only | Shows saved AI summary history records. | Not live generation; OpenAI SDK is not integrated. |
| `/team` | Prisma-backed team workload overview | Read-only | Shows members and workload counts for visibility. | No invites, role management, or member management. |
| `/settings` | Prisma-backed workspace settings | Read-only | Shows workspace information, counts, and MVP status. | No editable settings, billing, or permission controls. |

## 4. Task Management Limitations

- Delete Task is not enabled.
- Archive Task is not enabled.
- Bulk actions are not enabled.
- Advanced workflow transitions are not enabled.
- Task creation and task editing are the main interactive task actions in the
  current MVP.
- Status changes should be described as happening through Edit Task, not through
  board drag-and-drop.

## 5. Authentication And Access Control Limitations

- Authentication is not enabled.
- Permission / Role Guard is not implemented.
- Role-based access control is not implemented.
- Invite flow is not implemented.
- The current MVP should not be described as protected, multi-tenant, or
  production-secure.
- Any Auth, permission, invite, or role management work is future scope unless
  explicitly planned and implemented in a later workstream.

## 6. Data Security And RLS Limitations

- RLS is not implemented.
- Supabase Client is not enabled.
- Do not claim tenant isolation, row-level security, or production-grade access
  isolation.
- Current data access should be described only as Prisma-backed data access.
- Production data access rules, RLS, or equivalent isolation must be scoped
  separately before using the app with real client data.

## 7. AI Summary Limitations

- `/ai-summary` is a read-only AI summary history page.
- Live AI generation is not enabled.
- OpenAI SDK is not integrated.
- AI summaries should be described as historical/demo records only.
- Do not claim real-time AI analysis, live report generation, or automatic AI
  decision-making.
- Any live AI feature must be scoped as a future workstream with prompt design,
  provider setup, safety review, cost controls, and error handling.

## 8. Board / Team / Settings Limitations

- `/board` is read-only.
- `/team` is read-only.
- `/settings` is read-only.
- Drag-and-drop workflow changes are not enabled.
- Team workload is for visibility only in the current MVP.
- Workspace settings cannot be actively managed in the current MVP.
- Do not describe board, team, or settings views as management systems with
  live mutation controls.

## 9. Billing And SaaS Limitations

- Billing is not implemented.
- Subscription plans are not implemented in the app.
- Product tiers are planning and positioning documents only.
- Stripe or payment integration should not be claimed unless implemented later.
- The current MVP should not be described as a complete SaaS platform.
- Any billing or subscription work should wait until the product offer is
  validated and scoped.

## 10. Realtime And Collaboration Limitations

- Realtime updates are not enabled.
- Multi-user live collaboration is not enabled.
- Live notifications are not enabled.
- Presence indicators are not enabled.
- Board and workload views should not be described as realtime.
- Notification, collaboration, or presence features are future/custom scope.

## 11. API And Integration Limitations

- API routes are not implemented.
- External integrations are not implemented.
- Google Sheets, LINE, email, Slack, webhook, or similar integrations should be
  described only as future/custom scope unless a later workstream implements
  them.
- Current implementation should be described through app pages and server
  actions only where applicable.

## 12. Demo-Safe Claims

These claims are safe for demo, portfolio, and product discussion:

- The MVP uses Prisma-backed data.
- The dashboard shows task and workflow visibility.
- The task list supports search/filter.
- Users can create and edit tasks in the MVP.
- Board, AI summary history, team workload, and settings are available as
  read-only views.
- The project is suitable as a portfolio-ready internal dashboard MVP and
  productized freelance dashboard concept.
- The project has clear future-scope paths for Auth, Delete/Archive Task, Live
  AI, permissions, integrations, and billing.

## 13. Claims To Avoid

Do not claim:

- Auth is implemented.
- Billing is implemented.
- Live AI generation works.
- OpenAI SDK is integrated.
- Delete Task is available.
- Permission or role guard is implemented.
- RLS or tenant isolation is implemented.
- Realtime updates are enabled.
- API routes are available.
- Invites are available.
- The product is production-ready SaaS.
- The board supports drag-and-drop status updates.
- Team or settings pages support active management workflows.

## 14. Production Readiness Notes

Before positioning FlowDesk AI as a production-ready system, the project should
add or complete:

- Authentication
- Permission / Role Guard
- Delete or archive behavior
- Data access rules, RLS, or equivalent isolation
- Live AI generation if AI is part of the paid promise
- Error handling and production QA
- Deployment/security review
- Backup/restore strategy if used with real client data
- Logging and monitoring appropriate for production use
- A clear support and maintenance plan

## 15. Recommended Next Fixes

Recommended future implementation order:

1. Delete or Archive Task
2. Auth
3. Permission / Role Guard
4. Live AI Summary Generation
5. Invite flow
6. Realtime or notifications
7. Billing only after product validation

This order keeps the product grounded in useful workflow functionality before
adding heavier SaaS platform features.

## 16. Summary

The current FlowDesk AI MVP is demo-ready for workflow visibility, task
tracking, portfolio presentation, and productized freelance dashboard
discussion.

It is not yet a production-ready SaaS product. The safest positioning is to
present it as a transparent MVP foundation with clear current capabilities,
read-only boundaries, and future workstreams for production features.
