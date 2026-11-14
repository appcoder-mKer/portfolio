# nakul sethi — portfolio

Personal engineering portfolio. Next.js 16 · React 19 · Tailwind 4 · Three.js (R3F) · deployed on Vercel.

## Develop

```bash
npm install && npm run relink   # relink is required on this Mac (see below)
npm run dev                     # http://localhost:3000
npm run verify                  # typecheck + lint + test + build in a local-disk mirror
```

### iCloud note
This working tree lives in an iCloud-synced folder. `node_modules` and `.next` are symlinks to
`*.nosync` directories so iCloud never evicts them, and the git object store lives outside iCloud
(`git init --separate-git-dir`). After every `npm install`, run `npm run relink`. Heavy commands
(`npm run verify`) run in `/private/tmp/portfolio`.

## Content
- `content/site.ts` — bio, experience, socials
- `content/projects/*.mdx` — case studies (frontmatter validated with zod)
- `public/media/` — images, see `public/media/README.md`
- `public/resume.pdf` — resume download

## Deploy
Push to `main`. Vercel's git integration builds it (do not use `vercel --prod`; see `vercel.json`).
