# ApplyFlow Web

![Build](https://github.com/AdemFurkanATA/applyflow_web/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)

Modern job application tracker frontend built with React, TypeScript, and shadcn/ui.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 6 |
| Language | TypeScript 5.7 (strict) |
| Styling | Tailwind CSS 3.4 + shadcn/ui |
| State (Client) | Zustand (persisted) |
| State (Server) | TanStack React Query |
| Routing | React Router DOM 7 |
| Forms | React Hook Form + Zod |
| API Client | Axios (JWT interceptor) |
| Icons | Lucide React |
| Toasts | Sonner |

## Features

- **Authentication** — Login, Register with Zod validation and JWT token management
- **Auto Refresh** — Axios interceptor with multi-request 401 queue and automatic token refresh
- **Protected Routing** — Route guards with `ProtectedRoute` and `GuestRoute` wrappers
- **Dark/Light Mode** — Theme toggle persisted to localStorage with FOUC prevention
- **Dashboard** — Stats cards with responsive grid (1→2→3→4 columns) and empty state
- **Job Management** — Full CRUD with table, status badges, create/edit modals, delete confirmation, pagination
- **Collapsible Sidebar** — Tooltip on collapse, active route highlighting, logout action
- **Global UX** — Error boundary, loading spinner, skeleton loaders, error normalization
- **CI Pipeline** — GitHub Actions (type check, lint, build, artifact upload)

## Project Structure

```
src/
├── components/
│   ├── auth/           # ProtectedRoute, GuestRoute
│   ├── forms/          # JobApplicationForm
│   ├── layout/         # Sidebar, Header, DashboardLayout
│   └── ui/             # shadcn/ui components (13 components)
├── hooks/              # useJobs (React Query hooks)
├── lib/
│   ├── api.ts          # Axios + JWT refresh interceptor
│   ├── auth-service.ts # Auth API calls
│   ├── job-service.ts  # Job CRUD API calls
│   ├── error-utils.ts  # Global error normalizer
│   ├── validations.ts  # Zod schemas
│   └── utils.ts        # cn() helper
├── pages/              # Login, Register, Dashboard, Applications
├── stores/
│   ├── auth-store.ts   # Auth state (Zustand + persist)
│   └── ui-store.ts     # Theme + sidebar state
├── types/              # TypeScript types mirroring backend DTOs
├── App.tsx             # Router + layout composition
├── main.tsx            # React Query provider + entry
└── index.css           # Tailwind + HSL color tokens
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 9+
- [ApplyFlow Backend](https://github.com/AdemFurkanATA/ApplyFlow) running on port 8080

### Installation

```bash
git clone https://github.com/AdemFurkanATA/applyflow_web.git
cd applyflow_web
npm install
```

### Development

```bash
cp .env.example .env
npm run dev
```

App runs at `http://localhost:3000`. API requests are proxied to `http://localhost:8080/api`.

### Build

```bash
npm run build
npm run preview
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `/api` (proxied in dev) |

## API Proxy

In development, Vite proxies `/api` requests to the backend:

```
http://localhost:3000/api/* → http://localhost:8080/api/*
```

This avoids CORS issues without backend configuration.

## Design System

- **Colors**: HSL CSS variables with dark/light mode support
- **Radius**: `--radius: 1rem` — Cards 2xl, Buttons xl, Inputs lg
- **Spacing**: 8px grid system
- **Typography**: Inter font family
- **Animations**: `tailwindcss-animate` for shadcn transitions

## shadcn/ui Components

Button, Card, Dialog, DropdownMenu, Tooltip, Skeleton, Table, Label, Input, Spinner, StatusBadge, ErrorBoundary

## Backend Integration

This frontend is designed to work with the [ApplyFlow Backend](https://github.com/AdemFurkanATA/ApplyFlow):

| Endpoint | Description |
|----------|-------------|
| `POST /api/auth/login` | User login |
| `POST /api/auth/register` | User registration |
| `POST /api/auth/refresh` | Token refresh |
| `GET /api/applications` | List applications (paginated) |
| `POST /api/applications` | Create application |
| `PUT /api/applications/:id` | Update application |
| `DELETE /api/applications/:id` | Delete application |

## Deployment

### Vercel

```bash
# vercel.json is pre-configured
vercel deploy
```

### Manual

```bash
npm run build
# Serve the dist/ folder with any static file server
```

## License

MIT
