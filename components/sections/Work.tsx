import { getProjects, type Project } from "@/lib/content";
import { ProjectCard } from "@/components/ui/ProjectCard";

function ProjectGrid({ id, title, projects }: { id: string; title: string; projects: Project[] }) {
  if (projects.length === 0) return null;
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="mt-[2em] text-2xl">
        {title}
      </h2>
      <ul className="my-4 grid grid-cols-1 gap-4 min-[901px]:grid-cols-2">
        {projects.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Work() {
  const projects = getProjects();
  return (
    <>
      <ProjectGrid id="work" title="Project Highlight" projects={projects.filter((p) => p.featured)} />
      <ProjectGrid id="more-work" title="More Projects" projects={projects.filter((p) => !p.featured)} />
    </>
  );
}
