import { site } from "@/content/site";
import { Hero } from "@/components/hero/Hero";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero>
        <p className="label-mono">{site.location}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-medium leading-[1.02] tracking-[-0.03em]">{site.name}</h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{site.tagline}</p>
      </Hero>
      <Work />
      <About />
      <Contact />
    </>
  );
}
