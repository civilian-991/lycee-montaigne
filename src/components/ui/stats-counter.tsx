"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [visible, value]);

  return (
    <span ref={ref} className="text-4xl font-bold tabular-nums md:text-5xl">
      {count.toLocaleString("fr-FR")}
      {suffix}
    </span>
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
