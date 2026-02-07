import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const pages = await db.page.findMany({
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { sections: true } } },
  });

  return NextResponse.json(pages);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const page = await db.page.create({
    data: {
      slug: body.slug,
      title: body.title,
      metaDescription: body.metaDescription || null,
      ogImage: body.ogImage || null,
    },
  });

  return NextResponse.json(page, { status: 201 });
}
