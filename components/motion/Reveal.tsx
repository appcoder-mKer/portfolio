"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type Props = {
  children: React.ReactNode;
  /** Seconds. Use to stagger siblings. */
  delay?: number;
  className?: string;
};

/** Fades + lifts content in once when it enters the viewport. No-op under reduced motion. */
export function Reveal({ children, delay = 0, className }: Props) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
