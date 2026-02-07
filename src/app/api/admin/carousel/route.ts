import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const slide = await db.carouselSlide.create({
    data: {
      imageUrl: body.imageUrl,
      altText: body.altText || "",
      link: body.link,
      order: body.order ?? 0,
    },
  });

  return NextResponse.json(slide, { status: 201 });
}
