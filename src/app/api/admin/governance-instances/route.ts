import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { governanceInstanceSchema } from "@/lib/validations";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const items = await db.governanceInstance.findMany({
      orderBy: { order: "asc" },
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
    const data = governanceInstanceSchema.parse(body);
    const item = await db.governanceInstance.create({
      data: {
        slug: data.slug,
        title: data.title,
        subtitle: data.subtitle,
        iconName: data.iconName,
        accentColor: data.accentColor,
        descriptionHtml: data.descriptionHtml,
        compositionHtml: data.compositionHtml,
        membersJson: data.membersJson ?? null,
        meetingFrequency: data.meetingFrequency ?? null,
        presidence: data.presidence ?? null,
        responsibilitiesHtml: data.responsibilitiesHtml,
        order: data.order,
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
