import { createFileRoute, Link } from "@tanstack/react-router";
import { ReportCard } from "@/components/ReportCard";
import { Button } from "@/components/ui/button";
import { useReports } from "@/lib/reports";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports Dashboard — CivicTrack" },
      { name: "description", content: "All civic issues reported by residents and their current status." },
      { property: "og:title", content: "Reports Dashboard — CivicTrack" },
      { property: "og:description", content: "See every reported civic issue and its status." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const reports = useReports();
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy md:text-3xl">Reports Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">{reports.length} reports submitted</p>
        </div>
        <Button asChild variant="cta"><Link to="/">New Report</Link></Button>
      </div>
      {reports.length === 0 ? (
        <p className="rounded-lg border bg-card p-6 text-center text-sm text-muted-foreground">No reports yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((r) => <ReportCard key={r.id} report={r} />)}
        </div>
      )}
    </div>
  );
}
