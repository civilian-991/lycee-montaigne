import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PUT(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const entries = Object.entries(body) as [string, string][];

  await Promise.all(
    entries.map(([key, value]) =>
      db.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    )
  );

  return NextResponse.json({ success: true });
}
