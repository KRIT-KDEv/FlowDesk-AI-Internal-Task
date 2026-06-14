# FlowDesk AI Client Offer / Product Tiers

## 1. Purpose Of The Offer Document

This document packages FlowDesk AI for freelance client discussions, Fastwork
service planning, portfolio presentation, and future custom dashboard scoping.

It separates three things:

- The current demo-ready dashboard foundation.
- Suggested freelance service tiers.
- Paid add-ons that require separate scope, budget, and implementation.

The price ranges in this document are example planning ranges only. They are
not final quotes, guaranteed packages, in-app subscription plans, or billing
plans implemented in the app. Final pricing should be adjusted based on client
requirements, deployment scope, data sensitivity, integrations, timeline,
maintenance needs, and production hardening expectations.

## 2. Current MVP Package

The current FlowDesk AI MVP is a portfolio-ready and demo-ready internal task
dashboard foundation. It is suitable for showing the product direction and for
starting client discovery, but it should not be used with real production client
data without additional paid hardening.

| Area | Current MVP status |
| --- | --- |
| Package name | FlowDesk AI Dashboard Foundation |
| Positioning | AI-ready internal task dashboard MVP for small-team workflow visibility |
| Data access | Prisma-backed dashboard and task data |
| Task workflows | Task list with search/filter, create task, task detail, edit task, and limited MVP demo-only hard delete from `/tasks/[id]` |
| Demo auth | Demo Auth / Portfolio Auth for controlled walkthroughs |
| Demo roles | `admin`, `manager`, and `viewer` |
| Demo mutation guard | `admin` can create/edit/delete; `manager` can create/edit only; `viewer` is read-only |
| Read-only views | Board, AI summary history, team workload, and workspace settings |
| AI status | Read-only saved AI summary/history page only; live AI generation is not enabled |
| Production status | Not production-secure and not production-ready SaaS |

## 3. Who This Is For

FlowDesk AI is a good fit for early conversations with:

- Small business owners who need clearer internal task visibility.
- Freelancers or solo operators managing repeatable client work.
- Small agencies coordinating content, design, ads, and client follow-ups.
- Operations or admin teams replacing scattered spreadsheets and chat updates.
- Portfolio reviewers evaluating full-stack dashboard, product, and scoping work.

The current MVP is best used as a starting point for a custom client
implementation, not as a finished production system.

## 4. What Is Included In The Current Dashboard Foundation

The current dashboard foundation includes:

- Prisma-backed dashboard overview.
- Prisma-backed task list with search/filter.
- Create Task flow through `createTaskAction()`.
- Task detail page.
- Edit Task flow through `updateTaskAction()`.
- Limited MVP demo-only Delete Task from `/tasks/[id]`.
- Demo Auth / Portfolio Auth with `admin`, `manager`, and `viewer` roles.
- App-level demo role guard for routes and navigation.
- Server-side demo mutation guards for task create/edit/delete actions.
- Read-only workflow board.
- Read-only saved AI summary/history page.
- Read-only team workload page.
- Read-only workspace settings page.
- Product, demo, pricing, deployment, and limitation documentation.

## 5. What Is Not Included In The Current MVP

The current MVP does not include:

- Live AI generation.
- OpenAI/Gemini API integration.
- Production Auth.
- Database-backed users.
- Workspace or organization isolation.
- Production role-based access control.
- RLS.
- Supabase Client.
- Invites.
- Billing or in-app subscription plans.
- Realtime collaboration.
- API routes.
- Archive / Soft Delete.
- Restore / Recycle Bin.
- Audit Log.
- Multi-user production safeguards.

Delete Task is currently a limited MVP demo-only hard delete flow. It does not
include archive, soft delete, restore, recycle bin, audit log, or production
multi-user safeguards.

## 6. Suggested Freelance Service Tiers

These tiers are service/package planning references. They are not active
subscription tiers inside the application.

| Tier | Example planning range | Best fit | Core outcome |
| --- | --- | --- | --- |
| Starter Internal Dashboard | 8,000 - 15,000 THB | Solo operators, small shops, small teams | Simple internal task visibility |
| Workflow Dashboard Customization | 20,000 - 35,000 THB | Small businesses and agency teams | Custom workflow dashboard based on the MVP foundation |
| Production-Ready Custom System | 40,000 - 80,000+ THB | Teams with real users, sensitive data, integrations, or complex operations | Production-oriented internal system with custom hardening |

Final scope should always be confirmed through workflow discovery before
pricing is treated as a quote.

