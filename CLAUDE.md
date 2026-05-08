# Classic Towing & Storage — Website Redesign

## Project Overview
**Client:** Classic Towing & Storage — Family-owned towing & heavy recovery, Southern Ontario
**Type:** Marketing website (static single-page, no backend)
**Location:** `/home/gracco/classic-towing-redesign`
**GitHub:** `rapidrescuegta/classic-towing-redesign` (public)
**Dev Port:** 3005
**Live domain target:** classictowing.ca

## Stack
- **Framework:** Next.js 16 (App Router, standalone output)
- **Language:** TypeScript 5.9
- **Styling:** Tailwind CSS 4.2 + custom theme in `globals.css`
- **Animation:** Framer Motion 12 (parallax, fade-ins, lightbox)
- **Icons:** Lucide React + custom `TowTruckIcon.tsx` SVG
- **Font:** Inter (Google Fonts)
- **Deployment:** Railway (Docker, Node 22 Alpine)

## Dev Commands
```bash
npm run dev -- --port 3005    # Dev server
npm run build                 # Production build
npm start                     # Start production
```

## Business Info
- **Main Phone:** 416-604-3222
- **Toll-Free:** 877-604-3222
- **Careers Email:** careers@classictowing.ca
- **Service Area:** Southern Ontario / Golden Horseshoe (Toronto, Mississauga, Brampton, Oakville, Ajax, Barrie, Hamilton, Huntsville, Oshawa)

### 4 Locations
1. **Toronto** — 41 Westside Drive, Etobicoke, ON M9C 1B3 | 416-604-3222 | 24/7
2. **Ajax** — 91 Notion Road, Ajax, ON L1S 6K8 | 905-427-0903
3. **Barrie** — 257 Tiffin St, Barrie, ON L4N 2N4 | 705-970-0481 | 24/7
4. **Hamilton** — 858 Nebo Road, Hamilton, ON L0R 1P0 | 905-570-0111

## Branding
- **Primary Red:** #CC1C1C (`classic-red`)
- **Red Dark:** #A01616 (hover states)
- **Red Light:** #E83333 (gradients)
- **Black:** #0A0A0A / Charcoal #1A1A1A / Gray #2A2A2A
- **Steel:** #8A8A8A (secondary text)
- **White:** #FAFAFA (background)
- **Cream:** #F5F0EB (accents)
- Custom animations: `float` (infinite), `pulse-red` (pulsing CTA buttons)

## Site Structure (Single Page with Anchor Nav)

All content lives in `src/app/page.tsx` (1083 lines). Sections:

| # | Section | Anchor | Description |
|---|---------|--------|-------------|
| 1 | Hero | — | 24/7 headline, stats (150+ vehicles, 40+ years, 4 locations), dual CTAs |
| 2 | About | `#about` | Three-generation family story, 150-truck fleet, trust badges (ISO, Heavy Rescue 401, Police Partner) |
| 3 | Services | `#services` | 8 service cards + emergency CTA with dual phone numbers |
| 4 | Fleet | `#fleet` | 6 vehicles with lightbox zoom (incl. 75-ton rotator flagship) |
| 5 | Why Classic | — | 6 differentiators + stat cards |
| 6 | Pink Theory | `#pink-theory` | Women-in-towing initiative by Mercedez Falcao, pink trucks/gear, award-winning |
| 7 | Locations | `#locations` | 4 location cards with address, phone, hours, email |
| 8 | Reviews | `#reviews` | 6 Google reviews, 4.5★, 98+ reviews badge |
| 9 | Careers | `#careers` | "Not All Heroes Wear Capes" recruitment, 4 perks, apply CTA |
| 10 | Contact | `#contact` | Dual phone numbers + location quick-dial |

### 8 Services
1. Light Duty Towing
2. Medium Duty Towing
3. Heavy Duty Towing
4. Lockout Service
5. Battery Boost
6. Fuel Delivery
7. Tire Service
8. Accident Recovery

## Key Stats
- 150+ fleet vehicles
- 40+ years in business
- 4 locations across Southern Ontario
- 24/7 emergency dispatch
- 4.5★ Google rating (98+ reviews)
- Featured on Discovery Channel's Heavy Rescue 401
- ISO Certified

## Key People
- **Dinis** — Founder (first generation)
- **Paul** — Current leader (second generation)
- **Mercedez Falcao** — Paul's daughter, founded Pink Theory initiative, Tow Times Woman of Towing award

## Key Files
| File | Purpose |
|------|---------|
| `src/app/page.tsx` | **Entire site** — all sections (1083 lines) |
| `src/app/layout.tsx` | Root layout, metadata, OG tags, Inter font |
| `src/app/globals.css` | Brand colors, animations, glass effects |
| `src/components/TowTruckIcon.tsx` | Custom SVG tow truck icon |
| `public/images/classic-logo.png` | Main brand logo |
| `public/images/Classic-1.png` to `Classic-25.png` | Fleet vehicle photos |
| `public/images/bg-*.jpg` | Section background images |
| `Dockerfile` | Multi-stage Node 22 Alpine build |
| `railway.toml` | Railway deploy config |

## Environment Variables
**None required** — fully static site, all content hardcoded.

## Deployment
- **Platform:** Railway (Dockerfile builder)
- **Health check:** GET `/`
- **Restart:** ON_FAILURE, max 3 retries
- **Production port:** 3000

## Technical Highlights
- Fleet lightbox with Escape key + click-outside close
- Smooth scroll anchor navigation
- Framer Motion parallax on scroll
- Fixed sticky nav that darkens on scroll
- Mobile hamburger menu
- Glass-card UI components
- All images with alt text, ARIA labels on interactive elements

## Notes
- All content is static/hardcoded (no CMS, no database, no env vars)
- Single-page architecture — everything in `page.tsx`
- Contact form not yet wired (future: email integration)
- Logo displayed in original red in nav and footer
