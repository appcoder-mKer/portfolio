import type { MDXComponents } from "mdx/types";
import { asset } from "@/lib/asset";

const local = (src: string) => (src.startsWith("/") ? asset(src) : src);

/** Styled primitives for case-study bodies. Kept deliberately small; no typography plugin. */
export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-[2em] text-2xl" {...props} />,
  h3: (props) => <h3 className="mt-6 text-[1.17em] font-bold" {...props} />,
  p: (props) => <p className="mt-4" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-1 pl-10" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-1 pl-10" {...props} />,
  a: (props) => <a className="link-mark" target={props.href?.startsWith("http") ? "_blank" : undefined} rel="noopener" {...props} />,
  strong: (props) => <strong className="font-bold" {...props} />,
  code: (props) => <code className="rounded-[3px] border-[0.5px] border-border px-1 font-mono text-[0.9em]" {...props} />,
  pre: (props) => <pre className="box mt-4 overflow-x-auto font-mono text-sm" {...props} />,
  blockquote: (props) => <blockquote className="mt-4 border-l-2 border-highlight pl-4 text-muted" {...props} />,
  hr: () => <hr className="my-8 border-border" />,
  img: ({ src, alt }) =>
    typeof src === "string" ? (
      // eslint-disable-next-line @next/next/no-img-element -- static export: no image optimizer to route through
      <img src={local(src)} alt={alt ?? ""} loading="lazy" className="mx-auto mt-4 block max-h-[50vh] max-w-full" />
    ) : null,
  Figure: ({ src, alt, caption }: { src: string; alt: string; caption?: string }) => (
    <figure className="mt-4">
      {/* eslint-disable-next-line @next/next/no-img-element -- static export: no image optimizer to route through */}
      <img src={local(src)} alt={alt} loading="lazy" className="mx-auto block max-h-[50vh] max-w-full" />
      {caption ? <figcaption className="subtitle mt-1 text-center">{caption}</figcaption> : null}
    </figure>
  ),
};
