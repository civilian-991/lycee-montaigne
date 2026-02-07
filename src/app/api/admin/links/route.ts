import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const link = await db.quickLink.create({
    data: {
      label: body.label,
      url: body.url,
      target: body.target || "_self",
      order: body.order ?? 0,
    },
  });

  return NextResponse.json(link, { status: 201 });
}
