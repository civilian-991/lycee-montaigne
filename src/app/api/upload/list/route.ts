import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { list } from "@vercel/blob";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { blobs } = await list();
    return NextResponse.json(blobs);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
