import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { ReportCard } from "@/components/ReportCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STATUSES, statusLabel, updateStatus, useReports, type ReportStatus } from "@/lib/reports";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin View — CivicTrack" },
      { name: "description", content: "Update the status of reported civic issues." },
      { property: "og:title", content: "Admin View — CivicTrack" },
      { property: "og:description", content: "Update the status of reported civic issues." },
    ],
  }),
  component: Admin,
});

function Admin() {
  const reports = useReports();
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-navy md:text-3xl">Admin View</h1>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">Change a report's status — the dashboard updates instantly.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <ReportCard
            key={r.id}
            report={r}
            footer={
              <Select
                value={r.status}
                onValueChange={(v) => {
                  updateStatus(r.id, v as ReportStatus);
                  toast.success(`Marked as ${statusLabel(v as ReportStatus)}`);
                }}
              >
                <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                </SelectContent>
              </Select>
            }
          />
        ))}
      </div>
    </div>
  );
}
