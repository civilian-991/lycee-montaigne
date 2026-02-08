"use client";

import { useState } from "react";
import { X, Megaphone } from "lucide-react";

export function AnnouncementBanner({ title, content }: { title: string; content: string }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative bg-secondary px-4 py-3 text-center text-sm text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
        <Megaphone className="h-4 w-4 shrink-0" />
        <span className="font-medium">{title}</span>
        {content && <span className="hidden md:inline">&mdash;</span>}
        {content && (
          <span className="hidden md:inline" dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/80 hover:bg-white/20 hover:text-white"
        aria-label="Fermer l'annonce"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
