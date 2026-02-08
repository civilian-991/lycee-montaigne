import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { alumniPhotoSchema } from "@/lib/validations";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; photoId: string }> }
) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { photoId } = await params;
    const body = await req.json();
    const data = alumniPhotoSchema.parse(body);

    const photo = await db.alumniPhoto.update({
      where: { id: photoId },
      data: {
        imageUrl: data.imageUrl,
        altText: data.altText,
        order: data.order,
      },
    });

    return NextResponse.json(photo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides", details: error.issues }, { status: 400 });
    }
    if (error instanceof Error && error.message.includes("Record to update not found")) {
      return NextResponse.json({ error: "Photo introuvable" }, { status: 404 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; photoId: string }> }
) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { photoId } = await params;
    const existing = await db.alumniPhoto.findUnique({ where: { id: photoId } });
    if (!existing) return NextResponse.json({ error: "Photo introuvable" }, { status: 404 });

    await db.alumniPhoto.delete({ where: { id: photoId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
