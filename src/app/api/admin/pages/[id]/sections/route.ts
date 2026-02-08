import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { pageSectionSchema } from "@/lib/validations";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const data = pageSectionSchema.parse(body);

    const section = await db.pageSection.create({
      data: {
        pageId: id,
        sectionKey: data.sectionKey,
        title: data.title || null,
        contentHtml: data.contentHtml || null,
        image: data.image || null,
        order: data.order ?? 0,
      },
    });

    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
