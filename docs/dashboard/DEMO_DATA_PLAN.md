# FlowDesk AI Demo Data Plan

## 1. Purpose

Good demo data makes FlowDesk AI easier to understand. Realistic tasks, owners,
deadlines, blockers, and saved summary examples help viewers see the product as
an internal workflow dashboard instead of a generic task list.

This document describes a demo data direction only. Phase A2 does not create or
modify seed scripts and does not run database commands.

## 2. Demo Scenario

Recommended scenario: a small e-commerce operations team.

The team handles internal tasks across Sales, Operations, Support, and Admin.
Their daily workflow includes order issues, customer follow-ups, reporting,
stock coordination, vendor questions, and operational blockers.

The demo should show how FlowDesk AI gives the team a shared view of what is
planned, active, under review, completed, or blocked.

## 3. Workspace Example

| Field | Example |
| --- | --- |
| Workspace name | BrightOps Commerce |
| Business type | Small e-commerce operations team |
| Team size | 5-7 people |
| Departments | Sales, Operations, Support, Admin |
| Demo goal | Show ownership, deadlines, blockers, workload, and reporting clarity. |

## 4. Team Members

| Name | Department | Role | Example responsibility |
| --- | --- | --- | --- |
| Maya Chen | Operations | Operations Lead | Coordinates daily workflow, blockers, and priority decisions. |
| Leo Parker | Support | Support Coordinator | Owns customer follow-ups, refund checks, and ticket escalation. |
| Nina Brooks | Sales | Sales Admin | Tracks wholesale inquiries, order notes, and sales handoffs. |
| Omar Reed | Operations | Fulfillment Specialist | Handles shipping exceptions, stock checks, and vendor coordination. |
| Priya Shah | Admin | Reporting Assistant | Prepares weekly reports, dashboards, and internal summaries. |
| Grace Miller | Support | Customer Care Specialist | Reviews customer issues and keeps follow-up tasks moving. |

## 5. Task Examples

Use only the current FlowDesk MVP app statuses:

- Todo
- In Progress
- Review
- Done
- Blocked

Urgent is a priority, not a status.

| Title | Department | Owner | Status | Priority | Deadline style | Short description | Why useful for demo |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Review delayed order list for VIP customers | Support | Leo Parker | In Progress | High | Due today | Check delayed orders and prepare customer follow-up notes. | Shows active customer-impacting work and due-today urgency. |
| Confirm replacement stock for best-selling SKU | Operations | Omar Reed | Blocked | Urgent | Overdue | Waiting on vendor confirmation before updating customer-facing stock notes. | Demonstrates a blocker; plain-language "waiting" maps to Blocked. |
| Prepare weekly operations report | Admin | Priya Shah | Review | Medium | Due tomorrow | Compile support tickets, shipping exceptions, and task completion notes. | Shows reporting work that needs review before sharing. |
| Create task checklist for new wholesale inquiry | Sales | Nina Brooks | Todo | Medium | Future due date | Draft internal checklist for handling a new wholesale buyer request. | Represents backlog-style planned work mapped to Todo. |
| Follow up on refund exception tickets | Support | Grace Miller | In Progress | High | Near deadline | Review refund cases that need manual approval before end of day. | Shows near-deadline work with a clear owner. |
| Update fulfillment SOP after courier policy change | Operations | Maya Chen | Todo | Low | Future due date | Update the internal process document after courier rule changes. | Shows lower-priority operational maintenance. |
| Verify completed shipment reconciliation | Operations | Omar Reed | Done | Medium | Completed this week | Confirm order and shipment records match after the weekly reconciliation. | Gives the demo completed work for dashboard and team counts. |
| Review customer complaint trend notes | Support | Leo Parker | Review | Medium | Due this week | Summarize repeated complaint patterns before the weekly team review. | Shows review status and reporting context. |
| Resolve blocked packing material order | Operations | Maya Chen | Blocked | High | Overdue | Internal purchase request is waiting for admin approval. | Shows dependency risk without introducing a new status. |
| Add sales handoff notes for campaign orders | Sales | Nina Brooks | Todo | Medium | Future due date | Add internal notes for upcoming campaign-related orders. | Shows planned cross-team coordination. |
| Check open support backlog before daily standup | Support | Grace Miller | In Progress | Urgent | Due today | Identify unresolved tickets that could affect order delivery promises. | Uses Urgent correctly as priority, not status. |
| Finalize weekly dashboard screenshots | Admin | Priya Shah | Done | Low | Completed this week | Save screenshots for the weekly internal operations summary. | Shows harmless completed admin work. |

