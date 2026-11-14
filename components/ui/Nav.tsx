import Link from "next/link";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/80 backdrop-blur supports-[backdrop-filter]:bg-bg/60">
      <nav aria-label="Primary" className="container-prose flex h-16 items-center justify-between">
        <Link href="/" className="font-mono text-sm tracking-tight text-fg">
          {site.shortName}
          <span className="text-accent">.</span>
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {site.nav.map((item) => (
            <li key={item.href}>
              {"external" in item && item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener"
                  className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          <li className="pl-1">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
