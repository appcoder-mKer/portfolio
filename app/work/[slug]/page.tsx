import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/components";
import { TagList } from "@/components/ui/Tag";
import { getProject, getProjectSlugs } from "@/lib/content";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const links = Object.entries(project.links) as [string, string][];

  return (
    <article className="container-prose py-16 sm:py-24">
      <Link href="/#work" className="link-underline font-mono text-xs text-muted hover:text-fg">
        ← All projects
      </Link>

      <header className="mt-10 max-w-3xl">
        <p className="label-mono">
          {project.year} · {project.role}
        </p>
        <h1 className="mt-4 text-3xl font-medium leading-[1.05] tracking-[-0.03em]">{project.title}</h1>
        <p className="mt-6 text-lg text-muted">{project.summary}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <TagList tags={project.tags} />
          {links.length > 0 ? (
            <ul className="flex gap-4 font-mono text-xs">
              {links.map(([kind, href]) => (
                <li key={kind}>
                  <a href={href} target="_blank" rel="noopener" className="link-underline text-fg">
                    {kind === "repo" ? "Source ↗" : kind === "live" ? "Live ↗" : "Write-up ↗"}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </header>

      <div className="mt-14 max-w-prose text-[1.0625rem]">
        <MDXRemote source={project.body} components={mdxComponents} />
      </div>
    </article>
  );
}
