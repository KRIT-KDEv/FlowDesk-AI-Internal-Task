import { AiSummaryPreview } from "@/components/dashboard/ai-summary-preview";
import { MetricCard } from "@/components/dashboard/metric-card";
import { OverdueTasks } from "@/components/dashboard/overdue-tasks";
import { RecentTasks } from "@/components/dashboard/recent-tasks";
import { getDashboardMetrics } from "@/lib/dashboard-data";
import {
  DEMO_TODAY,
  aiSummaries,
  demoMembers,
  demoTasks,
  demoWorkspace
} from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics();
  const overdueTasks = demoTasks.filter((task) => task.isOverdue);
  const recentTasks = [...demoTasks]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 5);

  return (
    <main className="space-y-6">
      <section className="flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-accent">
            Dashboard overview
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
            {demoWorkspace.name}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
            Operational snapshot for content, design, ads, and client work.
            Built from mock data only for the Day 3 MVP layout pass.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-panel px-4 py-3 text-sm shadow-sm">
          <p className="text-xs font-medium uppercase text-muted">Demo date</p>
          <p className="mt-1 font-semibold">{DEMO_TODAY}</p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          title="Total tasks"
          value={metrics.totalTasks}
          caption="Tasks in the BrightAds Agency workspace"
          tone="accent"
        />
        <MetricCard
          title="In progress"
          value={metrics.inProgressTasks}
          caption="Active work moving through the team"
          tone="neutral"
        />
        <MetricCard
          title="Due today"
          value={metrics.dueTodayTasks}
          caption="Needs status clarity before end of day"
          tone="warning"
        />
        <MetricCard
          title="Overdue"
          value={metrics.overdueTasks}
          caption="Past due and still open"
          tone="danger"
        />
        <MetricCard
          title="Completed this week"
          value={metrics.completedThisWeek}
          caption="Done tasks updated this week"
          tone="success"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.75fr)]">
        <RecentTasks tasks={recentTasks} members={demoMembers} />
        <OverdueTasks tasks={overdueTasks.slice(0, 4)} members={demoMembers} />
      </section>

      <section>
        <AiSummaryPreview summaries={aiSummaries} />
      </section>
    </main>
  );
}
