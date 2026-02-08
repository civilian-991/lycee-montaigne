import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { staffSchema } from "@/lib/validations";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const staff = await db.staffMember.findMany({
      orderBy: [{ section: "asc" }, { order: "asc" }],
    });

    return NextResponse.json(staff);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const body = await req.json();
    const data = staffSchema.parse(body);
    const member = await db.staffMember.create({
      data: {
        name: data.name,
        title: data.title,
        photo: data.photo ?? null,
        messageHtml: data.messageHtml ?? null,
        section: data.section,
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
