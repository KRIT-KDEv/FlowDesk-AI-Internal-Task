import type { AISummaryListItem } from "@/lib/ai-summary-data";
import { getAISummaryPageData } from "@/lib/ai-summary-data";

export const dynamic = "force-dynamic";

const summaryTypeLabels: Record<AISummaryListItem["type"], string> = {
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

function formatDate(date: Date) {
  return dateFormatter.format(date);
}

function formatDateRange(fromDate: Date | null, toDate: Date | null) {
  if (fromDate && toDate) {
    return `${formatDate(fromDate)} - ${formatDate(toDate)}`;
  }

  if (fromDate) {
    return `From ${formatDate(fromDate)}`;
  }

  if (toDate) {
    return `Until ${formatDate(toDate)}`;
  }

  return "No date range";
}

function getDisplayText(value: string | null | undefined, fallback: string) {
  const text = value?.trim();

  return text ? text : fallback;
}

export default async function AiSummaryPage() {
  const { summaries } = await getAISummaryPageData();

  return (
    <main className="space-y-6">
      <section>
        <p className="text-sm font-medium text-accent">AI preview</p>
        <h1 className="text-3xl font-semibold">AI Summary</h1>
        <p className="mt-2 text-muted">
          Saved AI summary records from BrightAds Agency. Live AI generation is
          not connected yet.
        </p>
      </section>

      {summaries.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2">
          {summaries.map((summary) => (
            <article
              key={summary.id}
              className="rounded-lg border border-border bg-panel p-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-accent">
                    {summaryTypeLabels[summary.type]} AI summary
                  </p>
                  <h2 className="mt-1 font-semibold">
                    {getDisplayText(summary.title, "Untitled summary")}
                  </h2>
                </div>
                <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted">
                  {formatDate(summary.createdAt)}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-muted">
                {summary.content}
              </p>

              <div className="mt-4 grid gap-2 border-t border-border pt-4 text-xs text-muted sm:grid-cols-2">
                <div>
                  <p className="font-medium text-foreground">Date range</p>
                  <p className="mt-1">
                    {formatDateRange(summary.fromDate, summary.toDate)}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Created by</p>
                  <p className="mt-1">
                    {getDisplayText(summary.createdBy?.name, "Unknown creator")}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Workspace</p>
                  <p className="mt-1">{summary.workspace.name}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Updated</p>
                  <p className="mt-1">{formatDate(summary.updatedAt)}</p>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="rounded-lg border border-border bg-panel p-6">
          <h2 className="font-semibold">No AI summaries saved yet.</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Saved daily, weekly, overdue, or priority summaries will appear
            here after they exist in the database. Live AI generation is not
            connected yet.
          </p>
        </section>
      )}
    </main>
  );
}
