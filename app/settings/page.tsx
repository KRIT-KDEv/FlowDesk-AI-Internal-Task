import { demoMembers, demoWorkspace } from "@/lib/mock-data";

export default function SettingsPage() {
  return (
    <main className="space-y-6">
      <section>
        <p className="text-sm font-medium text-accent">Workspace settings</p>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="mt-2 text-muted">
          Workspace settings preview for BrightAds Agency. Billing and advanced
          permissions remain out of scope for this MVP.
        </p>
      </section>

      <section className="rounded-lg border border-border bg-panel p-4">
        <h2 className="font-semibold">{demoWorkspace.name}</h2>
        <p className="mt-2 text-sm text-muted">{demoWorkspace.description}</p>
        <div className="mt-4">
          <p className="text-sm font-medium">Demo members</p>
          <ul className="mt-2 list-inside list-disc text-sm text-muted">
            {demoMembers.map((member) => (
              <li key={member.id}>
                {member.name} - {member.role}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
