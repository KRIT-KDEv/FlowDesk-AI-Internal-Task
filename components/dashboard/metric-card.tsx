import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MetricTone = "neutral" | "accent" | "warning" | "danger" | "success";

type MetricCardProps = {
  title: string;
  value: string | number;
  caption: string;
  tone?: MetricTone;
  meta?: ReactNode;
};

const toneStyles: Record<MetricTone, string> = {
  neutral: "border-border",
  accent: "border-l-accent",
  warning: "border-l-warning",
  danger: "border-l-danger",
  success: "border-l-success"
};

export function MetricCard({
  title,
  value,
  caption,
  tone = "neutral",
  meta
}: MetricCardProps) {
  return (
    <article
      className={cn(
        "min-h-[132px] rounded-lg border border-l-4 bg-panel p-4 shadow-sm",
        toneStyles[tone]
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted">{title}</p>
        {meta ? <div className="text-xs text-muted">{meta}</div> : null}
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-normal text-foreground">
        {value}
      </p>
      <p className="mt-2 text-sm leading-5 text-muted">{caption}</p>
    </article>
  );
}
