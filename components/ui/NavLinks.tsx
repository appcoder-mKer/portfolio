"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { pickActive } from "@/lib/active-section";

const ids = site.nav.map((n) => n.href.replace("/#", ""));

/** Nav anchors with the section currently in view highlighted. */
export function NavLinks() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top);
          else visible.delete(e.target.id);
        }
        setActive(pickActive([...visible].map(([id, top]) => ({ id, top }))));
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {site.nav.map((item) => {
        const id = item.href.replace("/#", "");
        const isActive = active === id;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive ? "location" : undefined}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors hover:text-fg ${isActive ? "text-fg" : "text-muted"}`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </>
  );
}
