"use client";

import { cn } from "@/lib/utils";
import { FadeInView } from "./motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <FadeInView className={cn("mb-8 text-center", className)}>
      <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-lg text-text-muted">{subtitle}</p>
      )}
      <svg
        className="mx-auto mt-4 h-3 w-24"
        viewBox="0 0 100 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0 6 C 20 0, 30 12, 50 6 S 80 0, 100 6"
          stroke="var(--color-secondary)"
          strokeWidth="3"
          fill="none"
        />
      </svg>
    </FadeInView>
  );
}
