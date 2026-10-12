import { cn } from "@/lib/utils";
import { statusLabel, type ReportStatus } from "@/lib/reports";

const styles: Record<ReportStatus, string> = {
  reported: "bg-status-reported-bg text-status-reported",
  in_progress: "bg-status-progress-bg text-status-progress",
  resolved: "bg-status-resolved-bg text-status-resolved",
};
const dots: Record<ReportStatus, string> = {
  reported: "bg-status-reported",
  in_progress: "bg-status-progress",
  resolved: "bg-status-resolved",
};

export function StatusBadge({ status, className }: { status: ReportStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        styles[status],
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dots[status])} />
      {statusLabel(status)}
    </span>
  );
}
