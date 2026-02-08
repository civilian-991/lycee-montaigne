import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { alumniPhotoSchema } from "@/lib/validations";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const data = alumniPhotoSchema.parse(body);

    const photo = await db.alumniPhoto.create({
      data: {
        eventId: id,
        imageUrl: data.imageUrl,
        altText: data.altText || "",
        order: data.order ?? 0,
      },
    });

    return NextResponse.json(photo, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
