import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { activitySchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";
import { deleteBlob } from "@/lib/blob-cleanup";
import { logAudit } from "@/lib/audit";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const item = await db.activityItem.findUnique({ where: { id } });
    if (!item) return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    return NextResponse.json(item);
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
    const parsed = await parseBody(req, activitySchema);
    if (parsed instanceof NextResponse) return parsed;

    const existing = await db.activityItem.findUnique({ where: { id } });
    const item = await db.activityItem.update({
      where: { id },
      data: {
        title: parsed.title,
        description: parsed.description || null,
        image: parsed.image || null,
        category: parsed.category,
        order: parsed.order ?? 0,
      },
    });

    if (existing?.image && existing.image !== item.image) {
      await deleteBlob(existing.image);
    }

    await logAudit(session.user!.id!, "UPDATE", "activityItem", item.id, { title: item.title });
    return NextResponse.json(item);
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
    const existing = await db.activityItem.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Activité introuvable" }, { status: 404 });

    await deleteBlob(existing.image);
    await db.activityItem.delete({ where: { id } });
    await logAudit(session.user!.id!, "DELETE", "activityItem", id, { title: existing.title });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
