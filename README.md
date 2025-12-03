# Snapp Shop

A modern e-commerce product catalog built with Next.js 16, featuring server-side rendering, static generation, and client-side state management.

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

This generates an optimized production build with static pages.

## Project Structure

```
snapp-shop/
├── app/                    # Next.js App Router
│   ├── api/                # API routes (mock data endpoints)
│   ├── products/           # Dynamic product pages
│   ├── layout.tsx         # Root layout with header
│   └── page.tsx           # Home page (product listing)
├── lib/
│   ├── api/               # API client (ky-based)
│   ├── components/        # React components
│   │   ├── layout/        # Layout components
│   │   └── ui/            # Reusable UI components
│   ├── const/             # Constants and content
│   ├── hook/              # Custom React hooks
│   ├── store/             # Zustand state management
│   └── util/              # Utility functions
└── public/                # Static assets
```

## Data Fetching Strategy

This project uses a **hybrid approach** combining Static Site Generation (SSG) with Incremental Static Regeneration (ISR) and client-side state management:

### Server-Side Rendering (SSG + ISR)

**Home Page** (`app/page.tsx`):

- **Method**: Server Component with async data fetching
- **Strategy**: Static Site Generation (SSG)
- **Rationale**: Product listings are relatively static and benefit from pre-rendering for SEO and performance

**Product Pages** (`app/products/[productId]/page.tsx`):

- **Method**: Server Component with `generateStaticParams` + ISR
- **Strategy**: Static generation with Incremental Static Regeneration
- **Revalidation**: 30 minutes (`revalidate: 60 * 30`)
- **Rationale**:
  - Pre-generates all product pages at build time for optimal performance
  - ISR ensures content stays fresh without full rebuilds
  - Balances performance (SSG) with freshness (ISR)

### Client-Side State Management

**Shopping Cart**:

- **Method**: Zustand store with full product objects
- **Strategy**: Client-side state (no API calls)
- **Rationale**:
  - Cart state is ephemeral and user-specific
  - Storing full product objects eliminates redundant API calls
  - Provides instant UI updates without server round-trips

### Why Not Pure SSR?

- **Performance**: SSG provides better initial load times and reduces server load
- **SEO**: Pre-rendered content is fully indexable
- **Cost**: Static pages can be served from CDN, reducing hosting costs
- **User Experience**: Instant page loads with ISR keeping content fresh

## Key Features

- **Server Components**: Pages are server-rendered by default for optimal performance
- **Client Components**: Interactive features (cart, modals) use client-side rendering
- **State Management**: Zustand for lightweight, performant cart state
- **Type Safety**: Full TypeScript coverage
- **Styling**: Tailwind CSS with custom utilities
- **RTL Support**: Right-to-left layout for Persian/Farsi content

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Ky
- **UI Components**: Headless UI, Lucide Icons

## Notes

- API routes serve mock data from `lib/const/mock-data.ts`
- Cart state persists during session but clears on page refresh
- Product images use Next.js Image component with optimization
- All text content is externalized in `lib/const/content.const.ts` for easy localization
