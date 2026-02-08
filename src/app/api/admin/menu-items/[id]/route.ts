import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { menuItemSchema } from "@/lib/validations";

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
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const data = menuItemSchema.partial().parse(body);

    const updated = await db.menuItem.update({
      where: { id },
      data: {
        ...(data.label !== undefined && { label: data.label }),
        ...(data.url !== undefined && { url: data.url }),
        ...(data.order !== undefined && { order: data.order }),
        ...(data.parentId !== undefined && { parentId: data.parentId }),
        ...(data.pageId !== undefined && { pageId: data.pageId }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides", details: error.issues }, { status: 400 });
    }
    if (error instanceof Error && error.message.includes("Record to update not found")) {
      return NextResponse.json({ error: "Élément introuvable" }, { status: 404 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const existing = await db.menuItem.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Élément introuvable" }, { status: 404 });

    // Delete children first, then the parent
    await db.menuItem.deleteMany({ where: { parentId: id } });
    await db.menuItem.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