## 7. Tier 1: Starter Internal Dashboard

**Example planning range:** 8,000 - 15,000 THB

Best for small teams, solo operators, small shops, or simple internal tracking
needs.

Typical scope:

- Basic dashboard and task pages.
- Task list, task detail, create task, and edit task workflows.
- Simple status and priority tracking.
- Basic demo role setup if needed for walkthroughs.
- Light branding and copy adjustments.
- Basic deployment guidance.
- Short usage documentation.

Not included by default:

- Live AI generation.
- Production Auth or database-backed users.
- Complex permissions.
- Billing.
- Realtime.
- External integrations.
- Archive/restore safeguards.
- Advanced reporting.

Use this tier when the client needs a clear, small internal dashboard and the
workflow is already simple.

## 8. Tier 2: Workflow Dashboard Customization

**Example planning range:** 20,000 - 35,000 THB

Best for small businesses, operations teams, or agencies that need a more
tailored workflow dashboard.

Typical scope:

- Dashboard customized around the client workflow.
- Task list, task detail, create task, edit task, and controlled delete behavior
  if scoped.
- Workflow board or status view.
- Team workload overview.
- Saved summary/report page.
- Demo role behavior or simple app-level role planning.
- Custom fields if scoped as part of the client workflow.
- Demo data planning and setup guidance.
- Documentation for client handoff.

Not included by default:

- Live AI generation unless scoped as an add-on.
- Production Auth or production role system.
- Workspace isolation.
- Billing.
- Realtime collaboration.
- Invite system.
- External API integrations.

This tier is the strongest fit for a productized freelance dashboard offer:
focused enough to deliver, but flexible enough for a real client workflow.

## 9. Tier 3: Production-Ready Custom System

**Example planning range:** 40,000 - 80,000+ THB

Best for teams that need real users, production data, custom workflow rules,
approval flows, integrations, reporting, or stronger access control.

Possible scope:

- Production Auth planning and implementation.
- Database-backed users.
- Workspace or organization isolation.
- Membership and role model design.
- Server-side authorization checks.
- Safer delete behavior through archive/soft delete and restore planning.
- Audit log if required.
- Custom dashboards and reporting.
- External integrations.
- Deployment, security, and maintenance planning.

This tier must start with discovery. It should not be sold as a simple dashboard
if the client needs production security, sensitive data handling, multi-user
permissions, or business-critical operations.

## 10. Optional Add-ons

| Add-on | What it adds | Notes |
| --- | --- | --- |
| Live AI summary generation | Generates daily or weekly summaries from task data. | Optional paid add-on only. Requires AI provider choice, prompt design, secret handling, cost controls, and QA. |
| OpenAI/Gemini integration | Connects a model provider for live AI features. | Not enabled in the current MVP. Must be scoped separately. |
| Production Auth / User Management | Real sign-in, database-backed users, and secure sessions. | Demo Auth exists now, but it is only for controlled portfolio walkthroughs. |
| Role and permission system | Production permission rules for real users. | Requires production Auth and server-side authorization design. |
| Archive / Restore | Safer task removal with restore or recycle-bin behavior. | Current Delete Task is hard delete and demo-only. |
| Audit Log | Records important actions for review and accountability. | Useful for production multi-user systems. |
| Realtime updates | Live updates across users or dashboards. | Requires realtime architecture and security review. |
| Notifications | Email, LINE, Slack, or similar reminders and updates. | Requires provider setup, recipient rules, and failure handling. |
| Invite flow | Invite and manage team members. | Requires production Auth and user management. |
| Billing integration | Payment or subscription flows. | Should come after client/product validation and production readiness planning. |
| External integrations | Google Sheets, CRM, webhooks, or custom APIs. | Requires data mapping, permission review, and testing. |
| Custom dashboard page | A new dashboard for client-specific KPIs or reports. | Requires metric definitions and data availability. |

## 11. AI Summary Add-on Positioning

FlowDesk AI should be described as an AI-ready task dashboard, not as a live AI
product today.

Safe client wording:

- The MVP includes a read-only saved AI summary/history page.
- The product is designed for future AI summary integration.
- Live AI generation can be scoped as an optional paid add-on.

Do not claim that OpenAI, Gemini, autonomous agents, real-time AI analysis, or
production AI automation are connected in the current MVP.

## 12. Production Auth / User Management Add-on Positioning

The current app includes Demo Auth / Portfolio Auth with `admin`, `manager`, and
`viewer` roles. This supports controlled walkthroughs and portfolio demos.

