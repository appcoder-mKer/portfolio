import type { MDXComponents } from "mdx/types";
import Image from "next/image";

/** Styled primitives for case-study bodies. Kept deliberately small; no typography plugin. */
export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-14 text-xl font-medium tracking-tight first:mt-0" {...props} />,
  h3: (props) => <h3 className="mt-10 text-lg font-medium tracking-tight" {...props} />,
  p: (props) => <p className="mt-5 leading-relaxed text-fg/90" {...props} />,
  ul: (props) => <ul className="mt-5 list-disc space-y-2 pl-5 text-fg/90" {...props} />,
  ol: (props) => <ol className="mt-5 list-decimal space-y-2 pl-5 text-fg/90" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: (props) => <a className="link-underline text-fg" target={props.href?.startsWith("http") ? "_blank" : undefined} rel="noopener" {...props} />,
  strong: (props) => <strong className="font-medium text-fg" {...props} />,
  code: (props) => <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.9em]" {...props} />,
  pre: (props) => <pre className="mt-5 overflow-x-auto rounded-xl border border-border bg-surface p-4 font-mono text-sm leading-relaxed" {...props} />,
  blockquote: (props) => <blockquote className="mt-5 border-l-2 border-accent pl-4 text-muted" {...props} />,
  hr: () => <hr className="my-12 border-border" />,
  img: ({ src, alt }) =>
    typeof src === "string" ? (
      <Image src={src} alt={alt ?? ""} width={1600} height={1000} className="mt-6 rounded-xl border border-border" />
    ) : null,
  Figure: ({ src, alt, caption }: { src: string; alt: string; caption?: string }) => (
    <figure className="mt-8">
      <Image src={src} alt={alt} width={1600} height={1000} className="rounded-xl border border-border" />
      {caption ? <figcaption className="mt-2 font-mono text-xs text-muted">{caption}</figcaption> : null}
    </figure>
  ),
};
