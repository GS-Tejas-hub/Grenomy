# Grenomy

Vite + React SPA with Tailwind (CDN), Framer Motion, Lucide, and Three.js sections.

## Local dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Vercel

This repo is pre-configured for Vercel:

- `vercel.json` includes SPA rewrites so client-side routes work.
- Node engine pinned (>=18).

Steps:
1) Push this project to GitHub (see commands below).
2) In Vercel → New Project → Import your repo → Framework Preset: Vite → Build Command: `npm run build` → Output: `dist`.
3) Deploy.

### Git commands to initialize and push

Run from project root:

```bash
git init
git add -A
git commit -m "chore: initial vercel-ready import"
git branch -M main
git remote add origin https://github.com/GS-Tejas-hub/Grenomy.git
git push -u origin main
```

After pushing, connect the repo in Vercel and deploy.


