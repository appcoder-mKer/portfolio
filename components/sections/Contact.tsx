import { site } from "@/content/site";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact({ form }: { form?: React.ReactNode }) {
  return (
    <section id="contact" className="container-prose scroll-mt-20 py-24 sm:py-32">
      <SectionHeading eyebrow="04 — Contact" title="Let's talk" />
      <div className="mt-10 grid gap-12 lg:grid-cols-[20rem_1fr]">
        <div className="space-y-6 text-sm text-muted">
          <p className="max-w-xs">
            {"Summer programs, robotics, a project you think I'd like — my inbox is open."}
          </p>
          <CopyEmail email={site.email} />
          <ul className="flex gap-5">
            {site.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener" className="link-underline hover:text-fg">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>{form}</div>
      </div>
    </section>
  );
}
