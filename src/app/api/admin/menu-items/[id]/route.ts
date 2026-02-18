import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { menuItemSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const item = await db.menuItem.findUnique({
      where: { id },
      include: { children: { orderBy: { order: "asc" } } },
    });
    if (!item) return NextResponse.json({ error: "Élément introuvable" }, { status: 404 });

    return NextResponse.json(item);
  } catch {
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
    const parsed = await parseBody(req, menuItemSchema.partial());
    if (parsed instanceof NextResponse) return parsed;

    const updated = await db.menuItem.update({
      where: { id },
      data: {
        ...(parsed.label !== undefined && { label: parsed.label }),
        ...(parsed.url !== undefined && { url: parsed.url }),
        ...(parsed.order !== undefined && { order: parsed.order }),
        ...(parsed.parentId !== undefined && { parentId: parsed.parentId }),
        ...(parsed.pageId !== undefined && { pageId: parsed.pageId }),
      },
    });

    return NextResponse.json(updated);
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
    const existing = await db.menuItem.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Élément introuvable" }, { status: 404 });

    await db.menuItem.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
