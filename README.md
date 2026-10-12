# CivicTrack 🏛️

CivicTrack is a civic issue reporting web application built for a college hackathon. Citizens can report local problems — potholes, garbage, broken streetlights, water leakage — and track their resolution status from a shared dashboard.

## Features

### 1. Report Form (home page)
- **Photo upload** with preview (accepts images up to 5 MB)
- **Category dropdown**: Pothole, Garbage, Streetlight, Water Leakage, Other
- **Short description** text field
- **Location field** — simple text input for area/locality name (no GPS required)
- **"Submit Report"** button with validation

### 2. Reports Dashboard
- Grid of all submitted reports as cards (photo, category, description, location, timestamp)
- Filter reports by category or status
- Color-coded status badges: **Reported** (yellow), **In Progress** (blue), **Resolved** (green)

### 3. Admin Panel (`/admin`)
- Open route (no login — intentional for the prototype)
- Change any report's status between Reported → In Progress → Resolved

### 4. Design
- Clean, professional government/civic look
- Primary color: deep blue `#16325C`, accent: orange `#F0862C`
- Location-pin logo in the header
- Mobile-responsive

## Technologies Used

- [TanStack Start](https://tanstack.com/start) — full-stack React framework (React 19, file-based routing, SSR)
- [TanStack Router](https://tanstack.com/router) — type-safe file-based routing
- TypeScript
- Tailwind CSS v4
- shadcn/ui-style components (Button, Input, Select, Label, Textarea)
- [sonner](https://sonner.emilkowal.ski/) for toast notifications
- [Vite](https://vite.dev/) build tool
- [Vitest](https://vitest.dev/) for routing tests

## How Data Is Stored

This is a hackathon prototype: reports are kept in an in-memory store persisted to the browser's `localStorage` (see `src/lib/reports.ts`), with photos stored as data URLs. There is intentionally no backend persistence and no login — data lives per browser/device, which is fine for a single-device demo. **Note:** very large photos can fill the browser's storage; keep photos small.

## Running the Project

Requires Node.js — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating) if needed.

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

Then open the local dev URL shown in the terminal.

- `/` — Report form (home page)
- `/reports` — Dashboard with all reports
- `/admin` — Admin panel to update report statuses

### Try it

1. Submit a report from the home page.
2. Change its status in the Admin panel.
3. Open the Dashboard to see the updated badge color.

## Project Structure

```
src/
├── components/        # SiteHeader, ReportCard, StatusBadge, UI components
├── lib/reports.ts     # Report store (localStorage-backed), categories, statuses
├── routes/            # File-based routes: index (report form), reports, admin
├── styles.css         # Tailwind theme + civic design tokens
└── test/              # Routing tests
```

## Scope

Deliberately minimal for the hackathon demo: no user login, no payments, no notifications, no live maps/GPS. Keep it to the four pieces above.