## 6. Status Design

The current MVP app statuses are:

| Status | Meaning | Plain-language mapping |
| --- | --- | --- |
| Todo | Planned work that has not started yet. | Backlog-style work should be represented as Todo. |
| In Progress | Work currently being handled by an owner. | Active tasks and near-deadline tasks can be In Progress. |
| Review | Work is drafted or prepared and needs checking. | Report drafts, checklist drafts, and approval-ready work fit here. |
| Done | Work is complete. | Use some Done tasks so the demo does not look artificially stuck. |
| Blocked | Work cannot move forward because of a dependency or missing input. | Waiting on vendor, client, admin approval, or another team maps to Blocked. |

Do not introduce Backlog, Waiting, or Urgent as app statuses. If those ideas are
useful in business explanation:

- Backlog-style planned work maps to Todo.
- Waiting on another person, vendor, customer, or internal approval maps to
  Blocked.
- Urgent is not a status; use Urgent priority.

## 7. Priority Design

| Priority | When to use it |
| --- | --- |
| Low | Useful but not time-sensitive; can wait behind customer-impacting work. |
| Medium | Normal operational work that should be tracked and completed on schedule. |
| High | Important work that affects customers, reporting, or team coordination. |
| Urgent | Time-sensitive or high-risk work that needs immediate attention. |

Urgent should always be treated as a priority, not a workflow status.

## 8. AI Summary History Examples

Live AI generation is not enabled in the current MVP. These are planned/example
records for read-only AI summary history.

| Summary title | Date label | Key risks | Suggested next actions | Report message style |
| --- | --- | --- | --- | --- |
| Daily Operations Summary | Today | Delayed VIP orders and blocked stock confirmation could affect customer updates. | Confirm vendor response, prioritize VIP order follow-ups, and review refund exceptions. | Concise team lead update. |
| Weekly Workflow Summary | This week | Support workload is concentrated around refund exceptions and order delays. | Balance support tasks across two owners and complete the operations report review. | Weekly internal report. |
| Blocker Summary | Current blockers | Replacement stock and packing material tasks are blocked by external or approval dependencies. | Escalate vendor confirmation and admin purchase approval before the next standup. | Risk-focused operations note. |
| Priority Suggestions | Next planning cycle | Urgent support backlog and overdue operations blockers need attention before lower-priority SOP updates. | Handle urgent customer-facing tasks first, then unblock vendor and admin dependencies. | Prioritization memo. |

## 9. Good Demo Data Rules

- Use realistic business tasks.
- Include mixed statuses and priorities.
- Include clear owners.
- Include a few blocked tasks.
- Include a few urgent-priority tasks.
- Include near-deadline and overdue tasks.
- Avoid generic placeholder text like lorem ipsum.
- Avoid too-perfect data where everything is done.

## 10. Bad Demo Data Examples

| Weak example | Why it hurts the demo |
| --- | --- |
| Task 1 | Gives no business context or reason to care. |
| Update stuff | Too vague; viewers cannot understand ownership, value, or urgency. |
| Every task is Done | Removes the need for a workflow dashboard. |
| No assigned owners | Makes workload and ownership views feel empty or unrealistic. |
| Every task is Urgent | Makes priority meaningless and creates noise. |
| Urgent used as a status | Conflicts with the current MVP model; Urgent is a priority. |
| Waiting used as a status | Conflicts with the current MVP model; waiting work should map to Blocked. |
| Backlog used as a status | Conflicts with the current MVP model; backlog-style planned work should map to Todo. |

## 11. Future Seed Data Note

This document can later guide seed data or sample data setup for demos.

Phase A2 must not create or modify seed scripts, must not run `prisma db seed`,
must not run migrations, and must not run `prisma db push`.
