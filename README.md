# nakul sethi — portfolio

Personal engineering portfolio. Next.js 16 · React 19 · Tailwind 4 · Three.js (R3F) · deployed on Vercel.

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
- `content/site.ts` — bio, experience, socials
- `content/projects/*.mdx` — case studies (frontmatter validated with zod)
- `public/media/` — images, see `public/media/README.md`
- `public/resume.pdf` — resume download

## Deploy
Push to `main`. Vercel's git integration builds it (do not use `vercel --prod`; see `vercel.json`).
