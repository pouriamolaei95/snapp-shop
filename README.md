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

This project uses a **hybrid approach** combining Incremental Static Regeneration (ISR) with client-side state management:

### Server-Side Rendering (ISR)

**Home Page** (`app/page.tsx`):

- **Method**: Server Component with async data fetching
- **Strategy**: Incremental Static Regeneration (ISR)
- **Revalidation**: 30 minutes (`revalidate: 60 * 30`)
- **Rationale**:
  - Pre-renders product listings at build time for optimal initial load performance
  - ISR regenerates pages in the background after the revalidation period
  - Ensures product data stays fresh (prices, availability, new products) without full rebuilds
  - Balances performance (static serving) with content freshness (background regeneration)

**Product Pages** (`app/products/[productId]/page.tsx`):

- **Method**: Server Component with `generateStaticParams` + ISR
- **Strategy**: Incremental Static Regeneration (ISR)
- **Revalidation**: 30 minutes (`revalidate: 60 * 30`)
- **Rationale**:
  - Pre-generates all product pages at build time via `generateStaticParams` for optimal performance
  - ISR ensures individual product pages stay fresh without full rebuilds
  - 30-minute revalidation period is optimal for e-commerce: frequent enough to catch price changes and availability updates, but not so frequent as to cause unnecessary regeneration
  - Balances performance (SSG benefits) with freshness (ISR benefits)

### Why ISR Instead of Pure SSG?

**ISR is more rational than pure SSG for e-commerce because:**

- **Content Freshness**: Product data changes frequently (prices, availability, descriptions, new products). Pure SSG would require full rebuilds for any update, which is impractical for dynamic e-commerce content.
- **Performance**: ISR provides the same performance benefits as SSG (static pages served from CDN) while allowing background regeneration.
- **Scalability**: With ISR, pages are regenerated on-demand after the revalidation period, reducing build times and server load compared to full rebuilds.
- **User Experience**: Users get instant page loads (static serving) with reasonably fresh content (30-minute revalidation window).
- **Cost Efficiency**: Static pages can still be served from CDN, but regeneration happens incrementally rather than requiring full deployments.

**30-minute revalidation period rationale:**

- Frequent enough to capture price changes, stock updates, and new product additions
- Not so frequent as to cause excessive regeneration and server load
- Balances freshness requirements with performance and cost considerations
- Typical e-commerce sites update product data multiple times per day, making 30 minutes a reasonable refresh interval

### Client-Side State Management

**Shopping Cart**:

- **Method**: Zustand store with full product objects
- **Strategy**: Client-side state (no API calls)
- **Rationale**:
  - Cart state is ephemeral and user-specific
  - Storing full product objects eliminates redundant API calls
  - Provides instant UI updates without server round-trips

### Why ISR Instead of SSR?

**ISR is more rational than SSR for e-commerce product catalogs because:**

#### Performance Advantages

- **Initial Load Time**: ISR serves pre-rendered static pages from CDN (typically <50ms), while SSR requires server computation on every request (typically 200-500ms+). This directly impacts bounce rates and conversion.
- **Server Load**: ISR serves most requests from static cache, only regenerating in the background. SSR processes every request, requiring more server resources and higher infrastructure costs.
- **Scalability**: ISR scales effortlessly with CDN edge caching. SSR requires scaling server infrastructure to handle traffic spikes, which is more expensive and complex.

#### Cost Efficiency

- **CDN Serving**: ISR pages are served from CDN edge locations worldwide, reducing bandwidth costs and improving global performance.
- **Server Resources**: SSR requires continuous server computation, leading to higher hosting costs, especially during traffic spikes.
- **Infrastructure**: ISR can handle millions of requests with minimal server resources. SSR requires proportional server capacity to request volume.

#### Content Freshness Trade-offs

- **Real-time vs. Near-real-time**: SSR provides real-time data, but for e-commerce product catalogs, 30-minute freshness is typically sufficient. Product prices and availability don't change every second.
- **Stale-while-revalidate**: ISR uses stale-while-revalidate pattern - users get instant responses (stale content) while fresh content regenerates in the background. This provides the best of both worlds.
- **Acceptable Staleness**: For product listings and details, 30-minute staleness is acceptable. Critical real-time data (like checkout inventory) should be handled separately via API calls.

#### When SSR Would Be Better

SSR would be more appropriate if:

- **Real-time requirements**: Data changes every few seconds (e.g., live auctions, stock tickers)
- **User-specific content**: Every user sees completely different content (e.g., personalized dashboards)
- **Authentication-dependent**: Content varies significantly based on user authentication state
- **Frequent updates**: Content updates more frequently than every 15-30 minutes

#### For This E-commerce Use Case

- **Product data updates**: Typically happen multiple times per day, not every second
- **Public catalog**: Same content for all users (no personalization at page level)
- **Performance critical**: E-commerce sites have high bounce rates with slow load times
- **Cost sensitive**: Need to serve high traffic efficiently
- **SEO important**: Both ISR and SSR are good for SEO, but ISR provides better performance

**Conclusion**: ISR provides the optimal balance of performance, cost, and freshness for a product catalog. The 30-minute revalidation ensures content stays reasonably fresh while maintaining the performance and cost benefits of static serving.

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
