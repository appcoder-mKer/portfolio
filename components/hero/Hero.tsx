"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
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

// Reduced motion
const MQ = "(prefers-reduced-motion: reduce)";
function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia(MQ);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReducedMotion = () => window.matchMedia(MQ).matches;

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

/** Client island: decides whether to mount the WebGL scene and feeds it theme colours. */
export function Hero({ children }: { children: React.ReactNode }) {
  const colors = useSyncExternalStore(subscribeTheme, getColors, () => null);
  const reduced = useSyncExternalStore(subscribeMotion, getReducedMotion, () => false);
  const ok = useSyncExternalStore(noop, getWebGL, () => false);

  return (
    <section id="hero" className="relative overflow-hidden">
      <div
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(70%_60%_at_60%_40%,black,transparent)]"
        aria-hidden="true"
      />
      {ok && colors ? <HeroCanvas colors={colors} animate={!reduced} /> : null}
      <div className="container-prose relative flex min-h-[calc(100svh-4rem)] flex-col justify-center py-24">
        {children}
      </div>
    </section>
  );
}
