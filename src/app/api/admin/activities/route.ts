import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const items = await db.activityItem.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });

  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const item = await db.activityItem.create({
    data: {
      title: body.title,
      description: body.description || null,
      image: body.image || null,
      category: body.category,
      order: body.order ?? 0,
    },
  });

  return NextResponse.json(item, { status: 201 });
}
