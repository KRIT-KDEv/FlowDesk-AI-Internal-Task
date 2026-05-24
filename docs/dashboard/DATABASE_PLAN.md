# FlowDesk AI Dashboard Database Plan

## 1. Database Overview

FlowDesk AI Dashboard will use Supabase PostgreSQL as the database provider.

Prisma will be the main ORM for application database access.

The MVP should continue using mock data until database setup is explicitly requested.

## 2. Architecture

Preferred database access path:

```txt
Next.js Server
-> Prisma Client
-> Supabase PostgreSQL
```

Database access should stay server-side during the MVP.

Frontend components should not connect directly to Supabase or receive database connection strings.

## 3. Current MVP Database Scope

Initial models:

- User
- Workspace
- WorkspaceMember
- Task
- AISummary

Do not include Project, Client, TaskComment, TaskActivity, or AutomationLog in the initial MVP schema unless they are explicitly marked as future models.

## 4. Model Responsibilities

### User

Represents a person who can own, create, or be assigned work in FlowDesk AI Dashboard.

For the MVP, User supports internal team identity only. Authentication behavior is not part of this phase.

### Workspace

Represents an agency or team workspace, such as BrightAds Agency.

A Workspace owns tasks, members, and AI summaries.

### WorkspaceMember

Represents the membership link between a User and a Workspace.

WorkspaceMember stores the user's role inside a workspace and enables a User to belong to many Workspaces.

### Task

Represents an internal task or workflow item.

Task stores status, priority, due date, workspace ownership, creator, optional assignee, and core task details.

### AISummary

Represents a generated or mocked operational summary for a Workspace.

AISummary stores daily, weekly, overdue, priority, or client update summary content.

## 5. Relationship Plan

Planned relationships:

- User can belong to many Workspaces through WorkspaceMember
- Workspace has many WorkspaceMembers
- Workspace has many Tasks
- Task belongs to Workspace
- Task may have assignee User
- Task has createdBy User
- Workspace has many AISummaries

Relationship notes:

- WorkspaceMember should connect one User to one Workspace.
- Task assignee should be optional so unassigned demo tasks remain possible.
- Task createdBy should be required so every task has a clear creator.
- AISummary should belong to a Workspace so summaries can be scoped to one team.

## 6. Enum Plan

### TaskStatus

- TODO
- IN_PROGRESS
- REVIEW
- DONE
- BLOCKED

### TaskPriority

- LOW
- MEDIUM
- HIGH
- URGENT

### MemberRole

- OWNER
- ADMIN
- MEMBER
- VIEWER

### AISummaryType

- DAILY
- WEEKLY
- OVERDUE
- PRIORITY
- CLIENT_UPDATE

## 7. Environment Variables

The MVP database setup will require:

- `DATABASE_URL`
- `DIRECT_URL`

`DATABASE_URL` is used by Prisma Client at runtime.

`DIRECT_URL` is used by Prisma Migrate or direct migration operations.

Real values belong in `.env`.

Placeholder values belong in `.env.example`.

`.env` must never be committed.

`.env.example` can be committed.

Use placeholder examples only:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:6543/postgres"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/postgres"
```

Security rules:

- Do not read, print, modify, overwrite, or delete the real `.env` file
- Do not expose real Supabase connection strings
- Do not include real database URLs, passwords, tokens, or secrets in generated files
- Only use placeholder values when documenting environment variables

## 8. Supabase Setup Path

The project will start with the simple Supabase connection path first.

The first database setup should use Supabase-provided PostgreSQL connection strings with Prisma.

A custom Prisma database user may be added later for production hardening.

## 9. RLS Decision

RLS is not required during the MVP because database access is server-side through Prisma.

Do not use Supabase Client in frontend components yet.

Do not add RLS policies during this phase.

RLS may be revisited when one or more of the following are added:

- Supabase Auth
- Client-side Supabase access
- Production multi-tenant security

## 10. Migration Plan

Future migration steps:

1. Install Prisma packages
2. Create `prisma/schema.prisma`
3. Add datasource `db` with `DATABASE_URL` and `DIRECT_URL`
4. Run `prisma format`
5. Review schema
6. Run `prisma migrate dev` only when schema is approved

Do not run migrations until the schema has been reviewed and approved.

## 11. Future Models

The following models are out of scope for now:

- Project
- Client
- TaskComment
- TaskActivity
- AutomationLog

These may be considered later after the core Dashboard MVP models are stable.

## 12. Out of Scope for This Phase

This phase does not include:

- Prisma schema
- Package installation
- Migration
- Supabase Auth
- Supabase Client
- RLS policy
- AI API
- Production permission setup
- Database tables
- `lib/prisma.ts`
- `.env` creation or modification
- `.env.example` creation
