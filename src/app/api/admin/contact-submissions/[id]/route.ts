import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const submission = await db.contactSubmission.update({
    where: { id },
    data: { read: body.read },
  });

  return NextResponse.json(submission);
}
