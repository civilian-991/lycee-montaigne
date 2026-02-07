"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ReadMoreProps {
  children: React.ReactNode;
  maxHeight?: number;
  className?: string;
}

export function ReadMore({
  children,
  maxHeight = 200,
  className,
}: ReadMoreProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={className}>
      <div
        className={cn(
          "relative overflow-hidden transition-[max-height] duration-500",
          !expanded && "max-h-[var(--max-h)]"
        )}
        style={{ "--max-h": `${maxHeight}px` } as React.CSSProperties}
      >
        {children}
        {!expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-secondary hover:text-secondary-dark transition-colors"
      >
        {expanded ? "Lire moins" : "Lire plus"}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            expanded && "rotate-180"
          )}
        />
      </button>
    </div>
  );
}
