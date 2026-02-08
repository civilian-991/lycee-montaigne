"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [mode, setMode] = useState<"upload" | "url">(value ? "url" : "upload");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/") && !file.type.startsWith("application/pdf")) return;
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        onChange(data.url);
      } catch {
        // silently fail — user can retry
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-text">{label}</label>
      <div className="mt-1 flex gap-2">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`rounded-lg px-3 py-1 text-xs font-medium ${mode === "upload" ? "bg-primary text-white" : "border border-border text-text-muted hover:bg-background-alt"}`}
        >
          Upload
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`rounded-lg px-3 py-1 text-xs font-medium ${mode === "url" ? "bg-primary text-white" : "border border-border text-text-muted hover:bg-background-alt"}`}
        >
          URL
        </button>
      </div>

      {mode === "upload" ? (
        <div
          tabIndex={0}
          role="button"
          aria-label="Déposer ou sélectionner un fichier"
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          className={`mt-2 flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
            dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
          }`}
        >
          {uploading ? (
            <p className="text-sm text-text-muted">Envoi en cours...</p>
          ) : (
            <>
              <Upload className="h-6 w-6 text-text-muted" />
              <p className="text-sm text-text-muted">
                Glisser une image ici ou <span className="font-medium text-primary">parcourir</span>
              </p>
            </>
          )}
          <input ref={inputRef} type="file" accept="image/*,.pdf" onChange={handleFileInput} className="hidden" />
        </div>
      ) : (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="mt-2 block w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      )}

      {value && (
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-background-alt p-2">
          <ImageIcon className="h-4 w-4 shrink-0 text-text-muted" />
          <span className="min-w-0 flex-1 truncate text-xs text-text-muted">{value}</span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="shrink-0 rounded p-0.5 hover:bg-white"
          >
            <X className="h-3.5 w-3.5 text-text-muted" />
          </button>
        </div>
      )}
    </div>
  );
}
