import Link from "next/link";
import { getFeaturedProjects } from "@/lib/content";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Work() {
  const projects = getFeaturedProjects();
  return (
    <section id="work" className="container-prose scroll-mt-20 py-24 sm:py-32">
      <SectionHeading eyebrow="01 — Selected work" title="Things I've built">
        <Link href="/work" className="link-underline text-sm text-muted hover:text-fg">
          All projects →
        </Link>
      </SectionHeading>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} priority={i < 2} />
        ))}
      </div>
    </section>
  );
}
