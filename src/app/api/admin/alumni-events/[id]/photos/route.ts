import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const photo = await db.alumniPhoto.create({
    data: {
      eventId: id,
      imageUrl: body.imageUrl,
      altText: body.altText || "",
      order: body.order ?? 0,
    },
  });

  return NextResponse.json(photo, { status: 201 });
}
