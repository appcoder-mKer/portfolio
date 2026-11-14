import { site } from "@/content/site";

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="container-prose scroll-mt-20 py-24 sm:py-32">
      <p className="label-mono">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-medium tracking-tight">{title}</h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <section id="hero" className="container-prose flex min-h-[calc(100svh-4rem)] flex-col justify-center py-24">
        <p className="label-mono">{site.location}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-medium leading-[1.02] tracking-[-0.03em]">
          {site.name}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{site.tagline}</p>
      </section>

      <Section id="work" eyebrow="01 — Selected work" title="Things I've built" />
      <Section id="experience" eyebrow="02 — Experience" title="Where I've worked and led" />
      <Section id="about" eyebrow="03 — About" title="A little more about me" />
      <Section id="contact" eyebrow="04 — Contact" title="Let's talk" />
    </>
  );
}
