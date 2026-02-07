import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const items = await db.certification.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const item = await db.certification.create({
    data: {
      name: body.name,
      image: body.image || null,
      description: body.description || null,
      order: body.order ?? 0,
    },
  });

  return NextResponse.json(item, { status: 201 });
}
