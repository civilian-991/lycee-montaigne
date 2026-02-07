"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      <motion.div
        animate={{ maxHeight: expanded ? 2000 : maxHeight }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden"
      >
        {children}
        <AnimatePresence>
          {!expanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent"
            />
          )}
        </AnimatePresence>
      </motion.div>
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
