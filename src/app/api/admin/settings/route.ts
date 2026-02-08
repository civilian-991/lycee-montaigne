import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { settingsSchema } from "@/lib/validations";

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const body = await req.json();
    const data = settingsSchema.parse(body);
    const entries = Object.entries(data) as [string, string][];

    await Promise.all(
      entries.map(([key, value]) =>
        db.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
