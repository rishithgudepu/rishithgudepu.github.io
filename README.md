# Rishith Gudepu — Portfolio

React + Vite portfolio site. All content lives in `src/data.js` — edit that one file to update the site.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Deploy to GitHub Pages

### Option A — root domain (recommended)
1. Create a repo named **`<your-username>.github.io`** (e.g. `rishithgudepu.github.io`).
2. Keep `base: "/"` in `vite.config.js` (already set).
3. Push this folder to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
4. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
5. The included workflow builds and publishes on every push. Live at `https://<your-username>.github.io`.

### Option B — project repo (e.g. repo named `portfolio`)
1. Set `base: "/portfolio/"` in `vite.config.js`.
2. Push to a repo named `portfolio`, enable Pages → GitHub Actions.
3. Live at `https://<your-username>.github.io/portfolio/`.

## Edit content
Everything (bio, skills, education, experience, projects, research) is in **`src/data.js`**. Your name in author lists is auto-highlighted wherever it matches `R. Gudepu`.
