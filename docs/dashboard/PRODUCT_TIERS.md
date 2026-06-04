# FlowDesk AI Product Tiers

## 1. Purpose

This document defines proposed product and service packages for presenting
FlowDesk AI as:

- A portfolio case study
- A productized freelance dashboard offer
- A future SaaS concept

Billing is not implemented in the current MVP. These tiers are planning and
positioning references only. Price ranges are draft planning estimates, not
final quotes, contracts, or implemented billing plans.

These product tiers are freelance/service packages. They are not in-app
subscription tiers.

## 2. Product Positioning

FlowDesk AI is an internal task and workflow dashboard for small teams that
need better visibility, ownership, workload tracking, and reporting clarity.

The current MVP includes:

- Prisma-backed task tracking
- Dashboard overview
- Task list with search/filter
- Create Task and Edit Task flows
- Task detail pages
- Read-only workflow board
- Read-only AI summary history
- Read-only team workload view
- Read-only workspace settings

The product is useful as a demo-ready internal dashboard foundation. It is not
yet a finished production SaaS product.

## 3. Current MVP Package

| Field | Current MVP package |
| --- | --- |
| Package name | FlowDesk AI MVP Demo |
| Target user | Portfolio reviewers, freelance prospects, small teams evaluating an internal dashboard concept |
| Included features | Dashboard overview, task list/search/filter, Create Task, Task detail, Edit Task, read-only board, read-only AI summary history, read-only team workload, read-only settings, Prisma-backed data layer |
| Not included | Delete Task, Auth, Permission / Role Guard, RLS, Supabase Client, Live AI generation, OpenAI SDK, Invites, Billing, Realtime, API routes |
| Best use case | Demonstrating a polished MVP foundation for internal task visibility and workflow tracking |
| Demo readiness | Ready for portfolio and product discovery conversations, with MVP limitations stated clearly |

This is the current implemented MVP state. It should not be presented as a paid
production-ready package without additional scoping, production hardening, and
client-specific requirements review.

## 4. Proposed Product Tiers

### Tier 1: Starter Internal Dashboard

| Field | Details |
| --- | --- |
| Suggested price range | 8,000 - 15,000 THB |
| Best for | Small teams, solo operators, small shops, simple internal tracking |
| Main value | A focused dashboard for task visibility and basic workflow tracking |
| Included by default | Limited dashboard pages, task tracking, basic workflow visibility, simple deployment support, basic documentation |
| Not included by default | Live AI, complex roles, billing, realtime, advanced integrations, custom approval flows |

This tier is best when the client needs a simple internal tool and the workflow
is already clear. It should stay small and avoid custom complexity.

### Tier 2: Pro Workflow Dashboard

| Field | Details |
| --- | --- |
| Suggested price range | 20,000 - 35,000 THB |
| Best for | Small businesses or operations teams that need clearer workflow tracking |
| Main value | A fuller internal operations dashboard with more workflow and reporting context |
| Included by default | Dashboard, task list, task detail, create task, and edit task workflows; workflow board; team workload overview; report/summary page; basic admin setup; documentation |
| Custom scope | Custom fields if scoped as part of the client workflow |
| AI support | AI summary can be positioned as a planned/custom add-on unless implemented later |
| Not included by default | Billing, realtime, complex permission systems, external integrations, live AI unless scoped |

This tier fits teams that need a stronger internal workflow dashboard, but still
do not need a fully custom internal system.

### Tier 3: Custom Internal System

| Field | Details |
| --- | --- |
| Suggested price range | 40,000 - 80,000+ THB |
| Best for | Teams with custom workflow, approval flows, reporting, integrations, or multi-role access |
| Main value | A tailored internal system designed around a specific business workflow |
| Included by default | Custom workflow design, database modeling, dashboards, permission planning, integrations, deployment consultation, documentation |
| Scope note | Actual scope depends on requirements, data complexity, feedback speed, and integration needs |

This tier should always begin with workflow discovery. It should not be priced
or promised as a simple dashboard if the client needs permissions,
integrations, custom data models, or production-grade operations.

Role-based permission implementation is not enabled in the current MVP. Any
permission planning or implementation must be scoped separately.

## 5. Tier Comparison Table

These are service/package tiers for freelance or productized project planning.
They are not in-app subscription tiers, and they are not enabled in-app billing
plans.

| Category | Starter Internal Dashboard | Pro Workflow Dashboard | Custom Internal System |
| --- | --- | --- | --- |
| Target user | Solo operator, small shop, very small team | Small business, operations team, admin team | Team with custom workflows or integrations |
| Main value | Basic task visibility | Workflow tracking and reporting clarity | Tailored internal operations system |
| Pages/features | Limited dashboard and task pages | Dashboard, task list, task detail, create task, edit task, board, team workload, report/summary page | Custom pages, custom workflows, reporting, integrations |
| Customization level | Low | Medium | High |
| AI support | Not included by default; future scope | Planned/custom add-on unless implemented later | Scoped custom feature if required |
| Auth/roles | Not included by default; planned/custom scope | Basic auth/role planning possible as add-on; implementation is separate scope | Permission planning and role design may be included if scoped; implementation is not enabled in the current MVP |
| Integrations | Not included by default | Light integrations as add-ons | Custom integrations by requirements |
| Estimated price range | 8,000 - 15,000 THB | 20,000 - 35,000 THB | 40,000 - 80,000+ THB |
| Delivery complexity | Low | Medium | High |

