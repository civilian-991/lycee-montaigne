import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { del } from "@vercel/blob";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: "URL requise" }, { status: 400 });

  await del(url);
  return NextResponse.json({ success: true });
}
