import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-6">
      <section className="rounded-lg border border-border bg-panel p-6">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          FlowDesk AI Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-foreground">
          BrightAds Agency workspace
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Day 2 placeholder shell for the internal task and workflow dashboard.
          Use the dashboard routes to review the MVP structure before Day 3
          layout work.
        </p>
        <Link
          href="/dashboard"
          className="mt-5 inline-flex rounded-md bg-accent px-4 py-2 text-sm font-medium text-white"
        >
          Open dashboard
        </Link>
      </section>
    </main>
  );
}
