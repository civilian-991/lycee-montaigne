function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  DATABASE_URL: requireEnv("DATABASE_URL"),
  AUTH_SECRET: (() => {
    const secret = requireEnv("AUTH_SECRET");
    if (
      secret === "development-secret-change-in-production" &&
      process.env.NODE_ENV === "production"
    ) {
      throw new Error(
        "AUTH_SECRET must be changed from the development default in production!"
      );
    }
    return secret;
  })(),
  NEXT_PUBLIC_SITE_URL:
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_EMAIL:
    process.env.CONTACT_EMAIL || "info@lycee-montaigne.edu.lb",
} as const;
