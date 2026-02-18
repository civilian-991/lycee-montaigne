import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { alumniPhotoSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";
import { deleteBlob } from "@/lib/blob-cleanup";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; photoId: string }> }
) {
  try {
    const csrfError = checkOrigin(req);
    if (csrfError) return csrfError;

    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { photoId } = await params;
    const parsed = await parseBody(req, alumniPhotoSchema);
    if (parsed instanceof NextResponse) return parsed;

    const photo = await db.alumniPhoto.update({
      where: { id: photoId },
      data: {
        imageUrl: parsed.imageUrl,
        altText: parsed.altText,
        order: parsed.order,
      },
    });

    return NextResponse.json(photo);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Ressource introuvable" }, { status: 404 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; photoId: string }> }
) {
  try {
    const csrfError = checkOrigin(_req);
    if (csrfError) return csrfError;

    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { photoId } = await params;
    const existing = await db.alumniPhoto.findUnique({ where: { id: photoId } });
    if (!existing) return NextResponse.json({ error: "Photo introuvable" }, { status: 404 });

    await deleteBlob(existing.imageUrl);
    await db.alumniPhoto.delete({ where: { id: photoId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
