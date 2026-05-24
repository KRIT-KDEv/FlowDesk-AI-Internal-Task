import Link from "next/link";
import type { AiSummary } from "@/types";

type AiSummaryPreviewProps = {
  summaries: AiSummary[];
};

export function AiSummaryPreview({ summaries }: AiSummaryPreviewProps) {
  const dailySummary =
    summaries.find((summary) => summary.title === "AI Daily Summary") ??
    summaries[0];

  return (
    <section className="rounded-lg border border-border bg-panel p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-accent">Mock AI summary</p>
          <h2 className="mt-1 text-base font-semibold">Today focus</h2>
        </div>
        <Link href="/ai-summary" className="text-sm font-medium text-accent">
          Open
        </Link>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">{dailySummary?.body}</p>
      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        {summaries.slice(1, 4).map((summary) => (
          <div
            key={summary.title}
            className="rounded-md border border-border bg-background px-3 py-3"
          >
            <p className="text-xs font-medium text-muted">{summary.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
