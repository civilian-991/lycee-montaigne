import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { staffSchema } from "@/lib/validations";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const member = await db.staffMember.findUnique({ where: { id } });
    if (!member) return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    return NextResponse.json(member);
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
    const data = staffSchema.parse(body);
    const member = await db.staffMember.update({
      where: { id },
      data: {
        name: data.name,
        title: data.title,
        photo: data.photo ?? null,
        messageHtml: data.messageHtml ?? null,
        section: data.section,
      },
    });

    return NextResponse.json(member);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides", details: error.issues }, { status: 400 });
    }
    if (error instanceof Error && error.message.includes("Record to update not found")) {
      return NextResponse.json({ error: "Membre introuvable" }, { status: 404 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const existing = await db.staffMember.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Membre introuvable" }, { status: 404 });

    await db.staffMember.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
