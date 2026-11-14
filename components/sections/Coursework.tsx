import Link from "next/link";
import { coursework } from "@/content/site";
import { InfoBox } from "@/components/ui/InfoBox";

/** How many entries the home-page row shows before "(see all)". */
const ROW_LIMIT = 7;

/** Row of class / internship cards. Renders nothing until content/site.ts lists some. */
export function Coursework() {
  if (coursework.length === 0) return null;
  return (
    <section id="coursework" aria-labelledby="coursework-heading">
      <h2 id="coursework-heading" className="mt-[2em] text-2xl">
        Coursework &amp; Experience
      </h2>
      <ul className="my-4 flex gap-4 overflow-x-auto">
        {coursework.slice(0, ROW_LIMIT).map((c) => (
          <li key={`${c.name} ${c.detail}`} className="shrink-0">
            <InfoBox title={c.name} subtitle={c.detail} note={c.note} href={c.href} />
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <Link href="/coursework" className="link-mark text-xs">
          (see all)
        </Link>
      </div>
    </section>
  );
}
