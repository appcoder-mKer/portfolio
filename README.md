# nakul sethi — portfolio

Plain HTML, CSS and a little JavaScript. No build step, nothing to install: edit a file, save, refresh.

Live at https://nakulsethi.github.io

## Preview

Double-click `index.html` to open it in a browser. Every link works straight from the folder.

## What to edit

| I want to change…                         | Open                          |
| ----------------------------------------- | ----------------------------- |
| About-me text, links, clubs, project boxes | `index.html`                  |
| The full class list                        | `coursework.html` (the first few are also in `index.html`) |
| A project write-up                         | `work/<project>.html`         |
| Colours, fonts, page width                 | top of `style.css`            |
| Gear sizes, speed, tilt                    | top of `gears.js`             |
| Photos                                     | `media/` (see `media/README.md`) |

Each HTML file has `<!-- comments -->` above every section saying what it is and how to add to it.

### Common jobs

- **Add a project:** copy a file in `work/`, rename it, edit the text. Then copy one project box in
  `index.html` and point it at the new file. Add the page to `sitemap.xml`.
- **Add a class or club:** copy one `<li>…</li>` block in the matching section.
- **Add your photo:** save it as `media/profile.jpg` and follow the PHOTO note in `index.html`.
- **Update your resume:** replace `resume.pdf` in this folder with the new PDF (keep the name).
  The Resume link on the home page downloads it.
- **Change the nav or footer:** they are repeated in every HTML file, so change each one
  (find-and-replace across the folder is the quick way).

## Files

```
index.html         home page
coursework.html    full class list
work/              one page per project
404.html           shown for addresses that don't exist
style.css          all styling
favicon.ico        the little icon in the browser tab
resume.pdf         the file the Resume link downloads
theme.js           dark/light switch
gears.js           the spinning gears in the header
media/             pictures
robots.txt, sitemap.xml   for search engines
```

## Publish

Push to `main`. GitHub Actions (`.github/workflows/ci.yml`) publishes the folder to GitHub Pages
as it is.
