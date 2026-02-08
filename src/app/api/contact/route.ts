import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
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
