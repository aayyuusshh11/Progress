# PROGRESS PWA Verification Report (revised)

The previous version of this report was produced without a real browser
(the sandbox that generated it blocked Chromium navigation entirely, per
its own "Environment limitation" note) and missed a real bug as a result.
This revision was produced with an actual headless Chromium browser
(`puppeteer-core` + `@sparticuz/chromium`) driving the real dev server
(`node server.mjs`) over HTTP, exactly as `npm run dev` does.

## Bug found and fixed
`index.html`, `manifest.json`, `sw.js`, and `main.js` all reference static
assets as root paths (`/hero.png`, `/icons/icon.svg`) — the standard
convention for a `public/` folder. However `server.mjs` and `build.mjs`
served `public/`'s contents under `/public/...` instead of at the root, so:
- the onboarding hero image 404'd
- the favicon 404'd
- the manifest icon 404'd (hurts PWA installability)
- the service worker's `caches.addAll()` install step silently **rejected**
  (it fails atomically if any one URL 404s), so offline caching never
  actually activated even though nothing visibly broke on screen

Fixed by making `server.mjs` fall back to `public/` when a path isn't found
at the root, and making `build.mjs` copy `public/`'s contents into `dist/`
root instead of `dist/public/`. Confirmed with `curl` that every asset path
now returns 200 in both `npm run dev` and `npm run preview` (dist build).

## Real-browser flow (headless Chromium, not a mocked harness)
Navigated the actual dev server and clicked through:
1. Onboarding form fill + submit
2. Dashboard render
3. Log page → body part select → exercise select → 3 sets entered → save
4. Redirect to Progress page, chart render
5. Analytics → muscle map tab
6. Analytics → muscle stats tab
7. Profile page
8. Settings page

Result: **zero page errors, zero console errors, zero failed HTTP requests**
at every step. `document.querySelector('#app').innerHTML` was non-empty and
matched the expected view at each hash route.

## Calculation checkpoint
`node tests/calculations.mjs` → **PASS** (anatomy, exercise count, mapping
IDs, volume, max weight, e1RM, effective sets, intensity, group aggregation).

## Screenshots
The `screenshots/` folder contains renders from the prior verification pass.
These reflect the app's markup/CSS but were not captured against the fixed
asset-path bug above (they predate the fix), so treat them as a style/layout
reference only, not confirmation of the fix.
