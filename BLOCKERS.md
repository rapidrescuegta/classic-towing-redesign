# Blockers — Classic Towing Site

## ✅ RESOLVED 2026-06-30 — build "blocker" was NODE_ENV, not a framework bug

**Root cause:** the local shell had `NODE_ENV` set to an EMPTY STRING. Next
treats that as a non-standard value and takes a broken prerender path for its
internal error pages (`/_global-error` on Next 16, `/_error` `/404` `/500` on
Next 15) — surfacing as the `useContext` null crash / `<Html> should not be
imported` error. It was NEVER a Next 16 framework bug.

**Fix (commit 76cb655):**
- `NODE_ENV=production npm run build` builds clean on Next 16.2.9 — no
  framework downgrade needed. Intended stack preserved.
- Dockerfile `builder` stage now sets `ENV NODE_ENV=production` so Railway
  builds are deterministic (previously unset → Next defaulted to production,
  which is why the March deploy worked; the breakage was local-only).
- Removed the Next-16 `global-error.tsx` workaround (no longer needed).
- Removed dev-only feedback widget from layout.

**Verification status:**
- Build: VERIFIED green locally (Next 16.2.9, all 5 routes prerender).
- Railway deploy: pushed to master; auto-deploy NOT yet confirmed live.
- Mobile nav scroll fix (overflow-x-clip + scroll-margin-top + scrollIntoView):
  implemented, but NOT pixel-verified — the Playwright headless env ignores all
  programmatic scrolling. Needs a real-device tap-test on the live URL.

Live URL: https://gleaming-hope-production-a79e.up.railway.app
