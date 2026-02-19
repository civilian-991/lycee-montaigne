import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { pageSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";
import { deleteBlob } from "@/lib/blob-cleanup";
import { logAudit } from "@/lib/audit";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const page = await db.page.findUnique({
      where: { id },
      include: { sections: { orderBy: { order: "asc" } } },
    });

    if (!page) return NextResponse.json({ error: "Page introuvable" }, { status: 404 });

    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const csrfError = checkOrigin(req);
    if (csrfError) return csrfError;

    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const parsed = await parseBody(req, pageSchema);
    if (parsed instanceof NextResponse) return parsed;

    const page = await db.page.update({
      where: { id },
      data: {
        slug: parsed.slug,
        title: parsed.title,
        metaDescription: parsed.metaDescription || null,
        ogImage: parsed.ogImage || null,
        status: parsed.status,
      },
    });

    await logAudit(session.user!.id!, "UPDATE", "page", page.id, { title: page.title });
    return NextResponse.json(page);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Ressource introuvable" }, { status: 404 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const csrfError = checkOrigin(_req);
    if (csrfError) return csrfError;

    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const existing = await db.page.findUnique({
      where: { id },
      include: { sections: true },
    });
    if (!existing) return NextResponse.json({ error: "Page introuvable" }, { status: 404 });

    // Delete blob images from all sections before deleting the page
    for (const section of existing.sections) {
      await deleteBlob(section.image);
    }

    await db.page.delete({ where: { id } });
    await logAudit(session.user!.id!, "DELETE", "page", id, { title: existing.title });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
