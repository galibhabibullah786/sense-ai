<p align="center">
  <img src="https://img.shields.io/badge/SenseAI-Frontend-0d9488?style=for-the-badge" alt="SenseAI Frontend" />
  <img src="https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
</p>

# SenseAI — Web Dashboard

The **SenseAI** web dashboard is a React single-page application that provides a full management interface for the SenseAI website trust-analysis platform. Users can view trust scores, browse analysis sessions, generate reports, manage whitelists, and link the browser extension — all in a polished, responsive UI.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Theming](#theming)
- [Deployment](#deployment)
- [License](#license)

---

## Features

- **Landing Page** — Animated hero, feature grid, how-it-works stepper, reviews, and WhatsApp contact button. Supports deep-link scrolling from other pages (e.g. extension page → landing section).
- **Authentication** — Register / login with JWT, automatic token refresh, "Remember me" option.
- **Adaptive Navbar** — Shows "Dashboard" link when logged in, "Get Started" for guests.
- **Dashboard** — Aggregated stats, verdict breakdown pie chart, recent sessions, top risky domains.
- **Sessions** — Paginated, filterable, sortable session list with full detail view (signal breakdown + AI explanation).
- **Analytics** — Time-series charts (7d / 30d / 90d) for score trends and verdict distribution.
- **Reports** — Generate and download PDF/CSV compliance, summary, and detailed reports.
- **Whitelist** — Manage per-user trusted domains.
- **Settings** — Profile, password change, device management (with current-session indicator), account deletion.
- **Extension Linking** — Generate and display a link code for the browser extension.
- **Extension Download** — Public page with step-by-step installation carousel and feature overview.
- **Colorful Toasts** — Context-aware toast notifications (green success, red error, amber warning, blue info).
- **Dark / Light Mode** — System-aware theme with manual toggle.
- **Fully Responsive** — Mobile-first layout with sidebar navigation.

---

## Tech Stack

| Category | Technology |
| --- | --- |
| Build Tool | Vite 5 |
| Framework | React 18.3 |
| Language | TypeScript 5.6 |
| Routing | React Router 6 |
| Data Fetching | TanStack React Query 5 |
| Forms | react-hook-form + Zod |
| Styling | Tailwind CSS 3.4 + shadcn/ui |
| Animations | Framer Motion |
| Charts | Recharts |
| HTTP | Axios |
| Real-time | Socket.io Client |
| Toasts | Sonner |
| Icons | Lucide React |
| Date | date-fns |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** (recommended)

### Installation

```bash
cd sense-ai
pnpm install
```

### Development

```bash
pnpm run dev
```

Opens at `http://localhost:8080` by default (configured in `vite.config.ts`).

### Build

```bash
pnpm run build
```

Output is written to `dist/`. Preview with:

```bash
pnpm run preview
```

### Testing

```bash
pnpm run test
```

---

## Project Structure

```
sense-ai/
├── public/                  # Static assets (robots.txt, favicons)
├── src/
│   ├── main.tsx             # React entry point
│   ├── App.tsx              # Route definitions
│   ├── index.css            # Tailwind + CSS custom properties (theme)
│   ├── components/
│   │   ├── landing/         # Landing page sections (Hero, About, HowItWorks, Reviews, Contact, Footer, Navbar)
│   │   ├── layout/          # DashboardLayout, ProtectedRoute
│   │   ├── shared/          # Reusable components (EmptyState, LoadingSpinner, StatCard, TrustScoreBadge, TrustScoreGauge, VerdictBadge)
│   │   └── ui/              # shadcn/ui primitives (Button, Card, Dialog, etc.)
│   ├── contexts/            # AuthContext, ThemeContext
│   ├── data/                # Mock/seed data
│   ├── hooks/               # Custom hooks (use-mobile, use-toast)
│   ├── lib/                 # Utility functions
│   ├── pages/               # Route page components
│   └── test/                # Vitest setup + tests
├── components.json          # shadcn/ui configuration
├── tailwind.config.ts
├── vite.config.ts
├── vitest.config.ts
├── tsconfig.json
└── package.json
```

---

## Pages & Routes

| Route | Page | Auth | Description |
| --- | --- | --- | --- |
| `/` | Landing | Public | Marketing / landing page |
| `/login` | Login | Public | User authentication |
| `/register` | Register | Public | Account creation |
| `/get-extension` | GetExtension | Public | Extension download + installation tutorial |
| `/privacy-and-policy` | PrivacyPolicy | Public | Privacy policy |
| `/terms-and-condition` | TermsAndCondition | Public | Terms & conditions |
| `/terms-of-use` | TermsOfUse | Public | Terms of use |
| `/dashboard` | Dashboard | Protected | Overview stats & charts |
| `/sessions` | Sessions | Protected | Session list (paginated, filterable) |
| `/sessions/:id` | SessionDetail | Protected | Full session analysis detail |
| `/analytics` | Analytics | Protected | Time-series analytics charts |
| `/reports` | Reports | Protected | Generate & download reports |
| `/settings` | Settings | Protected | Profile, password, devices, account |
| `/link-extension` | LinkExtension | Protected | Extension link code generator |

---

## Theming

The app uses CSS custom properties for theming, defined in `src/index.css`.

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `--primary` | `173 80% 40%` | `173 80% 40%` | Teal brand color |
| `--trust-safe` | `152 76% 40%` | `152 76% 36%` | Safe verdict green |
| `--trust-warning` | `38 92% 50%` | `38 92% 50%` | Warning verdict orange |
| `--trust-danger` | `0 84% 60%` | `0 84% 55%` | Danger verdict red |

Toggle between light and dark mode via `ThemeContext` (system-aware with manual override).

---

## Real-Time Updates via Socket.io

The dashboard now connects to the backend via Socket.io for instant updates:
- **Extension link/unlink** — device list updates instantly when extension is linked or unlinked (no more 10-second polling)
- **New analyses** — dashboard, sessions, and analytics refresh automatically when the extension completes a new analysis
- The socket connection is managed by the `useSocket` hook and only active when authenticated
- **Auth isolation** — unlinking the extension does NOT affect the frontend's authentication state

---

## Theme Customization

The theme system uses CSS custom properties at multiple levels:

### Global tokens
Standard Tailwind-compatible tokens like `--background`, `--foreground`, `--primary`, etc.

### Component-level tokens
Fine-grained tokens for customizing specific parts of the UI:

| Token | Component | Description |
|-------|-----------|-------------|
| `--stat-card-bg` | Dashboard stat cards | Background color |
| `--stat-card-icon` | Dashboard stat cards | Icon color |
| `--gauge-track` | Trust score gauge | Track background |
| `--gauge-text` | Trust score gauge | Score text color |
| `--session-item-bg` | Session list items | Background color |
| `--session-item-hover` | Session list items | Hover background |
| `--report-card-bg` | Report cards | Background color |
| `--report-icon-bg` | Report cards | Icon background |
| `--settings-section-bg` | Settings sections | Section background |
| `--nav-item-active-bg` | Sidebar nav | Active item background |
| `--nav-item-hover-bg` | Sidebar nav | Hover background |
| `--header-bg` | Top header | Background color |
| `--badge-safe-bg` | Trust badges | Safe verdict color |
| `--badge-warning-bg` | Trust badges | Warning verdict color |
| `--badge-danger-bg` | Trust badges | Danger verdict color |

To customize a specific component in dark mode, override its token in the `.dark` class in `src/index.css`:

```css
.dark {
  /* Make sidebar darker in dark mode */
  --sidebar-background: 220 30% 5%;
  
  /* Custom stat card styling */
  --stat-card-bg: 220 25% 12%;
  --stat-card-icon: 173 80% 50%;
}
```

---

## Deployment

Build the project and deploy the `dist/` folder to any static hosting provider:

```bash
pnpm run build
```

Popular options: **Vercel**, **Netlify**, **Cloudflare Pages**, **AWS S3 + CloudFront**.

> **Note:** Since this is an SPA, configure your hosting to redirect all routes to `index.html` (Vite's default `base` is `/`).

---

## License

Private — Part of the SenseAI project.
