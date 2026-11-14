import Link from "next/link";
import { coursework } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

/** Section ids on the home page, in page order. Coursework only exists once it has entries. */
const sections = [
  ...(coursework.length > 0 ? [{ label: "Coursework", href: "/#coursework" }] : []),
  { label: "Clubs", href: "/#clubs" },
  { label: "Projects", href: "/#work" },
  { label: "More Projects", href: "/#more-work" },
];

/** Thin sticky strip at the top of every page: jump links to the home-page sections, plus the theme switch. */
export function IndexBar() {
  return (
    <nav
      aria-label="Sections"
      className="sticky top-0 z-40 -mx-5 flex items-center gap-4 border-b-[0.5px] border-border bg-bg px-5 py-2"
    >
      <ul className="subtitle mr-auto flex flex-wrap items-center gap-x-4 gap-y-1">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        {sections.map((s) => (
          <li key={s.href}>
            <Link href={s.href} className="hover:underline">
              {s.label}
            </Link>
          </li>
        ))}
      </ul>
      <ThemeToggle />
    </nav>
  );
}
