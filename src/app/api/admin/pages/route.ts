import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { pageSchema } from "@/lib/validations";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const pages = await db.page.findMany({
      orderBy: { updatedAt: "desc" },
      include: { _count: { select: { sections: true } } },
    });

    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const body = await req.json();
    const data = pageSchema.parse(body);
    const page = await db.page.create({
      data: {
        slug: data.slug,
        title: data.title,
        metaDescription: data.metaDescription || null,
        ogImage: data.ogImage || null,
      },
    });

    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
