import { about } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="container-prose scroll-mt-20 py-24 sm:py-32">
      <SectionHeading eyebrow="03 — About" title="A little more about me" />
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-5 text-[1.0625rem] leading-relaxed text-fg/90">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <dl className="space-y-6 text-sm">
          <div>
            <dt className="label-mono">Education</dt>
            <dd className="mt-2">
              {about.education.school}
              <br />
              <span className="text-muted">{about.education.detail}</span>
            </dd>
          </div>
          <div>
            <dt className="label-mono">Awards</dt>
            <dd className="mt-2 text-muted">{about.awards.join(" · ")}</dd>
          </div>
          {Object.entries(about.skills).map(([group, items]) => (
            <div key={group}>
              <dt className="label-mono">{group}</dt>
              <dd className="mt-2 text-muted">{items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