Production client use requires separate work, such as:

- A production auth provider.
- Database-backed users.
- Secure session handling.
- User management.
- Workspace or organization isolation.
- Production permission rules.
- Security review.

Do not describe the current demo auth as production-grade authentication or
tenant-safe access control.

## 13. Archive / Restore Add-on Positioning

Current Delete Task is a limited MVP demo-only hard delete from `/tasks/[id]`.
It is useful for demonstrating task lifecycle completion, but it is not safe
enough for production client data by itself.

A production-ready archive/restore add-on may include:

- Archive or soft-delete fields.
- Restore or recycle-bin flow.
- Filters to hide archived tasks from active views.
- Audit log for delete/archive actions.
- Permission rules around who can archive or restore.

This add-on may require Prisma schema changes and migration planning.

## 14. Realtime / Notifications Add-on Positioning

Realtime and notifications should be scoped only when the business workflow
needs them.

Possible examples:

- Task assignment notifications.
- Daily summary email or LINE notification.
- Near-deadline reminders.
- Live task status updates for multiple users.

These are not enabled in the current MVP and should not be promised without
provider, security, and maintenance planning.

## 15. Billing Add-on Positioning

Billing is not implemented in the current MVP.

Billing should usually come after:

- A validated client or product use case.
- Production Auth.
- Clear pricing model.
- Payment provider decision.
- Tax, invoice, and maintenance expectations.
- Deployment and security review.

For freelance client work, billing integration is often a later custom phase,
not part of the dashboard foundation.

## 16. Client Qualification Questions

Use these questions before confirming scope or price:

- Who will use the dashboard day to day?
- How many people need access?
- What tasks or workflow stages must be tracked?
- Is the dashboard for demo/internal use or real production data?
- Does the client need create, edit, delete, archive, or approval flows?
- Is live AI summary generation actually needed, or is saved reporting enough?
- Are notifications, imports, exports, or integrations required?
- Is production Auth required from day one?
- Is the data sensitive or client-confidential?
- Who will maintain the app after delivery?

## 17. Scope Boundaries And Risk Notes

Important boundaries:

- Do not treat the current MVP as ready for real production client data.
- Do not promise production security from Demo Auth / Portfolio Auth.
- Do not sell live AI until provider, cost, prompt, and failure handling are
  scoped.
- Do not include billing, realtime, invites, integrations, or API routes by
  default.
- Do not use hard delete for production data without archive/restore planning.
- Do not underprice workflows that need custom data models or permission logic.
- Do not present example planning ranges as fixed commitments.

The safest client approach is to sell the dashboard foundation first, then
scope production hardening and add-ons deliberately.

## 18. Recommended Sales Positioning

For a small business owner:

> FlowDesk AI is a dashboard foundation that helps your team see tasks, owners,
> statuses, blockers, and workload in one place. We can start with a clear
> internal workflow dashboard, then add production auth, AI summaries,
> notifications, or integrations only if your workflow needs them.

For a freelance marketplace listing:

> I build custom internal task dashboards for small teams using a proven
> FlowDesk AI foundation. The base package covers workflow visibility and task
> tracking. Production auth, live AI summaries, integrations, billing, and
> realtime features are scoped separately based on your needs.

For a portfolio reviewer:

> FlowDesk AI demonstrates full-stack dashboard planning, Prisma-backed data,
> task create/edit/delete workflows, demo auth and role guards, read-only
> reporting views, and clear product boundaries around AI and production
> readiness.

## 19. What Not To Promise

Do not promise these as current MVP features:

- Live AI generation.
- OpenAI/Gemini connection.
- Autonomous AI agents.
- Real-time AI analysis.
- Production AI automation.
- Production Auth.
- Production RBAC or enterprise permission system.
- Tenant-safe workspace isolation.
- RLS.
- Supabase Client.
- Billing.
- Realtime collaboration.
- Invite system.
- API routes.
- Archive / Soft Delete.
- Restore / Recycle Bin.
- Audit Log.
- Production multi-user safeguards.

These can be discussed as optional add-ons or future production-hardening work,
not as already implemented features.

## 20. Final Offer Summary

FlowDesk AI is strongest as a demo-ready dashboard foundation and portfolio-ready
MVP that can become a custom client system through scoped paid work.

The current foundation is useful for showing task visibility, workflow status,
demo auth roles, and saved summary history. A real client production system
should add the right hardening only after the workflow, users, data sensitivity,
and business value are clear.
