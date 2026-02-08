import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { pageSchema } from "@/lib/validations";

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
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const data = pageSchema.parse(body);
    const page = await db.page.update({
      where: { id },
      data: {
        slug: data.slug,
        title: data.title,
        metaDescription: data.metaDescription || null,
        ogImage: data.ogImage || null,
      },
    });

    return NextResponse.json(page);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides", details: error.issues }, { status: 400 });
    }
    if (error instanceof Error && error.message.includes("Record to update not found")) {
      return NextResponse.json({ error: "Page introuvable" }, { status: 404 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const existing = await db.page.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Page introuvable" }, { status: 404 });

    await db.page.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
