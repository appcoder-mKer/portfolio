import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/components";
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
    <article>
      <Link href="/" className="link-mark text-xs">
        ← All projects
      </Link>

      <header className="mt-6">
        <h1 className="text-[2em] leading-tight">{project.title}</h1>
        <p>
          {project.role} · {project.year}
        </p>
        <p className="mt-4">{project.summary}</p>
        <p className="subtitle mt-4 text-center">{project.tags.join(" · ")}</p>
        {links.length > 0 ? (
          <ul className="subtitle mt-1 flex justify-center gap-4">
            {links.map(([kind, href]) => (
              <li key={kind}>
                <a href={href} target="_blank" rel="noopener" className="hover:underline">
                  {kind === "repo" ? "Source ↗" : kind === "live" ? "Live ↗" : "Write-up ↗"}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div>
        <MDXRemote source={project.body} components={mdxComponents} />
      </div>
    </article>
  );
}
