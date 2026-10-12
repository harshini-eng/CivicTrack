import { useSyncExternalStore } from "react";

export type ReportStatus = "reported" | "in_progress" | "resolved";
export type ReportCategory = "pothole" | "garbage" | "streetlight" | "water" | "other";

export type Report = {
  id: string;
  category: ReportCategory;
  description: string;
  location: string;
  photo: string | null; // data URL
  status: ReportStatus;
  createdAt: string;
};

export const CATEGORIES: { value: ReportCategory; label: string }[] = [
  { value: "pothole", label: "Pothole" },
  { value: "garbage", label: "Garbage" },
  { value: "streetlight", label: "Streetlight" },
  { value: "water", label: "Water Leakage" },
  { value: "other", label: "Other" },
];

export const STATUSES: { value: ReportStatus; label: string }[] = [
  { value: "reported", label: "Reported" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
];

export const categoryLabel = (c: ReportCategory) => CATEGORIES.find((x) => x.value === c)?.label ?? c;
export const statusLabel = (s: ReportStatus) => STATUSES.find((x) => x.value === s)?.label ?? s;

const KEY = "civictrack-reports";
const SEED: Report[] = [
  { id: "s1", category: "pothole", description: "Deep pothole near the bus stop, dangerous for two-wheelers.", location: "MG Road, Sector 4", photo: null, status: "reported", createdAt: "2026-10-10T09:00:00Z" },
  { id: "s2", category: "streetlight", description: "Streetlight not working for a week.", location: "Lake View Colony", photo: null, status: "in_progress", createdAt: "2026-10-09T18:30:00Z" },
  { id: "s3", category: "garbage", description: "Garbage bins overflowing, not collected.", location: "Market Street", photo: null, status: "resolved", createdAt: "2026-10-08T07:15:00Z" },
];

let reports: Report[] | null = null;
const listeners = new Set<() => void>();
const EMPTY: Report[] = [];

function load(): Report[] {
  if (reports) return reports;
  try {
    const raw = localStorage.getItem(KEY);
    reports = raw ? (JSON.parse(raw) as Report[]) : SEED;
  } catch {
    reports = SEED;
  }
  return reports;
}

function save(next: Report[]) {
  reports = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // storage full (large photos) — keep in memory only
  }
  listeners.forEach((l) => l());
}

export function addReport(input: Omit<Report, "id" | "status" | "createdAt">) {
  save([{ ...input, id: crypto.randomUUID(), status: "reported", createdAt: new Date().toISOString() }, ...load()]);
}

export function updateStatus(id: string, status: ReportStatus) {
  save(load().map((r) => (r.id === id ? { ...r, status } : r)));
}

export function useReports(): Report[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      const onStorage = (e: StorageEvent) => {
        if (e.key === KEY) {
          reports = null;
          cb();
        }
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(cb);
        window.removeEventListener("storage", onStorage);
      };
    },
    load,
    () => EMPTY,
  );
}
