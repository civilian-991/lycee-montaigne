import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; sectionId: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { sectionId } = await params;
  const body = await req.json();

  const section = await db.pageSection.update({
    where: { id: sectionId },
    data: {
      sectionKey: body.sectionKey,
      title: body.title || null,
      contentHtml: body.contentHtml || null,
      image: body.image || null,
      order: body.order ?? 0,
    },
  });

  return NextResponse.json(section);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; sectionId: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { sectionId } = await params;
  await db.pageSection.delete({ where: { id: sectionId } });
  return NextResponse.json({ success: true });
}
