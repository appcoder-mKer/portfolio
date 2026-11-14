import Link from "next/link";
import type { Project } from "@/lib/content";
import { asset } from "@/lib/asset";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group box block h-full transition-shadow duration-150 ease-out hover:shadow-[0_0_2.5px_var(--highlight)]"
    >
      <h3 className="text-[1.17em] font-bold">{project.title}</h3>
      <p>{project.tags.slice(0, 3).join(" · ")}</p>
      {project.cover ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export: no image optimizer to route through
        <img
          src={asset(project.cover)}
          alt={project.coverAlt ?? project.title}
          loading="lazy"
          className="mx-auto mt-4 block max-h-[50vh] w-3/4 object-contain p-[5px]"
        />
      ) : null}
      <p className="mt-3 text-xs">
        {project.summary} <span className="link-mark">Learn More...</span>
      </p>
    </Link>
  );
}
