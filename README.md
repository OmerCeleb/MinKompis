# MinKompis

A service marketplace concept for Sweden, designed around the language barrier rather than around the transaction.

> **Status:** frontend prototype, paused. The UI and data model are built; the backend is not implemented — the app currently runs on mock data. See [Project status](#project-status).

## The idea

Sweden has service marketplaces. What it doesn't have is one built for people who don't yet speak Swedish.

A newly arrived electrician, cleaner or mover often has the skills but not the language to win work through existing platforms. On the other side, immigrant customers frequently look for someone they can explain the job to in their own language — and end up relying on informal Facebook groups instead.

MinKompis was an attempt at the obvious missing piece: let both sides use the platform in their own language, and match on language as a first-class attribute alongside service type, location and availability.

## What's built

A 20-page Next.js frontend covering both sides of the marketplace:

**Customer side** — browse services, view provider profiles, request bookings, message providers, leave reviews, manage favourites and settings.

**Provider side** — a separate dashboard for managing service listings, availability, incoming bookings, messages and reviews.

**Localisation** — full UI in English, Swedish and Turkish via `next-intl`, with locale-prefixed routing (`/en`, `/sv`, `/tr`) handled in middleware. Adding a language means adding one message file, not touching components.

## Data model

The Prisma schema models the full domain even though it isn't wired up yet:

```
User (role: CUSTOMER | PROVIDER)
├── ProviderProfile ──┬── Service ── Category
│                     └── Availability
└── CustomerProfile

Booking ── Payment ── Review
Message
```

Designing this before writing the backend was deliberate: booking state, payment state and service state each needed their own lifecycle, and getting those enums wrong is expensive to unpick later.

## Tech stack

| | |
|---|---|
| Framework | Next.js 14 (App Router), React 18 |
| Language | TypeScript |
| Styling | Tailwind CSS, `class-variance-authority` |
| i18n | `next-intl` (EN / SV / TR) |
| Validation | Zod |
| Data model | Prisma + PostgreSQL (schema only) |
| Icons | Lucide |

## Project status

Development stopped when I took on a full-time frontend role. What exists:

- ✅ Frontend for both customer and provider flows
- ✅ Three-language i18n with locale routing
- ✅ Prisma schema for the full domain
- ✅ Zod validation schemas
- ❌ API layer — no route handlers yet
- ❌ Prisma client not connected; components read from `src/lib/mockData.ts`
- ❌ Authentication is UI-only
- ❌ No deployment

I'm keeping it public as a portfolio piece rather than as a working product.

## Running locally

```bash
npm install
npm run dev
```

Runs on mock data — no database or environment variables needed.

## What I'd do differently

- Wire Prisma up early instead of building against mock data; the schema and the UI drifted apart in places.
- Language matching deserved its own model rather than a field on the provider profile — a provider serving three languages at different fluency levels doesn't fit a single column.
