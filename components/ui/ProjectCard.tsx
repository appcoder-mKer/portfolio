import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";
import { TagList } from "./Tag";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/60">
      <div className="relative aspect-[16/10] overflow-hidden bg-grid">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={project.coverAlt ?? project.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="label-mono">{project.year}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-lg font-medium tracking-tight">
            <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0">
              {project.title}
            </Link>
          </h3>
          <span className="font-mono text-xs text-muted">{project.year}</span>
        </div>
        <p className="text-sm text-muted">{project.summary}</p>
        <TagList tags={project.tags} className="mt-auto" />
      </div>
    </article>
  );
}
