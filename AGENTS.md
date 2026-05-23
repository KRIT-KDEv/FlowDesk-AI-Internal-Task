# AGENTS.md

## Project Overview

This repository is for FlowDesk AI Dashboard.

FlowDesk AI Dashboard is a web app / SaaS MVP for internal task and workflow management with AI Summary.

The product helps freelancers, small agencies, and small business teams manage tasks, track workflow status, identify overdue work, and generate AI-powered daily or weekly summaries.

The current focus is only the FlowDesk AI Dashboard.

Do not work on any digital product, Notion template, prompt pack product, automation guide, or sales asset unless explicitly requested.

---

## Current Project Focus

Focus only on:

- FlowDesk AI Dashboard
- Web app / SaaS MVP
- Internal task management
- Workflow dashboard
- AI Summary feature
- Portfolio-ready demo
- Freelance project foundation

Do not include unrelated product tracks.

---

## Target Users

The MVP target users are:

- Freelancers managing multiple client tasks
- Small agencies managing content, design, ads, and client work
- Small business teams that need internal task visibility
- Team leads who need daily or weekly work summaries

Primary demo use case:

- Small agency workflow dashboard

Demo workspace:

- BrightAds Agency

---

## Core Problem

Small teams often manage tasks across chat, spreadsheets, Notion, Trello, and manual updates.

This causes problems such as:

- Team leads do not know which tasks are overdue
- Work status is unclear
- Team members have scattered responsibilities
- Reports take too much time to write manually
- Important tasks get missed
- Priorities are hard to identify

FlowDesk AI Dashboard should solve this by giving teams one clear dashboard for task tracking and AI-generated work summaries.

---

## Product Goal

Build a small but polished MVP that can be used as:

- A portfolio project
- A freelance demo
- A base for future SaaS development
- A proof of concept for AI workflow dashboards

The MVP should feel useful and demo-ready, but it should not become a large enterprise system.

---

## Tech Stack

Use this stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma
- PostgreSQL
- Mock auth during MVP unless auth is explicitly requested
- Mock AI output before real AI integration
- Vercel for deployment

Do not introduce new major dependencies unless necessary.

If a new dependency is needed, explain:

1. Why it is needed
2. Where it will be used
3. Whether there is a simpler option

---

## MVP Scope

Build only the following MVP features:

- Dashboard overview
- Task management
- Task list
- Task detail
- Status workflow
- Priority
- Due date
- Assignee
- Basic Kanban board
- AI Daily Summary
- AI Weekly Summary
- Overdue Summary
- Priority Suggestions
- Demo seed data

---

## MVP Pages

The app should include these pages:

- `/dashboard`
- `/tasks`
- `/tasks/[id]`
- `/board`
- `/ai-summary`
- `/team`
- `/settings`

Each page should be simple, clear, and demo-ready.

---

## Task Status

Use these display statuses:

- Todo
- In Progress
- Review
- Done
- Blocked

For code enums, prefer:

- `TODO`
- `IN_PROGRESS`
- `REVIEW`
- `DONE`
- `BLOCKED`

---

## Task Priority

Use these display priorities:

- Low
- Medium
- High
- Urgent

For code enums, prefer:

- `LOW`
- `MEDIUM`
- `HIGH`
- `URGENT`

---

## Out of Scope

Do not build these unless explicitly requested:

- Payment
- Subscription
- Complex role permissions
- Real-time chat
- Full document editor
- Full automation engine
- Mobile app
- Drag-and-drop Kanban
- Client portal
- Advanced reporting
- Multi-workspace billing
- Full calendar sync
- LINE integration
- Slack integration
- Production-grade team invitation system
- Public marketplace
- Landing page sales funnel

Keep the MVP small and buildable.

---

## Demo Data

Use this demo workspace:

- BrightAds Agency

Use these demo members:

- Admin
- Designer
- Content Writer
- Ads Manager
- Account Manager

Use realistic small-agency tasks such as:

- Write Facebook content for Client A
- Design monthly promotion banner
- Review weekly ads report
- Fix landing page based on feedback
- Prepare proposal for new client
- Send draft campaign to client
- Update campaign performance dashboard
- Create ad copy variations
- Review client feedback
- Schedule content calendar

---

## Folder Structure

Prefer this structure:

```txt
app/
  dashboard/
    page.tsx
  tasks/
    page.tsx
    [id]/
      page.tsx
  board/
    page.tsx
  ai-summary/
    page.tsx
  team/
    page.tsx
  settings/
    page.tsx
  layout.tsx
  page.tsx

components/
  layout/
    app-shell.tsx
    app-sidebar.tsx
    app-topbar.tsx
  dashboard/
  tasks/
  board/
  ai/
  ui/

lib/
  mock-data.ts
  utils.ts

types/
  index.ts

prisma/

docs/
  dashboard/
    PRODUCT_SPEC.md
    MVP_SCOPE.md
    ROADMAP.md
    PROMPTS.md
```
