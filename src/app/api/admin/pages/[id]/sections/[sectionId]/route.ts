import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { pageSectionSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";
import { cleanHtmlNullable } from "@/lib/sanitize";
import { deleteBlob } from "@/lib/blob-cleanup";
import { logAudit } from "@/lib/audit";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; sectionId: string }> }
) {
  try {
    const csrfError = checkOrigin(req);
    if (csrfError) return csrfError;

    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { sectionId } = await params;
    const parsed = await parseBody(req, pageSectionSchema);
    if (parsed instanceof NextResponse) return parsed;

    const section = await db.pageSection.update({
      where: { id: sectionId },
      data: {
        sectionKey: parsed.sectionKey,
        title: parsed.title || null,
        contentHtml: cleanHtmlNullable(parsed.contentHtml),
        image: parsed.image || null,
        order: parsed.order ?? 0,
      },
    });

    await logAudit(session.user!.id!, "UPDATE", "pageSection", section.id, { sectionKey: section.sectionKey });
    return NextResponse.json(section);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Ressource introuvable" }, { status: 404 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; sectionId: string }> }
) {
  try {
    const csrfError = checkOrigin(_req);
    if (csrfError) return csrfError;

    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { sectionId } = await params;
    const existing = await db.pageSection.findUnique({ where: { id: sectionId } });
    if (!existing) return NextResponse.json({ error: "Section introuvable" }, { status: 404 });

    await deleteBlob(existing.image);
    await db.pageSection.delete({ where: { id: sectionId } });
    await logAudit(session.user!.id!, "DELETE", "pageSection", sectionId, { sectionKey: existing.sectionKey });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
