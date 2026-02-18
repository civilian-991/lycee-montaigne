import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { contactFormSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const rl = checkRateLimit(`contact:${ip}`);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Trop de requêtes. Veuillez réessayer dans une minute." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) } },
    );
  }

  try {
    const body = await request.json();
    const data = contactFormSchema.parse(body);

    await db.contactSubmission.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim(),
        subject: data.subject?.trim() ?? null,
        message: data.message.trim(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
