import { describe, expect, it } from "vitest";
import { gearShape, gearTrain, pitchRadius } from "@/components/hero/gear";

const specs = [
  { teeth: 30, module: 0.1, depth: 0.2 },
  { teeth: 14, module: 0.1, depth: 0.2 },
  { teeth: 22, module: 0.1, depth: 0.2 },
];

describe("gear geometry", () => {
  it("builds a closed profile with teeth*4 vertices plus the hub hole", () => {
    const shape = gearShape({ teeth: 12, module: 0.1, depth: 0.2, lighteningHoles: 4 });
    expect(shape.getPoints(1).length).toBeGreaterThanOrEqual(12 * 4);
    expect(shape.holes).toHaveLength(5);
  });

  it("places meshing gears exactly one pitch-radius sum apart", () => {
    const { centers } = gearTrain(specs, [0, 0.35, -0.9]);
    for (let i = 1; i < specs.length; i++) {
      const d = centers[i].distanceTo(centers[i - 1]);
      expect(d).toBeCloseTo(pitchRadius(specs[i]) + pitchRadius(specs[i - 1]), 6);
    }
  });

  it("alternates direction with the tooth-count ratio", () => {
    const { ratio } = gearTrain(specs, [0, 0.35, -0.9]);
    expect(ratio[1]).toBeCloseTo(-30 / 14);
    expect(ratio[2]).toBeCloseTo(30 / 22);
  });

  it("aligns a tooth of each driver with the gap of each follower along the centre line", () => {
    const { centers, phase } = gearTrain(specs, [0, 0.35, -0.9]);
    for (let i = 1; i < specs.length; i++) {
      const dir = Math.atan2(centers[i].y - centers[i - 1].y, centers[i].x - centers[i - 1].x);
      const stepPrev = (2 * Math.PI) / specs[i - 1].teeth;
      const stepCur = (2 * Math.PI) / specs[i].teeth;
      const mod = (a: number, m: number) => ((a % m) + m) % m;
      // driver: tooth centred on the centre line
      expect(mod(dir - phase[i - 1], stepPrev)).toBeCloseTo(0, 6);
      // follower: gap (half a step off a tooth) facing the driver
      expect(mod(dir + Math.PI - phase[i], stepCur)).toBeCloseTo(stepCur / 2, 6);
    }
  });
});
