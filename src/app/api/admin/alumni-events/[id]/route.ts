import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { alumniEventSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";
import { cleanHtmlNullable } from "@/lib/sanitize";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const event = await db.alumniEvent.findUnique({
      where: { id },
      include: { photos: { orderBy: { order: "asc" } } },
    });

    if (!event) return NextResponse.json({ error: "Non trouvé" }, { status: 404 });

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const csrfError = checkOrigin(req);
    if (csrfError) return csrfError;

    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const parsed = await parseBody(req, alumniEventSchema);
    if (parsed instanceof NextResponse) return parsed;

    const event = await db.alumniEvent.update({
      where: { id },
      data: {
        title: parsed.title,
        date: parsed.date ? new Date(parsed.date) : undefined,
        descriptionHtml: cleanHtmlNullable(parsed.descriptionHtml),
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Ressource introuvable" }, { status: 404 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const csrfError = checkOrigin(_req);
    if (csrfError) return csrfError;

    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const existing = await db.alumniEvent.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Événement introuvable" }, { status: 404 });

    await db.alumniEvent.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
