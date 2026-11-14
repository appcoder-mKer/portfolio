# nakul sethi — portfolio

Personal projects site. Next.js 16 · React 19 · Tailwind 4 · Three.js (R3F) hero · static export · deployed on GitHub Pages.

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
- `content/site.ts` — name, blurb, clubs, social links, and the `coursework` list (classes / experience;
  the section and `/coursework` page stay hidden while it is empty)
- `public/resume.pdf` — adds a Resume link next to GitHub and LinkedIn once the file exists
- `public/media/profile.jpg` — your photo for the header (initials are shown until this file exists)
- `content/projects/*.mdx` — one case study per project (frontmatter validated by `lib/schemas.ts`;
  a bad file fails the build). Cards on the home page and `/work/<slug>` pages render from these.
- Optional `cover: /media/projects/<slug>/cover.jpg` in frontmatter once you add an image under `public/`.

## Deploy
Push to `main`. GitHub Actions (`.github/workflows/ci.yml`) runs the checks, builds the static export
(`out/`) and publishes it to GitHub Pages at https://nakulsethi.github.io.
