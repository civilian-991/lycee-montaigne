import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { pageSectionSchema } from "@/lib/validations";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; sectionId: string }> }
) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { sectionId } = await params;
    const body = await req.json();
    const data = pageSectionSchema.parse(body);

    const section = await db.pageSection.update({
      where: { id: sectionId },
      data: {
        sectionKey: data.sectionKey,
        title: data.title || null,
        contentHtml: data.contentHtml || null,
        image: data.image || null,
        order: data.order ?? 0,
      },
    });

    return NextResponse.json(section);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides", details: error.issues }, { status: 400 });
    }
    if (error instanceof Error && error.message.includes("Record to update not found")) {
      return NextResponse.json({ error: "Section introuvable" }, { status: 404 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; sectionId: string }> }
) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { sectionId } = await params;
    const existing = await db.pageSection.findUnique({ where: { id: sectionId } });
    if (!existing) return NextResponse.json({ error: "Section introuvable" }, { status: 404 });

    await db.pageSection.delete({ where: { id: sectionId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
