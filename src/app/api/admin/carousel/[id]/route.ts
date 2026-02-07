import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await params;
  const { imageUrl, altText, link, order } = await req.json();

  const updated = await db.carouselSlide.update({
    where: { id },
    data: {
      ...(imageUrl !== undefined && { imageUrl }),
      ...(altText !== undefined && { altText }),
      ...(link !== undefined && { link }),
      ...(order !== undefined && { order }),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await params;
  await db.carouselSlide.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
