"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/** Lenis smooth scrolling on the document. Skipped entirely under prefers-reduced-motion. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.12, anchors: true }}>
      {children}
    </ReactLenis>
  );
}
