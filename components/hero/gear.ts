import * as THREE from "three";

export type GearSpec = {
  teeth: number;
  /** Gear module (pitch diameter / teeth). Meshing gears must share it. */
  module: number;
  depth: number;
  lighteningHoles?: number;
};

export const TOOTH = {
  tipHalf: 0.125, // half tip width, in fractions of one pitch step; tooth is centred on angle 0
  flank: 0.075,
} as const;

/** 2D involute-ish gear profile: trapezoidal teeth centred on multiples of 2π/teeth. */
export function gearShape({ teeth, module, lighteningHoles = 0 }: GearSpec): THREE.Shape {
  const pitchR = (module * teeth) / 2;
  const outerR = pitchR + module;
  const rootR = pitchR - 1.25 * module;
  const step = (Math.PI * 2) / teeth;
  const shape = new THREE.Shape();

  const polar = (r: number, a: number): [number, number] => [r * Math.cos(a), r * Math.sin(a)];
  const fr = [
    [outerR, -TOOTH.tipHalf],
    [outerR, TOOTH.tipHalf],
    [rootR, TOOTH.tipHalf + TOOTH.flank],
    [rootR, 1 - TOOTH.tipHalf - TOOTH.flank],
  ] as const;

  for (let i = 0; i < teeth; i++) {
    const base = i * step;
    fr.forEach(([r, f], j) => {
      const [x, y] = polar(r, base + f * step);
      if (i === 0 && j === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
  }
  shape.closePath();

  const hub = new THREE.Path();
  hub.absarc(0, 0, Math.max(rootR * 0.28, module * 1.2), 0, Math.PI * 2, true);
  shape.holes.push(hub);

  for (let i = 0; i < lighteningHoles; i++) {
    const a = (i / lighteningHoles) * Math.PI * 2 + Math.PI / lighteningHoles;
    const [cx, cy] = polar(rootR * 0.6, a);
    const hole = new THREE.Path();
    hole.absarc(cx, cy, rootR * 0.14, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
  return shape;
}

export function gearGeometry(spec: GearSpec): { solid: THREE.ExtrudeGeometry; edges: THREE.EdgesGeometry } {
  const solid = new THREE.ExtrudeGeometry(gearShape(spec), {
    depth: spec.depth,
    bevelEnabled: false,
    curveSegments: 24,
  });
  solid.translate(0, 0, -spec.depth / 2);
  const edges = new THREE.EdgesGeometry(solid, 20);
  return { solid, edges };
}

export const pitchRadius = (s: GearSpec) => (s.module * s.teeth) / 2;

/**
 * Phase constants so a chain of gears actually meshes.
 * Gear 0 turns at `t`; gear i turns at t * (teeth0 / teeth_i) with alternating sign.
 * `angles[i]` is the direction from gear i-1 to gear i.
 */
export function gearTrain(specs: GearSpec[], angles: number[]) {
  const centers: THREE.Vector2[] = [new THREE.Vector2(0, 0)];
  const phase: number[] = [0];
  const ratio: number[] = [1];
  for (let i = 1; i < specs.length; i++) {
    const prev = specs[i - 1];
    const cur = specs[i];
    const stepPrev = (Math.PI * 2) / prev.teeth;
    const stepCur = (Math.PI * 2) / cur.teeth;
    // Direction from prev to cur must line up with a tooth of prev (given prev's phase);
    // snap the requested angle to the nearest valid one.
    const desired = angles[i] ?? 0;
    const snapped = phase[i - 1] + Math.round((desired - phase[i - 1]) / stepPrev) * stepPrev;
    const d = pitchRadius(prev) + pitchRadius(cur);
    centers.push(centers[i - 1].clone().add(new THREE.Vector2(Math.cos(snapped) * d, Math.sin(snapped) * d)));
    ratio.push(-ratio[i - 1] * (prev.teeth / cur.teeth));
    // cur's gap must face prev: tooth centred at (snapped + π) offset by half a step.
    phase.push(snapped + Math.PI - stepCur / 2);
  }
  return { centers, phase, ratio };
}
