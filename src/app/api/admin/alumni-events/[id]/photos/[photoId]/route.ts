import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; photoId: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { photoId } = await params;
  const body = await req.json();

  const photo = await db.alumniPhoto.update({
    where: { id: photoId },
    data: {
      imageUrl: body.imageUrl,
      altText: body.altText,
      order: body.order,
    },
  });

  return NextResponse.json(photo);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; photoId: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { photoId } = await params;
  await db.alumniPhoto.delete({ where: { id: photoId } });
  return NextResponse.json({ success: true });
}
