import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const section = await db.pageSection.create({
    data: {
      pageId: id,
      sectionKey: body.sectionKey,
      title: body.title || null,
      contentHtml: body.contentHtml || null,
      image: body.image || null,
      order: body.order ?? 0,
    },
  });

  return NextResponse.json(section, { status: 201 });
}
