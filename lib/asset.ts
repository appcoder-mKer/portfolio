/** Path prefix when the site is served from a sub-path (GitHub Pages project site). "" at a domain root. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix a file under `public/` with the base path. next/image and plain <img> do not do this themselves. */
export const asset = (src: string) => `${basePath}${src}`;
