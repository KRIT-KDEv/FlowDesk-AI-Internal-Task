import { getTeamPageData } from "@/lib/team-data";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const { members } = await getTeamPageData();

  return (
    <main className="space-y-6">
      <section>
        <p className="text-sm font-medium text-accent">Team workload</p>
        <h1 className="text-3xl font-semibold">Team</h1>
        <p className="mt-2 text-muted">
          Read-only workload view for BrightAds Agency members and assigned
          task counts.
        </p>
      </section>

      {members.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2">
          {members.map((member) => (
            <article
              key={member.id}
              className="rounded-lg border border-border bg-panel p-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="font-semibold">{member.user.name}</h2>
                  <p className="mt-1 text-sm text-muted">
                    {member.user.email}
                  </p>
                </div>
                <span className="w-fit rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted">
                  {member.roleLabel}
                </span>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-4 text-sm">
                <div>
                  <dt className="text-muted">Assigned</dt>
                  <dd className="mt-1 text-xl font-semibold">
                    {member.assignedTaskCount}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">In progress</dt>
                  <dd className="mt-1 text-xl font-semibold">
                    {member.inProgressTaskCount}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Overdue</dt>
                  <dd className="mt-1 text-xl font-semibold">
                    {member.overdueTaskCount}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Completed</dt>
                  <dd className="mt-1 text-xl font-semibold">
                    {member.completedTaskCount}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </section>
      ) : (
        <section className="rounded-lg border border-border bg-panel p-6">
          <h2 className="font-semibold">No team members found.</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            BrightAds Agency workspace members will appear here after they
            exist in the database. Invites and role management are not enabled
            in this MVP view.
          </p>
        </section>
      )}
    </main>
  );
}
