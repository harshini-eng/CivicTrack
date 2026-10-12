import type { ReactNode } from "react";
import { ImageOff, MapPin } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { categoryLabel, type Report } from "@/lib/reports";

export function ReportCard({ report, footer }: { report: Report; footer?: ReactNode }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm">
      {report.photo ? (
        <img src={report.photo} alt={categoryLabel(report.category)} className="h-44 w-full object-cover" />
      ) : (
        <div className="grid h-44 w-full place-items-center bg-muted text-muted-foreground">
          <ImageOff className="h-8 w-8" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-navy">{categoryLabel(report.category)}</h3>
          <StatusBadge status={report.status} />
        </div>
        <p className="text-sm text-foreground/80">{report.description}</p>
        <p className="mt-auto flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {report.location}
          <span className="ml-auto">{new Date(report.createdAt).toLocaleDateString()}</span>
        </p>
        {footer}
      </div>
    </article>
  );
}
