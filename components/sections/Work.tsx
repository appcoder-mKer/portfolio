import { getProjects } from "@/lib/content";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Work() {
  const projects = getProjects();
  return (
    <section id="work" className="container-prose scroll-mt-20 py-24 sm:py-32">
      <SectionHeading eyebrow="01 — Projects" title="Things I've built" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} priority={i < 2} />
        ))}
      </div>
    </section>
  );
}
