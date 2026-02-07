"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AnnouncementPopupProps {
  title: string;
  html: string;
  id: string;
}

export function AnnouncementPopup({
  title,
  html,
  id,
}: AnnouncementPopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(`announcement-${id}`);
    if (!dismissed) {
      setVisible(true);
    }
  }, [id]);

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem(`announcement-${id}`, "1");
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={dismiss}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-background p-6 shadow-[var(--shadow-elevated)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={dismiss}
              className="absolute right-3 top-3 rounded-full p-1.5 text-text-muted hover:bg-background-alt hover:text-text"
              aria-label="Fermer l'annonce"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="mb-4 pr-8 text-xl font-bold">{title}</h2>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
