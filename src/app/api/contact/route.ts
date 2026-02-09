import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { contactFormSchema } from "@/lib/validations";

// --- In-memory rate limiter ---
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 requests per minute per IP
let requestCounter = 0;

function cleanupRateLimit() {
  const now = Date.now();
  for (const [key, entry] of rateLimit) {
    if (now > entry.resetTime) {
      rateLimit.delete(key);
    }
  }
}

export async function POST(request: Request) {
  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (entry && now < entry.resetTime) {
    if (entry.count >= RATE_LIMIT_MAX) {
      return NextResponse.json(
        { error: "Trop de requêtes. Veuillez réessayer dans une minute." },
        { status: 429 },
      );
    }
    entry.count++;
  } else {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  }

  // Periodic cleanup to prevent memory leaks (every 100 requests)
  requestCounter++;
  if (requestCounter >= 100) {
    requestCounter = 0;
    cleanupRateLimit();
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
