# Media

Drop images here and reference them from MDX frontmatter or bodies.

```
public/media/projects/<slug>/cover.jpg      → frontmatter: cover: /media/projects/<slug>/cover.jpg
public/media/projects/<slug>/01.jpg, 02.jpg → body:        <Figure src="/media/projects/<slug>/01.jpg" alt="…" caption="…" />
```

Guidelines
- Landscape 16:10 for covers (e.g. 1600×1000). JPEG or WebP, under ~400 KB each.
- Always write real `alt` text (what is in the picture, not "image").
- Slugs are the MDX filenames in `content/projects/`.
