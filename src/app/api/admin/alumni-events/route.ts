import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { alumniEventSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";
import { cleanHtmlNullable } from "@/lib/sanitize";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const search = (searchParams.get("search") || "").trim();

    const where = search
      ? { title: { contains: search, mode: "insensitive" as const } }
      : {};

    const events = await db.alumniEvent.findMany({
      where,
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
    const csrfError = checkOrigin(req);
    if (csrfError) return csrfError;

    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const parsed = await parseBody(req, alumniEventSchema);
    if (parsed instanceof NextResponse) return parsed;

    const event = await db.alumniEvent.create({
      data: {
        title: parsed.title,
        date: new Date(parsed.date),
        descriptionHtml: cleanHtmlNullable(parsed.descriptionHtml),
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
