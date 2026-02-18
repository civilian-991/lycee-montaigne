import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { carouselSchema } from "@/lib/validations";
import { parseBody, checkOrigin } from "@/lib/api-utils";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const slides = await db.carouselSlide.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(slides);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const csrfError = checkOrigin(req);
    if (csrfError) return csrfError;

    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const parsed = await parseBody(req, carouselSchema);
    if (parsed instanceof NextResponse) return parsed;

    const slide = await db.carouselSlide.create({
      data: {
        imageUrl: parsed.imageUrl,
        altText: parsed.altText || "",
        link: parsed.link ?? null,
        order: parsed.order ?? 0,
      },
    });

    return NextResponse.json(slide, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
