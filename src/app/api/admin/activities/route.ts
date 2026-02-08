import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { activitySchema } from "@/lib/validations";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const items = await db.activityItem.findMany({
      orderBy: [{ category: "asc" }, { order: "asc" }],
    });

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const body = await req.json();
    const data = activitySchema.parse(body);
    const item = await db.activityItem.create({
      data: {
        title: data.title,
        description: data.description || null,
        image: data.image || null,
        category: data.category,
        order: data.order ?? 0,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
