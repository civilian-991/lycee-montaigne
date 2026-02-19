"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  X,
  Search,
  Upload,
  FileText,
  Film,
  FileArchive,
  Loader2,
  FolderOpen,
  Check,
} from "lucide-react";

interface BlobItem {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
}

interface MediaPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp", "svg", "avif", "ico"];
const VIDEO_EXTENSIONS = ["mp4", "webm", "ogg", "mov"];

function getExtension(pathname: string): string {
  const parts = pathname.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
}

function isImage(pathname: string): boolean {
  return IMAGE_EXTENSIONS.includes(getExtension(pathname));
}

function isVideo(pathname: string): boolean {
  return VIDEO_EXTENSIONS.includes(getExtension(pathname));
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

function getFileName(pathname: string): string {
  const parts = pathname.split("/");
  return parts[parts.length - 1] || pathname;
}

export function MediaPickerModal({ open, onClose, onSelect }: MediaPickerModalProps) {
  const [blobs, setBlobs] = useState<BlobItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const fetchBlobs = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/upload/list");
      if (res.ok) {
        const data = await res.json();
        setBlobs(data);
      } else {
        setError("Impossible de charger les fichiers.");
      }
    } catch {
      setError("Impossible de charger les fichiers.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch blobs when modal opens
  useEffect(() => {
    if (open) {
      fetchBlobs();
      setSelected(null);
      setSearchQuery("");
    }
  }, [open, fetchBlobs]);

  // Lock body scroll when open
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

  // Focus search input when modal opens and blobs are loaded
  useEffect(() => {
    if (open && !loading) {
      searchInputRef.current?.focus();
    }
  }, [open, loading]);

  // Escape key handler
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        await fetchBlobs();
        setSelected(data.url);
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.error || "Erreur lors de l'envoi du fichier.");
      }
    } catch {
      setError("Erreur lors de l'envoi du fichier.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleConfirm() {
    if (selected) {
      onSelect(selected);
      onClose();
    }
  }

  function handleDoubleClick(url: string) {
    onSelect(url);
    onClose();
  }

  const filtered = searchQuery
    ? blobs.filter((b) =>
        getFileName(b.pathname).toLowerCase().includes(searchQuery.toLowerCase())
      )
    : blobs;

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="media-picker-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 id="media-picker-title" className="text-lg font-semibold text-text">
            Mediatheque
          </h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-text-muted hover:bg-background-alt hover:text-text"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-border px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-xs flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un fichier..."
              className="w-full rounded-lg border border-border py-2 pl-9 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {uploading ? "Envoi..." : "Uploader"}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {error && (
            <div className="mb-4 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="ml-2 text-red-400 hover:text-red-600">&#x2715;</button>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-3 text-sm text-text-muted">Chargement des fichiers...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <FolderOpen className="h-12 w-12 text-text-light" />
              <p className="mt-3 text-sm font-medium text-text">
                {searchQuery ? "Aucun resultat" : "Aucun fichier"}
              </p>
              <p className="mt-1 text-xs text-text-muted">
                {searchQuery
                  ? "Essayez un autre terme de recherche."
                  : "Commencez par uploader un fichier."}
              </p>
            </div>
          ) : (
            <>
              <p className="mb-3 text-xs text-text-muted">
                {filtered.length} fichier{filtered.length !== 1 ? "s" : ""}
                {searchQuery && ` sur ${blobs.length}`}
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filtered.map((blob) => (
                  <button
                    key={blob.url}
                    type="button"
                    onClick={() => setSelected(blob.url)}
                    onDoubleClick={() => handleDoubleClick(blob.url)}
                    className={`group relative flex flex-col overflow-hidden rounded-lg border-2 bg-white text-left transition-all hover:shadow-warm ${
                      selected === blob.url
                        ? "border-primary ring-2 ring-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative flex aspect-square items-center justify-center bg-background-alt">
                      {isImage(blob.pathname) ? (
                        <Image
                          src={blob.url}
                          alt={getFileName(blob.pathname)}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                        />
                      ) : isVideo(blob.pathname) ? (
                        <Film className="h-8 w-8 text-text-light" />
                      ) : getExtension(blob.pathname) === "pdf" ? (
                        <FileText className="h-8 w-8 text-red-400" />
                      ) : ["zip", "rar", "7z", "tar", "gz"].includes(getExtension(blob.pathname)) ? (
                        <FileArchive className="h-8 w-8 text-amber-500" />
                      ) : (
                        <FileText className="h-8 w-8 text-text-light" />
                      )}
                      {selected === blob.url && (
                        <div className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                      )}
                    </div>
                    {/* Meta */}
                    <div className="flex flex-col gap-0.5 p-2">
                      <p className="truncate text-xs font-medium text-text" title={getFileName(blob.pathname)}>
                        {getFileName(blob.pathname)}
                      </p>
                      <p className="text-[11px] text-text-muted">{formatSize(blob.size)}</p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-6 py-4">
          <p className="text-xs text-text-muted">
            {selected ? "1 fichier selectionne" : "Selectionnez un fichier"}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-muted hover:bg-background-alt"
            >
              Annuler
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selected}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light disabled:opacity-50"
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