Billing, Auth, Permission / Role Guard, Live AI, Realtime, API routes,
Supabase Client, and RLS are not implemented in the current MVP. They should be
treated as planned, custom, or future scope unless a later workstream implements
them.

## 6. Scope Included vs Not Included

### Included By Default

- Dashboard pages
- Task tracking
- Basic workflow status
- Prisma-backed data structure
- Demo data setup/planning
- Basic deployment guidance
- Documentation

### Not Included By Default

- Authentication
- Role-based permission
- Delete Task
- Live AI generation
- OpenAI SDK integration
- Billing/subscription system
- Realtime collaboration
- Invite system
- Supabase Client/RLS
- External API integrations
- Mobile app
- Advanced PDF/Excel export

These items should be handled as add-ons, future scope, or separate project
phases after the base workflow is confirmed.

## 7. Add-On Menu

| Add-on | Description | Complexity | Dependencies / risks |
| --- | --- | --- | --- |
| Authentication setup | Add user sign-in and session handling. | High | Requires auth provider decision, security review, protected routes, and environment setup. |
| Role/permission guard | Restrict actions by owner/admin/member role. | High | Depends on Auth and clear permission rules. Avoid promising before workflow is mapped. |
| Delete/archive task behavior | Add safe task deletion or archive behavior. | Medium | Needs product decision: hard delete vs archive, recovery behavior, and audit expectations. |
| Live AI summary generation | Generate daily/weekly summaries from task data. | High | Requires AI provider, prompt design, cost controls, logging, and error handling. |
| OpenAI SDK integration | Add model calls through an AI integration layer. | High | Depends on live AI scope, secrets management, rate limits, and output safety. |
| Export report | Export dashboard or summary data as a report. | Medium | Requires output format decision: PDF, CSV, Excel, or email-friendly text. |
| Email/LINE notification | Send task or report notifications. | Medium | Requires notification provider, recipient rules, opt-in expectations, and failure handling. |
| Google Sheet import/export | Import tasks or export reports through Google Sheets. | High | Requires API credentials, data mapping, sync conflict rules, and permission review. |
| Realtime updates | Show live updates across users. | High | Requires realtime architecture and production security decisions. Not enabled in current MVP. |
| Invite/team management | Invite users and manage workspace membership. | High | Depends on Auth, role rules, email delivery, and workspace access model. |
| Billing integration | Add payment or subscription flows. | High | Requires pricing model, payment provider, legal/tax review, and production readiness. |
| Custom dashboard page | Add a new dashboard for a client-specific metric or workflow. | Medium | Requires metric definitions and data model review. |
| Custom workflow/status model | Change or expand task statuses for a client workflow. | Medium | May require schema, UI, seed data, and reporting updates. |

## 8. Custom Request Policy

Custom requests should be handled through scope review before implementation.

Recommended policy:

- Confirm the business workflow first.
- Separate must-have requirements from nice-to-have ideas.
- Avoid adding features without scope review.
- Put advanced features into add-ons.
- Confirm data model impact before implementation.
- Do not promise Auth, Billing, Realtime, or AI unless scoped.
- Do not treat a demo MVP as production-ready without a production checklist.

The safest sales posture is to sell a clear base dashboard, then scope advanced
features as deliberate add-ons.

## 9. Delivery Timeline Estimate

| Package | Rough timeline |
| --- | --- |
| Starter Internal Dashboard | 5-10 working days |
| Pro Workflow Dashboard | 10-17 working days |
| Custom Internal System | 3-6+ weeks |

Timelines depend on scope, feedback speed, data complexity, integrations,
deployment needs, and whether the client already understands their workflow.

## 10. Sales Positioning

### Portfolio Reviewer

FlowDesk AI demonstrates a practical internal dashboard MVP with Prisma-backed
data, task create/edit flows, read-only workflow and reporting views, and clear
product boundaries.

### Freelance Client

FlowDesk AI can be positioned as a starting point for a custom internal
dashboard that helps a small team see tasks, owners, deadlines, blockers, and
workload in one place.

### Small Business Owner

This dashboard concept helps replace scattered manual updates with a clearer
internal workflow view. The first version can stay simple, then add Auth,
permissions, AI, notifications, or integrations only when the business case is
clear.

## 11. Risks and Boundaries

- Over-scoping a small dashboard into a full internal system.
- Underpricing custom workflow, integrations, or permission logic.
- Selling SaaS promises before Auth and Billing are implemented.
- Claiming live AI before integration exists.
- Not separating the demo MVP from a production-ready system.
- Adding advanced features before the client workflow is confirmed.
- Treating draft price ranges as fixed quotes.

## 12. Recommended Next Product Step

Recommended next steps after Workstream A:

- Keep the current MVP as the demo/portfolio version.
- Use these product tiers for pricing conversations and scope framing.
- Prioritize Auth, Delete/Archive Task, and Live AI only when moving toward
  production.
- Avoid building Billing before validating client interest.
- Keep advanced features in add-on scope until a real client workflow requires
  them.
