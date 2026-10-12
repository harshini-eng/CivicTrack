import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

const linkCls =
  "rounded px-2.5 py-1.5 text-sm font-medium text-navy-foreground/80 transition-colors hover:bg-navy-foreground/10 hover:text-navy-foreground sm:px-3";
const activeCls = "bg-navy-foreground/15 text-navy-foreground";

export function SiteHeader() {
  return (
    <header className="border-b-4 border-accent bg-navy text-navy-foreground">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded bg-accent text-accent-foreground">
            <MapPin className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">CivicTrack</span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link to="/" className={linkCls} activeProps={{ className: activeCls }} activeOptions={{ exact: true }}>
            Report
          </Link>
          <Link to="/reports" className={linkCls} activeProps={{ className: activeCls }}>
            Dashboard
          </Link>
          <Link to="/admin" className={linkCls} activeProps={{ className: activeCls }}>
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
