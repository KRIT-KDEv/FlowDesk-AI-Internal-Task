import { aiSummaries } from "@/lib/mock-data";

export default function AiSummaryPage() {
  return (
    <main className="space-y-6">
      <section>
        <p className="text-sm font-medium text-accent">Mock AI output</p>
        <h1 className="text-3xl font-semibold">AI Summary</h1>
        <p className="mt-2 text-muted">
          Placeholder summaries are mocked from demo data. No AI API is wired
          today.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {aiSummaries.map((summary) => (
          <article
            key={summary.title}
            className="rounded-lg border border-border bg-panel p-4"
          >
            <h2 className="font-semibold">{summary.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{summary.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
