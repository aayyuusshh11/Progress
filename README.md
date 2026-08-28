# PROGRESS PWA

Offline-first fitness PWA for tracking workouts, progress, and muscle training load. **No backend, no account, no cloud.** All data lives in your browser's `localStorage` and the app works fully offline once installed.

## Stack
- Vanilla JavaScript ES modules
- CSS
- Native SVG charts
- Supplied `body-muscles` ESM package, vendored locally
- localStorage for user/workout data
- Web App Manifest + Service Worker (offline cache, network-first for `index.html`)
- No build step, no bundler, no transpilation

## Run locally

```bash
npm run dev
```

Open `http://localhost:5173`. A small static server is required because ES modules don't work over `file://`. Any static host works — `npx serve .`, `python -m http.server`, or your own nginx.

## Production build

```bash
npm run build      # copies src/, public/, index.html, manifest.json, sw.js into dist/
npm run preview    # serves dist/ via the same dev server
```

The build is a 5-line `cp` — no transpilation, no minification. The `dist/` folder is the entire production app.

## Deploy to a static host

PROGRESS is a pure static site. Drop `dist/` into any of these:

### GitHub Pages
1. Push the repo to GitHub.
2. In your repo settings → **Pages**, set Source = **GitHub Actions** (recommended) or `main` branch / `dist` folder.
3. A minimal workflow (`.github/workflows/deploy.yml`):
   ```yaml
   name: Deploy
   on: { push: { branches: [main] } }
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - run: node build.mjs
         - uses: actions/upload-pages-artifact@v3
           with: { path: dist }
     deploy:
       needs: build
       runs-on: ubuntu-latest
       permissions: { pages: write, id-token: write }
       environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }
       steps:
         - id: deployment
           uses: actions/deploy-pages@v4
   ```
4. The app will be available at `https://<user>.github.io/<repo>/`. Subpath deployment is fully supported — the service worker registers with a relative scope.

### Netlify
- **Drag-and-drop** `dist/` onto [app.netlify.com/drop](https://app.netlify.com/drop). Done.
- Or connect the repo: build command = `node build.mjs`, publish directory = `dist`.

### Cloudflare Pages
- Connect the repo. Build command = `node build.mjs`. Build output directory = `dist`. Node 18+ environment.

### Vercel
- `vercel.json`:
  ```json
  { "buildCommand": "node build.mjs", "outputDirectory": "dist" }
  ```

### S3 + CloudFront / any nginx
- Upload `dist/` contents to the bucket root or document root. Set `Cache-Control: public, max-age=31536000, immutable` on `/icons/*` and `dist/src/*` (hashed-by-content), and `no-cache` on `index.html`, `sw.js`, and `manifest.json` so updates ship immediately.

## Install as a PWA

Once deployed over HTTPS, the browser will offer an install (Chrome desktop: address-bar icon; iOS Safari: Share → Add to Home Screen; Android: browser menu → Install). The app icon uses the SVG at `public/icons/icon.svg`. Add PNG fallbacks (`icon-192.png`, `icon-512.png`) before the SVG line in `manifest.json` for full install-prompt compatibility on older Android.

After install the app:
- Launches in standalone (no browser chrome)
- Works fully offline (service worker pre-caches the shell)
- Persists across phone reboots
- Reads/writes the same `localStorage` as the browser version

## Tests

```bash
npm test
```

Covers anatomy mapping, exercise count, volume, max weight, e1RM, effective sets, intensity bands, group aggregation, store import/export roundtrip, schema migration, and safe-save behavior.

## Data and privacy

- All workout data is in `localStorage` under the key `progress_data`. Nothing is uploaded anywhere.
- `Settings → Export Data` saves a JSON file you control. `Import Data` restores from that file.
- A backup reminder appears on the dashboard when no backup has been taken in the last 7 days.
- `Settings → Clear all local data` wipes everything and returns to onboarding.

## Product flow
- First launch collects name, age, height, weight, goal, and experience.
- Log flow requires body part first, then filters to only the supported exercises for that part.
- Progress has Volume, Max Weight, and e1RM capsule metrics.
- Progress graphs use one point per workout/day; View Sets exposes raw sets.
- Analytics has This Week / This Month and Front / Back body-map views.
- Muscle load uses effective sets, not weight × coefficient.
- Workout records are raw source data; analytics are recalculated from them.
- Settings supports export/import and local-data reset.

See `verification/TEST-REPORT.md` for the verification record.
"# progress" 
