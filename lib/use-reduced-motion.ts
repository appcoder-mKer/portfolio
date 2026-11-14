"use client";

import { useSyncExternalStore } from "react";

const MQ = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(MQ);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** True when the OS asks for reduced motion. Always false during SSR so markup matches. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, () => window.matchMedia(MQ).matches, () => false);
}
