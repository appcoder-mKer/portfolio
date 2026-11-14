import { getProjects } from "@/lib/content";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Work() {
  const projects = getProjects();
  return (
    <section id="work" className="container-prose scroll-mt-20 py-24 sm:py-32">
      <Reveal>
        <SectionHeading eyebrow="01 — Projects" title="Things I've built" />
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.08} className="flex">
            <ProjectCard project={p} priority={i < 2} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
