import { del } from "@vercel/blob";

/**
 * Best-effort deletion of a Vercel Blob file.
 * Silently skips if the URL is empty, null, or not a Vercel Blob URL.
 */
export async function deleteBlob(url: string | null | undefined): Promise<void> {
  if (!url) return;
  if (!url.includes("vercel-storage.com") && !url.includes("blob.vercel-storage.com")) return;

  try {
    await del(url);
  } catch {
    // Best-effort: never throw on blob cleanup failure
  }
}
