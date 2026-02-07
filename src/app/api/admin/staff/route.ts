import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const member = await db.staffMember.create({
    data: {
      name: body.name,
      title: body.title,
      photo: body.photo,
      messageHtml: body.messageHtml,
      section: body.section,
    },
  });

  return NextResponse.json(member, { status: 201 });
}
