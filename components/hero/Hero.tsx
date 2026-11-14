"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { HeroColors } from "./HeroCanvas";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

/* ── External stores (DOM state read via useSyncExternalStore, never setState-in-effect) ── */

const noop = () => () => {};

function readColors(): HeroColors {
  const s = getComputedStyle(document.documentElement);
  return {
    fg: s.getPropertyValue("--fg").trim(),
    accent: s.getPropertyValue("--accent").trim(),
    muted: s.getPropertyValue("--muted").trim(),
  };
}

// Theme colours: snapshot is cached per <html> class so the reference stays stable between themes.
let colorCache: { key: string; colors: HeroColors } | null = null;
function subscribeTheme(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => mo.disconnect();
}
function getColors(): HeroColors {
  const key = document.documentElement.className;
  if (!colorCache || colorCache.key !== key) colorCache = { key, colors: readColors() };
  return colorCache.colors;
}

// WebGL availability, probed once
let webgl: boolean | null = null;
function getWebGL(): boolean {
  if (webgl === null) {
    try {
      const c = document.createElement("canvas");
      webgl = Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
    } catch {
      webgl = false;
    }
  }
  return webgl;
}

/** Client island: the gear train beside the name. Mounts the WebGL scene only when it can render. */
export function Gears() {
  const colors = useSyncExternalStore(subscribeTheme, getColors, () => null);
  const reduced = useReducedMotion();
  const ok = useSyncExternalStore(noop, getWebGL, () => false);

  return (
    <div className="relative h-[110px] w-full sm:h-[150px] sm:w-[260px] sm:shrink-0" aria-hidden="true">
      {ok && colors ? <HeroCanvas colors={colors} animate={!reduced} /> : null}
    </div>
  );
}
