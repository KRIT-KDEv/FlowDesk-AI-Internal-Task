import { AiSummaryPreview } from "@/components/dashboard/ai-summary-preview";
import { MetricCard } from "@/components/dashboard/metric-card";
import { OverdueTasks } from "@/components/dashboard/overdue-tasks";
import { RecentTasks } from "@/components/dashboard/recent-tasks";
import {
  DEMO_TODAY,
  aiSummaries,
  demoMembers,
  demoTasks,
  demoWorkspace
} from "@/lib/mock-data";

export default function DashboardPage() {
  const overdueTasks = demoTasks.filter((task) => task.isOverdue);
  const inProgressTasks = demoTasks.filter(
    (task) => task.status === "IN_PROGRESS"
  );
  const dueTodayTasks = demoTasks.filter((task) => task.dueDate === DEMO_TODAY);
  const completedThisWeekTasks = demoTasks.filter(
    (task) => task.status === "DONE"
  );
  const recentTasks = [...demoTasks]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 5);
  const highestRiskOverdue = overdueTasks.filter(
    (task) => task.priority === "HIGH" || task.priority === "URGENT"
  ).length;

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
          value={demoTasks.length}
          caption={`${demoMembers.length} demo team members assigned`}
          tone="accent"
        />
        <MetricCard
          title="In progress"
          value={inProgressTasks.length}
          caption="Active work moving through the team"
          tone="neutral"
        />
        <MetricCard
          title="Due today"
          value={dueTodayTasks.length}
          caption="Needs status clarity before end of day"
          tone="warning"
        />
        <MetricCard
          title="Overdue"
          value={overdueTasks.length}
          caption={`${highestRiskOverdue} high-risk overdue items`}
          tone="danger"
        />
        <MetricCard
          title="Completed this week"
          value={completedThisWeekTasks.length}
          caption="Finished work in the demo dataset"
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
