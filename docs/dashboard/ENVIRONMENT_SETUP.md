# FlowDesk AI Environment Setup

## Purpose

This document defines safe environment variable handling for FlowDesk AI demo
and portfolio deployment.

The goal is to prevent secret exposure, keep deployment setup clear, and avoid
overconfiguring unsupported features. This document does not confirm build
success, database connectivity, deployment success, or production readiness.

## Environment Safety Rules

- Never commit real secrets.
- Never paste real database URLs, tokens, keys, or passwords into docs, issues,
  commits, screenshots, demo scripts, chat logs, or presentation materials.
- Configure production and demo environment values only in the hosting provider
  dashboard.
- Use placeholders in documentation.
- Do not expose `.env` files.
- Do not create public environment variables unless the feature that needs them
  is implemented and scoped.
- Keep demo database credentials separate from local development credentials
  where possible.

## Required Environment Variables

The following variables are confirmed by safe inspection of
`prisma/schema.prisma`.

| Variable | Required For | Example Placeholder | Notes | Status |
| --- | --- | --- | --- | --- |
| `DATABASE_URL` | Prisma runtime database access | `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public` | Configure the real value only in the hosting provider dashboard. Do not commit or print it. | Confirmed by Prisma schema |
| `DIRECT_URL` | Prisma direct database connection configuration | `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public` | Configure the real value only in the hosting provider dashboard. Required because `schema.prisma` references `directUrl = env("DIRECT_URL")`. | Confirmed by Prisma schema |

No real values should appear in source code or documentation.

## Variables Not Required Yet

The variables below are examples of future configuration that may be needed if
the related features are implemented later. They are not required for the
current MVP.

| Future variable example | Related future feature | Current MVP status | Notes |
| --- | --- | --- | --- |
| `AUTH_SECRET`, `NEXTAUTH_SECRET`, or similar auth secret | Authentication | Not enabled | Do not add auth variables until Auth is scoped and implemented. |
| OpenAI API key or similar AI provider key | Live AI generation | Not enabled | The current MVP shows saved AI summary history only. |
| Supabase URL, anon key, or service role key | Supabase Client / RLS / Auth | Not enabled | The current MVP uses server-side Prisma-backed data access, not Supabase Client. |
| Stripe or billing keys | Billing / subscriptions | Not enabled | Product tiers are planning documents only, not in-app billing plans. |
| Realtime provider keys | Realtime updates | Not enabled | Board, team, dashboard, and task views are not realtime in the current MVP. |
| Invite, email, or notification provider keys | Invites / notifications | Not enabled | Invite and notification flows are future scope. |

Do not add these variables to the hosting environment unless the corresponding
feature has been planned, implemented, and verified.

## Prisma And Database Notes

The MVP uses Prisma-backed pages and server-side Prisma data access. Deployment
requires a reachable database configured through hosting environment variables.

Database readiness notes:

- `DATABASE_URL` and `DIRECT_URL` are the only confirmed required environment
  variables in B2.
- The database must be reachable from the hosting provider runtime.
- The deployed database must have the expected schema and demo data before a
  walkthrough.
- Database schema readiness and demo data readiness should be verified in later
  deployment phases.
- B2 does not run migrations, `prisma db push`, seed commands, or database
  commands.
- Real database URLs must never be committed, printed, inspected, or exposed.

## Hosting Provider Setup Notes

These notes are provider-neutral and Vercel-friendly.

- Add environment values in the hosting provider dashboard.
- Set variables for the correct environment, such as Preview and Production.
- Redeploy after changing environment values.
- Keep demo database credentials separate from local or development credentials
  where possible.
- Do not paste secrets into source code, documentation, commit messages,
  screenshots, or demo materials.
- Confirm the deployed runtime can reach the configured database before using
  the deployment for a demo.
- Avoid adding variables for unsupported features such as Auth, Live AI,
  Billing, Supabase Client, RLS, Realtime, Invites, or API routes.

## Pre-Deploy Environment Checklist

- [ ] Required environment variables are configured in the hosting provider
      dashboard.
- [ ] `DATABASE_URL` is configured with a real value in the hosting provider,
      not in committed files.
- [ ] `DIRECT_URL` is configured with a real value in the hosting provider, not
      in committed files.
- [ ] No real secrets are committed.
- [ ] `.env` files are ignored and not exposed.
- [ ] Demo database is reachable from the deployment environment.
- [ ] Demo data is prepared for BrightAds Agency.
- [ ] Unsupported feature environment variables are not added unless the feature
      is implemented.
- [ ] Build, route checks, and database connectivity are verified in a later
      deployment phase.

## B2 Conclusion

FlowDesk AI now has a documented environment safety baseline for demo and
portfolio deployment.

This B2 document does not confirm build success, database connectivity,
deployment success, or production readiness. It documents safe environment
handling only.

The project is ready to proceed to B3 Build & Vercel Deployment Setup Plan,
where build verification and deployment setup steps should be planned without
exposing secrets or expanding unsupported MVP scope.
