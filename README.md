# Dhanya Vangalapudi — Portfolio

Static portfolio site for Senior Data Engineer / AI-ML Engineer roles, hosted on GitHub Pages at
<https://dhanya777.github.io/dhanya_portfolio/>.

No framework and no build step: plain HTML, CSS and JavaScript. It loads one Google Fonts stylesheet and nothing else from outside.

## Structure

```
index.html                 Page shell, SEO / social metadata
404.html                   GitHub Pages not-found page
assets/site/content.js     ← ALL CONTENT LIVES HERE (profile, projects, skills, certs, links…)
assets/site/app.js         Rendering, recruiter/technical modes, router, tabs, explorer, simulator
assets/site/styles.css     Design tokens (dark + light) and components
assets/site/favicon.svg    Favicon
assets/site/og-image.png   1200×630 social sharing preview
resume/DhanyaResume.pdf    Résumé linked from the site
```

The files in `assets/css`, `assets/js`, `assets/scss`, `assets/img`, `assets/webfonts` and `img/` belong to the
previous version of the site. Nothing uses them any more (about 17 MB). You can delete them once you're happy with the new site.

## Editing content

Edit `assets/site/content.js` only. Each section of the page is built from it.

**Unverified facts:** any item can carry `confirm: "…"`. When it does:

- **The live site hides it**, so nothing unverified gets published.
- **Locally it shows up** with an amber "Needs confirmation" badge (review mode).

After you've checked a fact, update it and delete its `confirm` line.
(`statusConfirm`, `endConfirm` and `confirmStatus` are similar, but they only show a badge and never hide anything.)

URL flags:

- `?review`: turns on review mode on any host.
- `?live`: shows the production view locally (unconfirmed items hidden).
- `?mode=engineer` or `?mode=recruiter`: opens the page in that view.

Case studies have deep links like `#/work/cdc/architecture`. The project ids are `platform`, `anomaly`, `ai-dataform` and `cdc`.

## Run locally

Serve the **parent** folder so the URL matches the GitHub Pages base path:

```bash
cd .. && python3 -m http.server 8765
```

Then open <http://localhost:8765/dhanya_portfolio/>.

## Deploy

Pushing to `main` runs `.github/workflows/pages.yml`, which publishes the repository root to GitHub Pages:

```bash
git add -A && git commit -m "Redesign portfolio" && git push origin main
```

All paths are relative, so the `/dhanya_portfolio/` base path works. Page refreshes work too, because routing only uses
the URL hash. When you change CSS or JS, bump `?v=` in `index.html` so visitors don't get stale cached files.
