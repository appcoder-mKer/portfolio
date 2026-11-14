import { about } from "@/content/site";
import { InfoBox } from "@/components/ui/InfoBox";

/** Horizontally scrolling row of small square cards, one per club. */
export function Clubs() {
  return (
    <section id="clubs" aria-labelledby="clubs-heading">
      <h2 id="clubs-heading" className="mt-[2em] text-2xl">
        Clubs
      </h2>
      <ul className="my-4 flex gap-4 overflow-x-auto">
        {about.clubs.map((c) => (
          <li key={c.name} className="shrink-0">
            <InfoBox
              title={c.name}
              subtitle={c.role}
              note={"note" in c ? c.note : undefined}
              href={"href" in c ? c.href : undefined}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
