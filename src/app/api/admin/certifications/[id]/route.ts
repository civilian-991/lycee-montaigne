import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { certificationSchema } from "@/lib/validations";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const item = await db.certification.findUnique({ where: { id } });
    if (!item) return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    return NextResponse.json(item);
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
    const data = certificationSchema.parse(body);
    const item = await db.certification.update({
      where: { id },
      data: {
        name: data.name,
        image: data.image || null,
        description: data.description || null,
        order: data.order ?? 0,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides", details: error.issues }, { status: 400 });
    }
    if (error instanceof Error && error.message.includes("Record to update not found")) {
      return NextResponse.json({ error: "Certification introuvable" }, { status: 404 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const existing = await db.certification.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Certification introuvable" }, { status: 404 });

    await db.certification.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
