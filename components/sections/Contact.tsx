import { site } from "@/content/site";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="container-prose scroll-mt-20 py-24 sm:py-32">
      <SectionHeading eyebrow="03 — Contact" title="Say hi" />
      <div className="mt-10 space-y-6 text-sm text-muted">
        <p className="max-w-sm">{"Robotics, a project you think I'd like, or just to talk shop — my inbox is open."}</p>
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
    </section>
  );
}
