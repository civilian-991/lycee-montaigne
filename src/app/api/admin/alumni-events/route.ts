import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { alumniEventSchema } from "@/lib/validations";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const events = await db.alumniEvent.findMany({
      orderBy: { date: "desc" },
      include: {
        _count: { select: { photos: true } },
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const body = await req.json();
    const data = alumniEventSchema.parse(body);
    const event = await db.alumniEvent.create({
      data: {
        title: data.title,
        date: new Date(data.date),
        descriptionHtml: data.descriptionHtml || null,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
