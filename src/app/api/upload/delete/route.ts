import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { del } from "@vercel/blob";
import { uploadDeleteSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";

export async function POST(req: Request) {
  try {
    const csrfError = checkOrigin(req);
    if (csrfError) return csrfError;

    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const parsed = await parseBody(req, uploadDeleteSchema);
    if (parsed instanceof NextResponse) return parsed;

    // Validate that the URL belongs to the Vercel Blob store
    const urlObj = new URL(parsed.url);
    if (!urlObj.hostname.endsWith(".public.blob.vercel-storage.com")) {
      return NextResponse.json(
        { error: "URL non autorisée. Seuls les fichiers du Blob Store Vercel peuvent être supprimés." },
        { status: 400 }
      );
    }

    await del(parsed.url);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
