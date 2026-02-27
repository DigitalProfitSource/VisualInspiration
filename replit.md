# SimpleSequence - AI Implementation Advisor

## Overview

SimpleSequence is a consulting service website for an AI Implementation Advisor helping service-based businesses adopt AI strategically. The platform provides diagnostic clarity on operational friction, workflow mapping, and AI implementation guidance without selling tools or services. The site features a modern, dark-themed design with animated components, lead capture functionality, and industry-specific case studies showcasing business transformation metrics.

**Site Pages:**
- **Home** (`/`) - Landing page with hero (Sequential Revenue™ badge, "Single Profit Engine" headline), tech ticker, 3-pillar section (Capture/Convert/Compound with alternating two-column layouts and image placeholders), loop CTA, bento grid, industry carousel, Found Money Guarantee, Compound Effect timeline, Revenue Friction Analysis, AI Clarity Assessment, FAQ, testimonials, and founder section
- **Solutions** (`/solutions`) - Sequential Revenue™ 3-Pillar Revenue Loop: Capture (The 24/7 AI-Presence), Convert (The 24/7 Sales Rep), Compound (The Compounding Engine) — with Old Way/New Reality contrast blocks, collapsible "Under the Hood" sections, loop visual diagram, qualifier, "Beyond Basic Automation" section (moved from Home — 4 sticky feature cards with diagrams), and CTA
- **Industries** (`/industries`) - 5 industry-specific sections with bidirectional scroll animations, varied card sizes, and jackpot-style number counters
- **Process** (`/process`) - Client journey with three phases (Diagnostic & Audit, Build & Deploy, Optimize & Scale), "What Happens" vs "What You Experience" columns, Six Pillars reference section linking to Solutions, and FAQ accordion
- **Offers** (`/offers`) - AI Clarity Assessment and full 5-tier pricing section (Blueprint, Tune-Up, Growth Architecture, Operating System, Ongoing Optimization Partner)

**Content Alignment:**
- **Sequential Revenue™** is the core framework, now structured as a **3-Pillar Revenue Loop**: Capture (The 24/7 AI Front Door), Convert (The 24/7 Sales Rep), Compound (The Compounding Engine)
- **Solutions page** focuses on the 3 pillars with Old Way/New Reality contrast, collapsible "Under the Hood" technical details, and the "Beyond Basic Automation" deep-dive (4 sticky feature cards with diagrams). Pillars: Capture (The 24/7 AI-Presence), Convert (The 24/7 Sales Rep), Compound (The Compounding Engine).
- **Process page** focuses on client journey (how we work with you)
- **Home Profit Loop carousel** still shows the 5-module view as an operational detail layer
- **Home Method section** bridges the conceptual approach (Diagnose, Map, Locate, Architect)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, configured for fast HMR and optimized production builds
- Wouter for lightweight client-side routing (single-page application)
- Path aliases configured for clean imports (`@/`, `@shared/`, `@assets/`)

**UI Component System**
- shadcn/ui component library (New York style variant) with Radix UI primitives
- Tailwind CSS v4 for utility-first styling with custom CSS variables for theming
- Framer Motion for declarative animations and scroll-based effects
- Custom animated components including BorderBeam, GridBeam, CircuitBeams, and AnimatedMetric
- Responsive design with mobile-first approach

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management and caching
- React Hook Form with Zod resolvers for form validation
- Custom hooks for responsive behavior (useIsMobile) and toast notifications

**Design System**
- Dark theme with near-black background (#18181B - zinc-900)
- Accent colors: Blue (#93C5FD) to Cyan (#67E8F9) gradients
- Custom fonts: Inter (sans), JetBrains Mono (mono), Space Grotesk (display)
- Consistent spacing, shadows, and border radius via CSS custom properties

### Backend Architecture

**Server Framework**
- Express.js with TypeScript running on Node.js
- ESM module system throughout the application
- Custom middleware for request logging with timestamps and duration tracking
- JSON body parsing with raw body preservation for webhook support

**API Design**
- RESTful endpoints under `/api` prefix
- POST `/api/leads` - Lead submission with validation
- GET `/api/leads` - Lead retrieval (admin)
- Validation using Drizzle-Zod schemas derived from database schema
- Structured error responses with success/error flags

**Development vs Production**
- Development mode uses Vite middleware for HMR and on-demand compilation
- Production mode serves pre-built static assets from `dist/public`
- Conditional loading of Replit-specific plugins (cartographer, dev-banner) in development
- Environment-aware logging and error handling

**Build Process**
- Custom build script using esbuild for server bundling
- Selective dependency bundling (allowlist approach) to reduce cold start times
- Client built separately via Vite to `dist/public`
- Server bundled to single CJS file at `dist/index.cjs`

### Data Storage Solutions

**Database**
- PostgreSQL via Neon serverless driver (`@neondatabase/serverless`)
- Drizzle ORM for type-safe database queries
- Connection string from `DATABASE_URL` environment variable

**Schema Design**
- **users table**: UUID primary key, username (unique), password fields
- **leads table**: Serial ID, contact info (name, email, company), message, source tracking, timestamp
- Drizzle-Zod integration for automatic validation schema generation
- Migration files managed in `/migrations` directory

**Type Safety**
- Shared schema definitions in `/shared/schema.ts`
- TypeScript types inferred from Drizzle schema definitions
- Separate insert types (InsertUser, InsertLead) and select types (User, Lead)

### External Dependencies

**Database & ORM**
- Neon Serverless PostgreSQL for cloud database hosting
- Drizzle ORM with PostgreSQL dialect
- Drizzle Kit for schema management and migrations

**UI Libraries**
- Radix UI primitives (20+ component primitives for accessible UI)
- Embla Carousel for touch-enabled carousels
- Lucide React for consistent iconography
- class-variance-authority and clsx for conditional class management

**Animation & Visual Effects**
- Framer Motion for page transitions, scroll effects, and component animations
- Custom animation components for grid beams, border effects, and circuit patterns
- Tailwind CSS animations via tw-animate-css

**Development Tools**
- Replit-specific plugins: vite-plugin-runtime-error-modal, vite-plugin-cartographer, vite-plugin-dev-banner
- Custom Vite plugin for meta image URL generation based on deployment domain
- TypeScript with strict mode, incremental compilation

**Form Handling**
- React Hook Form for performant form state management
- Zod for schema validation
- @hookform/resolvers for integration between the two

**Asset Management**
- Static assets served from `client/public`
- Generated images stored in `attached_assets` directory
- Font loading from Google Fonts (Inter, JetBrains Mono, Space Grotesk)

**Session & Security**
- Infrastructure prepared for express-session with connect-pg-simple (PostgreSQL store)
- Passport.js dependencies present for future authentication implementation