import fs from "node:fs";
import path from "node:path";
import { asset } from "@/lib/asset";
import { site } from "@/content/site";

const ICONS: Record<string, string> = {
  GitHub:
    "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z",
  LinkedIn:
    "M4.5 3A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3h-15ZM8 18H5.5V9.5H8V18ZM6.75 8.4a1.45 1.45 0 1 1 0-2.9 1.45 1.45 0 0 1 0 2.9ZM18.5 18H16v-4.4c0-1.1-.4-1.85-1.35-1.85-.75 0-1.2.5-1.4 1-.07.17-.09.42-.09.66V18h-2.5s.03-7.7 0-8.5h2.5v1.2c.33-.5.93-1.25 2.26-1.25 1.65 0 2.88 1.08 2.88 3.4V18Z",
  Resume:
    "M6.5 2A1.5 1.5 0 0 0 5 3.5v17A1.5 1.5 0 0 0 6.5 22h11a1.5 1.5 0 0 0 1.5-1.5V8l-6-6H6.5ZM12 3.5 17.5 9H13a1 1 0 0 1-1-1V3.5ZM8 12h8v1.5H8V12Zm0 3h8v1.5H8V15Zm0 3h5v1.5H8V18Z",
  Email:
    "M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-13Zm2.3.5 6.7 5.6L18.7 6H5.3ZM19 7.9l-7 5.85L5 7.9V18h14V7.9Z",
};

/**
 * Centred grey row of profile links under the blurb: GitHub, LinkedIn, Resume.
 * The Resume link needs public/resume.pdf; until that file exists an Email link takes its place.
 */
export function SocialLinks() {
  const hasResume = fs.existsSync(path.join(process.cwd(), "public", "resume.pdf"));
  const links = [
    ...site.socials,
    hasResume ? { label: "Resume", href: asset("/resume.pdf") } : { label: "Email", href: `mailto:${site.email}` },
  ];
  return (
    <ul className="subtitle my-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
      {links.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            target={l.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener"
            className="inline-flex items-center gap-1 hover:underline"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[1em]" fill="currentColor">
              <path d={ICONS[l.label]} />
            </svg>
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
