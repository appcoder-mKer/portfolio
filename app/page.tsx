import { site } from "@/content/site";
import { Work } from "@/components/sections/Work";
import { Experience } from "@/components/sections/Experience";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <section id="hero" className="container-prose flex min-h-[calc(100svh-4rem)] flex-col justify-center py-24">
        <p className="label-mono">{site.location}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-medium leading-[1.02] tracking-[-0.03em]">{site.name}</h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{site.tagline}</p>
      </section>
      <Work />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
