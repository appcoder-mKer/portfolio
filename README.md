# nakul sethi — portfolio

Personal projects site. Next.js 16 · React 19 · Tailwind 4 · Three.js (R3F) hero · Motion + Lenis · deployed on Vercel.

## Develop

```bash
npm ci
npm run dev       # http://localhost:3000
npm run verify    # typegen + typecheck + lint + test + build, same as CI
```

The working tree lives on local disk (`~/proj/portfolio`). Do not develop from an iCloud-synced
folder on this Mac: with a nearly full disk, iCloud evicts freshly written source files and reads
block indefinitely. The git object store is at `~/.gitdirs/portfolio` (see `.git` pointer file).

## Content
- `content/site.ts` — name, blurb, clubs, nav, social links
- `content/projects/*.mdx` — one case study per project (frontmatter validated by `lib/schemas.ts`;
  a bad file fails the build). Cards on the home page and `/work/<slug>` pages render from these.
- Optional `cover: /media/projects/<slug>/cover.jpg` in frontmatter once you add an image under `public/`.

## Deploy
Push to `main`. Vercel's git integration builds it (do not use `vercel --prod`; see `vercel.json`).
