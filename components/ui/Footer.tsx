import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-prose flex flex-col gap-6 py-10 text-sm text-muted sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-fg">{site.name}</p>
          <p>
            Designed and built by hand. Next.js, Tailwind, Three.js. Deployed on Vercel.{" "}
            <a
              href="https://github.com/appcoder-mKer/portfolio"
              target="_blank"
              rel="noopener"
              className="link-underline text-fg"
            >
              Source
            </a>
          </p>
        </div>
        <ul className="flex gap-5">
          {site.socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener" className="link-underline hover:text-fg">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${site.email}`} className="link-underline hover:text-fg">
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
