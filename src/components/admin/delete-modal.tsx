"use client";

import { useCallback, useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  loading?: boolean;
}

export function DeleteModal({
  open,
  onClose,
  onConfirm,
  title = "Confirmer la suppression",
  description = "Cette action est irréversible. Voulez-vous continuer ?",
  loading = false,
}: DeleteModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Focus the cancel button when the modal opens
  useEffect(() => {
    if (open) {
      cancelRef.current?.focus();
    }
  }, [open]);

  // Escape key handler
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Focus trap
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = [closeRef.current, cancelRef.current, confirmRef.current].filter(
        (el): el is HTMLButtonElement => el !== null && !el.disabled
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    },
    []
  );

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      onKeyDown={handleKeyDown}
    >
      <div className="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 id="delete-modal-title" className="text-lg font-semibold text-text">{title}</h3>
              <button ref={closeRef} onClick={onClose} className="rounded p-1 hover:bg-background-alt">
                <X className="h-4 w-4 text-text-muted" />
              </button>
            </div>
            <p id="delete-modal-description" className="mt-2 text-sm text-text-muted">{description}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            ref={cancelRef}
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-muted hover:bg-background-alt disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            ref={confirmRef}
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Suppression..." : "Supprimer"}
          </button>
        </div>
      </div>
    </div>
  );
}
