import { NextResponse } from "next/server";
import type { ZodSchema } from "zod";

/**
 * Safe JSON body parser with Zod validation.
 * Returns parsed data on success, or a NextResponse error on failure.
 */
export async function parseBody<T>(
  req: Request,
  schema: ZodSchema<T>
): Promise<T | NextResponse> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requete invalide" },
      { status: 400 }
    );
  }
  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Donnees invalides", details: result.error.flatten() },
      { status: 400 }
    );
  }
  return result.data;
}

/**
 * CSRF Origin check for mutation requests (POST, PUT, DELETE, PATCH).
 * Returns a 403 NextResponse if the Origin header does not match the Host,
 * or null if the request is safe to proceed.
 */
export function checkOrigin(req: Request): NextResponse | null {
  if (["POST", "PUT", "DELETE", "PATCH"].includes(req.method)) {
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    if (!origin || !host) {
      return NextResponse.json(
        { error: "Origine non autorisee" },
        { status: 403 }
      );
    }
    try {
      const originUrl = new URL(origin);
      if (originUrl.host !== host) {
        return NextResponse.json(
          { error: "Origine non autorisee" },
          { status: 403 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Origine non autorisee" },
        { status: 403 }
      );
    }
  }
  return null;
}
