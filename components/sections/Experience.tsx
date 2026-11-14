import { experience } from "@/content/site";
import { formatRange } from "@/lib/format";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagList } from "@/components/ui/Tag";

export function Experience() {
  return (
    <section id="experience" className="container-prose scroll-mt-20 py-24 sm:py-32">
      <SectionHeading eyebrow="02 — Experience" title="Where I've worked and led">
        <a href="/resume.pdf" target="_blank" rel="noopener" className="link-underline text-sm text-muted hover:text-fg">
          Full resume (PDF) →
        </a>
      </SectionHeading>
      <ol className="mt-10 divide-y divide-border border-y border-border">
        {experience.map((e) => (
          <li key={`${e.org}-${e.start}`} className="grid gap-3 py-7 sm:grid-cols-[11rem_1fr] sm:gap-8">
            <p className="font-mono text-xs text-muted">{formatRange(e.start, e.end)}</p>
            <div className="space-y-3">
              <h3 className="font-medium tracking-tight">
                {e.role}
                <span className="text-muted"> · </span>
                {e.href ? (
                  <a href={e.href} target="_blank" rel="noopener" className="link-underline text-muted hover:text-fg">
                    {e.org}
                  </a>
                ) : (
                  <span className="text-muted">{e.org}</span>
                )}
              </h3>
              <p className="max-w-prose text-sm text-muted">{e.summary}</p>
              <TagList tags={e.tags} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
