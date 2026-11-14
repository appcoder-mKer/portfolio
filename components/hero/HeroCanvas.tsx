"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { gearGeometry, gearTrain, type GearSpec } from "./gear";

export type HeroColors = { fg: string; accent: string; muted: string };

const SPECS: GearSpec[] = [
  { teeth: 30, module: 0.1, depth: 0.22, lighteningHoles: 6 },
  { teeth: 14, module: 0.1, depth: 0.22 },
  { teeth: 22, module: 0.1, depth: 0.22, lighteningHoles: 4 },
];
const ANGLES = [0, 0.35, -0.9];

const pointer = new THREE.Vector2(0, 0);

function Gear({
  spec,
  color,
  fill,
  opacity,
  position,
  getAngle,
}: {
  spec: GearSpec;
  color: string;
  fill: string;
  opacity: number;
  position: [number, number, number];
  getAngle: () => number;
}) {
  const ref = useRef<THREE.Group>(null);
  const { solid, edges } = useMemo(() => gearGeometry(spec), [spec]);
  useEffect(() => () => {
    solid.dispose();
    edges.dispose();
  }, [solid, edges]);
  useFrame(() => {
    if (ref.current) ref.current.rotation.z = getAngle();
  });
  return (
    <group ref={ref} position={position}>
      <mesh geometry={solid}>
        <meshBasicMaterial color={fill} transparent opacity={0.035} depthWrite={false} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={color} transparent opacity={opacity} />
      </lineSegments>
    </group>
  );
}

function Train({ colors, animate }: { colors: HeroColors; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { centers, phase, ratio } = useMemo(() => gearTrain(SPECS, ANGLES), []);
  const t = useRef(0);
  const scroll = useRef(0);
  const { viewport } = useThree();

  useEffect(() => {
    const onScroll = () => {
      scroll.current = window.scrollY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((_, delta) => {
    if (animate) t.current += delta * 0.18;
    const g = group.current;
    if (!g) return;
    const tx = -0.5 + (animate ? -pointer.y * 0.18 : 0);
    const ty = 0.55 + (animate ? pointer.x * 0.25 : 0);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, tx, 3, delta);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, ty, 3, delta);
  });

  const angle = (i: number) => () => phase[i] + (t.current + scroll.current * 0.0035) * ratio[i];
  const narrow = viewport.width < 5.5;
  const scale = narrow ? 0.55 : 0.82;
  const offset: [number, number, number] = narrow ? [0.55, 1.5, 0] : [1.15, 0.05, 0];

  return (
    <group ref={group} position={offset} scale={scale}>
      {SPECS.map((spec, i) => (
        <Gear
          key={spec.teeth}
          spec={spec}
          color={i === 1 ? colors.accent : colors.fg}
          fill={colors.fg}
          opacity={i === 1 ? 0.9 : 0.42}
          position={[centers[i].x, centers[i].y, 0]}
          getAngle={angle(i)}
        />
      ))}
    </group>
  );
}

export default function HeroCanvas({ colors, animate }: { colors: HeroColors; animate: boolean }) {
  const [inView, setInView] = useState(true);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) return;
    const onMove = (e: PointerEvent) => {
      pointer.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [animate]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        frameloop={animate && inView ? "always" : "demand"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 8], fov: 30 }}
        style={{ pointerEvents: "none" }}
      >
        <Train colors={colors} animate={animate} />
      </Canvas>
    </div>
  );
}
