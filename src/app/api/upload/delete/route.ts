import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { del } from "@vercel/blob";
import { z } from "zod";
import { uploadDeleteSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const body = await req.json();
    const data = uploadDeleteSchema.parse(body);

    // Validate that the URL belongs to the Vercel Blob store
    const urlObj = new URL(data.url);
    if (!urlObj.hostname.endsWith(".public.blob.vercel-storage.com")) {
      return NextResponse.json(
        { error: "URL non autorisée. Seuls les fichiers du Blob Store Vercel peuvent être supprimés." },
        { status: 400 }
      );
    }

    await del(data.url);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
