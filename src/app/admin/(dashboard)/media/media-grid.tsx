"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  Trash2,
  Copy,
  RefreshCw,
  FileText,
  Check,
  Film,
  FileArchive,
  Loader2,
  FolderOpen,
  Search,
} from "lucide-react";
import { DeleteModal } from "@/components/admin/delete-modal";

interface BlobItem {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
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

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getFileName(pathname: string): string {
  const parts = pathname.split("/");
  return parts[parts.length - 1] || pathname;
}

export function MediaGrid() {
  const [blobs, setBlobs] = useState<BlobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteUrl, setDeleteUrl] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchBlobs = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/upload/list");
      if (res.ok) {
        const data = await res.json();
        setBlobs(data);
      }
    } catch {
      setError("Impossible de charger les fichiers.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlobs();
  }, [fetchBlobs]);

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
        await fetchBlobs();
      }
    } catch {
      setError("Erreur lors de l'envoi du fichier.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function confirmDelete() {
    if (!deleteUrl) return;
    setError(null);
    setDeleteLoading(true);
    try {
      await fetch("/api/upload/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: deleteUrl }),
      });
      setBlobs((prev) => prev.filter((b) => b.url !== deleteUrl));
    } catch {
      setError("Erreur lors de la suppression.");
    } finally {
      setDeleteUrl(null);
      setDeleteLoading(false);
    }
  }

  async function copyUrl(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch {
      // clipboard API may not be available
    }
  }

  const filtered = searchQuery
    ? blobs.filter((b) =>
        getFileName(b.pathname).toLowerCase().includes(searchQuery.toLowerCase())
      )
    : blobs;

  /* ---- Loading state ---- */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-white py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-3 text-sm text-text-muted">Chargement des fichiers...</p>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-2 text-red-400 hover:text-red-600">&#x2715;</button>
        </div>
      )}

      {/* ---- Toolbar ---- */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un fichier..."
            className="w-full rounded-lg border border-border py-2 pl-9 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Refresh */}
          <button
            onClick={fetchBlobs}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-text-muted transition-colors hover:bg-background-alt hover:text-text disabled:opacity-50"
          >
            <RefreshCw className="h-4 w-4" />
            Actualiser
          </button>

          {/* Upload */}
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

      {/* ---- File count ---- */}
      <p className="mb-3 text-xs text-text-muted">
        {filtered.length} fichier{filtered.length !== 1 ? "s" : ""}
        {searchQuery && ` sur ${blobs.length}`}
      </p>

      {/* ---- Empty state ---- */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-white py-20">
          <FolderOpen className="h-12 w-12 text-text-light" />
          <p className="mt-3 text-sm font-medium text-text">
            {searchQuery ? "Aucun résultat" : "Aucun fichier"}
          </p>
          <p className="mt-1 text-xs text-text-muted">
            {searchQuery
              ? "Essayez un autre terme de recherche."
              : "Commencez par uploader un fichier."}
          </p>
        </div>
      )}

      {/* ---- Grid ---- */}
      {filtered.length > 0 && (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((blob) => (
            <div
              key={blob.url}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-shadow hover:shadow-warm"
            >
              {/* ---- Thumbnail / Icon ---- */}
              <div className="relative flex aspect-square items-center justify-center bg-background-alt">
                {isImage(blob.pathname) ? (
                  <Image
                    src={blob.url}
                    alt={getFileName(blob.pathname)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                ) : isVideo(blob.pathname) ? (
                  <Film className="h-10 w-10 text-text-light" />
                ) : getExtension(blob.pathname) === "pdf" ? (
                  <FileText className="h-10 w-10 text-red-400" />
                ) : ["zip", "rar", "7z", "tar", "gz"].includes(getExtension(blob.pathname)) ? (
                  <FileArchive className="h-10 w-10 text-amber-500" />
                ) : (
                  <FileText className="h-10 w-10 text-text-light" />
                )}

                {/* ---- Hover overlay actions ---- */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => copyUrl(blob.url)}
                    title="Copier l'URL"
                    className="rounded-lg bg-white/90 p-2 text-text transition-colors hover:bg-white"
                  >
                    {copiedUrl === blob.url ? (
                      <Check className="h-4 w-4 text-secondary" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setDeleteUrl(blob.url)}
                    title="Supprimer"
                    className="rounded-lg bg-white/90 p-2 text-red-600 transition-colors hover:bg-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* ---- Meta ---- */}
              <div className="flex flex-1 flex-col gap-0.5 p-3">
                <p className="truncate text-xs font-medium text-text" title={getFileName(blob.pathname)}>
                  {getFileName(blob.pathname)}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-text-muted">
                  <span>{formatSize(blob.size)}</span>
                  <span className="text-border-dark">&middot;</span>
                  <span>{formatDate(blob.uploadedAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---- Delete confirmation ---- */}
      <DeleteModal
        open={deleteUrl !== null}
        onClose={() => setDeleteUrl(null)}
        onConfirm={confirmDelete}
        title="Supprimer ce fichier"
        description="Ce fichier sera définitivement supprimé du stockage. Cette action est irréversible."
        loading={deleteLoading}
      />
    </div>
  );
}
