import { demoMembers, demoTasks } from "@/lib/mock-data";

export default function TeamPage() {
  return (
    <main className="space-y-6">
      <section>
        <p className="text-sm font-medium text-accent">Team workload</p>
        <h1 className="text-3xl font-semibold">Team</h1>
        <p className="mt-2 text-muted">
          Preview BrightAds Agency members and assigned task counts.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {demoMembers.map((member) => {
          const assignedTasks = demoTasks.filter(
            (task) => task.assigneeId === member.id
          );

          return (
            <article
              key={member.id}
              className="rounded-lg border border-border bg-panel p-4"
            >
              <h2 className="font-semibold">{member.name}</h2>
              <p className="text-sm text-muted">{member.role}</p>
              <p className="mt-4 text-sm">
                Assigned tasks:{" "}
                <span className="font-semibold">{assignedTasks.length}</span>
              </p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
