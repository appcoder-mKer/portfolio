import { about } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function About() {
  return (
    <section id="about" className="container-prose scroll-mt-20 py-24 sm:py-32">
      <Reveal>
        <SectionHeading eyebrow="02 — About" title="A little about me" />
      </Reveal>
      <Reveal delay={0.1}>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-5 text-[1.0625rem] leading-relaxed text-fg/90">
          {about.blurb.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <dl className="space-y-6 text-sm">
          <div>
            <dt className="label-mono">Clubs</dt>
            <dd className="mt-2 space-y-1.5">
              {about.clubs.map((c) => (
                <div key={c.name}>
                  {"href" in c ? (
                    <a href={c.href} target="_blank" rel="noopener" className="link-underline">
                      {c.name}
                    </a>
                  ) : (
                    c.name
                  )}
                  <span className="text-muted"> · {c.role}</span>
                </div>
              ))}
            </dd>
          </div>
          <div>
            <dt className="label-mono">Off the clock</dt>
            <dd className="mt-2 text-muted">{about.interests.join(" · ")}</dd>
          </div>
        </dl>
      </div>
      </Reveal>
    </section>
  );
}
