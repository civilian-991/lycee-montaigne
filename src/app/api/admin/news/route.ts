import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const items = await db.newsItem.findMany({ orderBy: { publishedAt: "desc" } });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const item = await db.newsItem.create({
    data: {
      title: body.title,
      image: body.image,
      link: body.link,
      category: body.category,
    },
  });

  return NextResponse.json(item, { status: 201 });
}
