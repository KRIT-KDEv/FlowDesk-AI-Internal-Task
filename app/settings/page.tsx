import { getWorkspaceSettingsData } from "@/lib/settings-data";

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatDate(date: Date) {
  return dateFormatter.format(date);
}

export default async function SettingsPage() {
  const settingsData = await getWorkspaceSettingsData();

  if (!settingsData) {
    return (
      <main className="space-y-6">
        <section>
          <p className="text-sm font-medium text-accent">Workspace settings</p>
          <h1 className="text-3xl font-semibold">Settings</h1>
          <p className="mt-2 text-muted">
            Read-only MVP status for the BrightAds Agency workspace.
          </p>
        </section>

        <section className="rounded-lg border border-border bg-panel p-6">
          <h2 className="font-semibold">Workspace not found.</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            BrightAds Agency could not be found in the database. Workspace
            settings remain read-only, and no editable settings are available
            in this MVP view.
          </p>
        </section>
      </main>
    );
  }

  const { counts, mvpStatus, workspace } = settingsData;

  const countCards = [
    { label: "Members", value: counts.memberCount },
    { label: "Tasks", value: counts.taskCount },
    { label: "AI summaries", value: counts.aiSummaryCount },
    { label: "Overdue tasks", value: counts.overdueTaskCount },
  ];

  const statusCards = [
    { label: "Database", value: mvpStatus.database },
    { label: "Auth", value: mvpStatus.auth },
    { label: "Permissions", value: mvpStatus.permissions },
    { label: "Billing", value: mvpStatus.billing },
    { label: "Live AI", value: mvpStatus.liveAI },
    { label: "Delete task", value: mvpStatus.deleteTask },
  ];

  return (
    <main className="space-y-6">
      <section>
        <p className="text-sm font-medium text-accent">Workspace settings</p>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="mt-2 text-muted">
          Read-only Prisma-backed workspace snapshot for BrightAds Agency.
          Billing, permissions, live AI, and delete task controls remain out of
          scope for this MVP.
        </p>
      </section>

      <section className="rounded-lg border border-border bg-panel p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted">Workspace</p>
            <h2 className="mt-1 text-xl font-semibold">{workspace.name}</h2>
          </div>
          <span className="w-fit rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted">
            {workspace.slug}
          </span>
        </div>

        <dl className="mt-5 grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted">Created</dt>
            <dd className="mt-1 text-sm font-medium">
              {formatDate(workspace.createdAt)}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Last updated</dt>
            <dd className="mt-1 text-sm font-medium">
              {formatDate(workspace.updatedAt)}
            </dd>
          </div>
        </dl>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {countCards.map((card) => (
          <article
            key={card.label}
            className="rounded-lg border border-border bg-panel p-4"
          >
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold">{card.value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-border bg-panel p-4">
        <div>
          <h2 className="font-semibold">MVP status</h2>
          <p className="mt-1 text-sm text-muted">
            Current product boundaries for the FlowDesk AI Dashboard demo.
          </p>
        </div>

        <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {statusCards.map((status) => (
            <div
              key={status.label}
              className="rounded-md border border-border bg-background px-3 py-3"
            >
              <dt className="text-xs font-medium text-muted">{status.label}</dt>
              <dd className="mt-1 text-sm font-semibold">{status.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
