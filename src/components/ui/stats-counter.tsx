"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

interface StatsCounterProps {
  stats: StatItem[];
  className?: string;
}

function AnimatedNumber({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (v) => {
      setDisplay(Math.round(v));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <motion.span
      ref={ref}
      className="text-4xl font-bold tabular-nums md:text-5xl"
    >
      {display.toLocaleString("fr-FR")}
      {suffix}
    </motion.span>
  );
}

export function StatsCounter({ stats, className }: StatsCounterProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4",
        className
      )}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <AnimatedNumber value={stat.value} suffix={stat.suffix} />
          <p className="mt-2 text-sm font-medium text-text-muted">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
