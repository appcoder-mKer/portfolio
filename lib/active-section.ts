/**
 * Given the sections currently intersecting the viewport (with their top offsets),
 * pick the one to highlight in the nav: the intersecting section closest to the top.
 * Returns null when none intersect (e.g. while in the hero).
 */
export function pickActive(visible: ReadonlyArray<{ id: string; top: number }>): string | null {
  if (visible.length === 0) return null;
  return visible.reduce((best, s) => (Math.abs(s.top) < Math.abs(best.top) ? s : best)).id;
}
