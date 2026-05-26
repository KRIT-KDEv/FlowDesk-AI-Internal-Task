import Link from "next/link";
import type { getLatestAISummary } from "@/lib/dashboard-data";

type AiSummaryPreviewProps = {
  summary: Awaited<ReturnType<typeof getLatestAISummary>>;
};

type AISummaryType = NonNullable<AiSummaryPreviewProps["summary"]>["type"];

const summaryTypeLabels: Record<AISummaryType, string> = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  OVERDUE: "Overdue",
  PRIORITY: "Priority",
  CLIENT_UPDATE: "Client Update"
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric"
});

function getContentPreview(content: string) {
  return content.length > 280 ? `${content.slice(0, 277)}...` : content;
}

function formatCreatedDate(date: Date) {
  return dateFormatter.format(date);
}

export function AiSummaryPreview({ summary }: AiSummaryPreviewProps) {
  return (
    <section className="rounded-lg border border-border bg-panel p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-accent">
            {summary ? `${summaryTypeLabels[summary.type]} AI summary` : "AI summary"}
          </p>
          <h2 className="mt-1 text-base font-semibold">
            {summary?.title ?? "Today focus"}
          </h2>
        </div>
        <Link href="/ai-summary" className="text-sm font-medium text-accent">
          Open
        </Link>
      </div>

      <p className="mt-4 text-sm leading-6 text-muted">
        {summary
          ? getContentPreview(summary.content)
          : "No AI summary generated yet"}
      </p>

      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        <div className="rounded-md border border-border bg-background px-3 py-3">
          <p className="text-xs font-medium text-muted">Type</p>
          <p className="mt-1 text-sm font-medium">
            {summary ? summaryTypeLabels[summary.type] : "-"}
          </p>
        </div>
        <div className="rounded-md border border-border bg-background px-3 py-3">
          <p className="text-xs font-medium text-muted">Created</p>
          <p className="mt-1 text-sm font-medium">
            {summary ? formatCreatedDate(summary.createdAt) : "-"}
          </p>
        </div>
        <div className="rounded-md border border-border bg-background px-3 py-3">
          <p className="text-xs font-medium text-muted">Source</p>
          <p className="mt-1 text-sm font-medium">Database summary</p>
        </div>
      </div>
    </section>
  );
}
