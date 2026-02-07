"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  }

  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex items-center justify-center gap-1 pt-4">
      <Link
        href={buildHref(Math.max(1, currentPage - 1))}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg text-sm",
          currentPage === 1
            ? "pointer-events-none text-text-muted/40"
            : "text-text-muted hover:bg-background-alt"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="flex h-8 w-8 items-center justify-center text-sm text-text-muted">
            ...
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(p)}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium",
              p === currentPage
                ? "bg-primary text-white"
                : "text-text-muted hover:bg-background-alt"
            )}
          >
            {p}
          </Link>
        )
      )}
      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1))}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg text-sm",
          currentPage === totalPages
            ? "pointer-events-none text-text-muted/40"
            : "text-text-muted hover:bg-background-alt"
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
