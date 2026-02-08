import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { documentSchema } from "@/lib/validations";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const data = documentSchema.parse(body);

    const doc = await db.document.update({
      where: { id },
      data: {
        title: data.title,
        fileUrl: data.fileUrl,
        category: data.category,
        academicYear: data.academicYear || null,
      },
    });

    return NextResponse.json(doc);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides", details: error.issues }, { status: 400 });
    }
    if (error instanceof Error && error.message.includes("Record to update not found")) {
      return NextResponse.json({ error: "Document introuvable" }, { status: 404 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const existing = await db.document.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Document introuvable" }, { status: 404 });

    await db.document.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
