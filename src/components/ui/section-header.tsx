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
    </FadeInView>
  );
}
