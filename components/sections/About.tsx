import { about } from "@/content/site";

/** Horizontally scrolling row of small square cards, one per club. */
export function Clubs() {
  return (
    <section id="clubs" aria-labelledby="clubs-heading">
      <h2 id="clubs-heading" className="mt-[2em] text-2xl">
        Clubs
      </h2>
      <ul className="my-4 flex gap-4 overflow-x-auto">
        {about.clubs.map((c) => {
          const body = (
            <>
              <h3 className={`font-bold ${c.name.length > 16 ? "text-[0.9em]" : "text-[1.17em]"}`}>{c.name}</h3>
              <p>{c.role}</p>
              {"note" in c ? <p className="mt-3 text-xs">{c.note}</p> : null}
            </>
          );
          return (
            <li key={c.name} className="shrink-0">
              {"href" in c ? (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener"
                  className="box block h-full min-h-[150px] w-[150px] transition-shadow duration-150 ease-out hover:shadow-[0_0_2.5px_var(--highlight)]"
                >
                  {body}
                </a>
              ) : (
                <div className="box h-full min-h-[150px] w-[150px]">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
