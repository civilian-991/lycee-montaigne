import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { announcementSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";
import { cleanHtml } from "@/lib/sanitize";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const item = await db.announcement.findUnique({ where: { id } });
    if (!item) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

    return NextResponse.json(item);
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
    const parsed = await parseBody(req, announcementSchema);
    if (parsed instanceof NextResponse) return parsed;

    const item = await db.announcement.update({
      where: { id },
      data: {
        title: parsed.title,
        contentHtml: cleanHtml(parsed.contentHtml),
        active: parsed.active ?? true,
        startDate: parsed.startDate ? new Date(parsed.startDate) : null,
        endDate: parsed.endDate ? new Date(parsed.endDate) : null,
        status: parsed.status,
      },
    });

    return NextResponse.json(item);
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
    const existing = await db.announcement.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Annonce introuvable" }, { status: 404 });

    await db.announcement.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const csrfError = checkOrigin(_req);
    if (csrfError) return csrfError;

    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const current = await db.announcement.findUnique({ where: { id } });
    if (!current) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

    const item = await db.announcement.update({
      where: { id },
      data: { active: !current.active },
    });

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
