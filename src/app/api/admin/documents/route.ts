import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const docs = await db.document.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });
  return NextResponse.json(docs);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const doc = await db.document.create({
    data: {
      title: body.title,
      fileUrl: body.fileUrl,
      category: body.category,
      academicYear: body.academicYear,
    },
  });

  return NextResponse.json(doc, { status: 201 });
}
