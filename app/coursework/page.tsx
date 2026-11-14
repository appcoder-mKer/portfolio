import type { Metadata } from "next";
import Link from "next/link";
import { coursework } from "@/content/site";

export const metadata: Metadata = {
  title: "Coursework",
  description: "Relevant classes at Horace Mann School and AP exams.",
};

export default function CourseworkPage() {
  return (
    <article>
      <Link href="/" className="link-mark text-xs">
        ← Home
      </Link>
      <h1 className="mt-6 text-[2em] leading-tight">Coursework</h1>
      {coursework.length === 0 ? (
        <p className="mt-4">Nothing listed yet — check back soon.</p>
      ) : (
        <ul className="my-4 grid grid-cols-1 gap-4 min-[901px]:grid-cols-2">
          {coursework.map((c) => (
            <li key={`${c.name} ${c.detail}`} className="box">
              <h2 className="font-sans text-[1.17em]">
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noopener" className="link-mark">
                    {c.name}
                  </a>
                ) : (
                  c.name
                )}
              </h2>
              <p>{c.detail}</p>
              {c.note ? <p className="mt-3 text-xs">{c.note}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
