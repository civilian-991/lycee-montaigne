import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { put } from "@vercel/blob";
import { ALLOWED_UPLOAD_TYPES, MAX_UPLOAD_SIZE } from "@/lib/validations";

function sanitizeFilename(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_{2,}/g, "_")
    .replace(/^_+|_+$/g, "");
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "Aucun fichier" }, { status: 400 });

    if (!(ALLOWED_UPLOAD_TYPES as readonly string[]).includes(file.type)) {
      return NextResponse.json(
        { error: "Type de fichier non autorisé. Types acceptés : JPEG, PNG, GIF, WebP, SVG, PDF" },
        { status: 400 }
      );
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      return NextResponse.json(
        { error: "Le fichier dépasse la taille maximale de 10 Mo" },
        { status: 400 }
      );
    }

    const safeName = sanitizeFilename(file.name);
    const blob = await put(safeName, file, { access: "public" });

    return NextResponse.json({ url: blob.url }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
