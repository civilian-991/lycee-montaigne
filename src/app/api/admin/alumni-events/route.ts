import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const events = await db.alumniEvent.findMany({
    orderBy: { date: "desc" },
    include: {
      _count: { select: { photos: true } },
    },
  });

  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const event = await db.alumniEvent.create({
    data: {
      title: body.title,
      date: new Date(body.date),
      descriptionHtml: body.descriptionHtml || null,
    },
  });

  return NextResponse.json(event, { status: 201 });
}
