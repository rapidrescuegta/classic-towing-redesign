# Blockers — Classic Towing Site

## 🔴 BUILD BROKEN — blocks all deploys (since ~2026-05-21)

**Status:** Awaiting Giuseppe's decision (stack-level version change).

**Symptom:** `npm run build` exits 1, prerendering Next's internal
`/_global-error` route: `TypeError: Cannot read properties of null
(reading 'useContext')`.

**Verified not fixable from app code (tested 2026-06-29):**
- Bumped Next 16.2.6 → 16.2.9 (latest patch): still crashes
- Built with `--webpack` instead of Turbopack: still crashes
- Reduced `global-error.tsx` to one bare line: still crashes
- `export const dynamic = 'force-dynamic'` on the route: ignored, still crashes

**Conclusion:** Framework bug (Next 16 + React 19). Root cause is upstream.

**Decision needed from Giuseppe (one of):**
1. Downgrade to Next 15 (stable, build will pass) — RECOMMENDED. Framework
   major step back; needs full-site retest after.
2. Move to Next 16.3 preview/canary — might fix it, but pre-release = risk.

Both are stack changes — NOT to be done silently (Tech Stack rule).

## Impact on open next-steps
All four next-steps are gated by this. SEO work (sitemap, robots,
LocalBusiness JSON-LD, richer metadata) and the feedback widget are
ALREADY in code but have NEVER deployed — the build has been broken
since they were added.

- Hero section        — can build/edit locally, but cannot ship until build fixed
- Services pages      — same
- Contact form        — same
- SEO setup           — DONE in code, blocked from going live by build

## Live deploy status
Last SUCCESSFUL Railway deploy: **2026-03-19**. Live URL
(https://gleaming-hope-production-a79e.up.railway.app) serves the MARCH
version — the one Mercedez Falcao reviewed. None of the May SEO/feedback
work is on it yet.
