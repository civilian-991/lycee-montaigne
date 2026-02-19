import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Upstash rate limiting result type
interface RateLimitResult {
  allowed: boolean;
  retryAfterMs?: number;
}

const hasUpstashConfig =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

if (!hasUpstashConfig) {
  console.warn(
    "[rate-limit] UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not set. " +
      "Rate limiting is disabled — all requests will be allowed."
  );
}

const redis = hasUpstashConfig
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

// Auth rate limiter: 5 attempts per 15 minutes
export const authLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      prefix: "ratelimit:auth",
    })
  : null;

// Contact form rate limiter: 3 per hour
export const contactLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "1 h"),
      prefix: "ratelimit:contact",
    })
  : null;

/**
 * Check rate limit using an Upstash Ratelimit instance.
 * Falls back to allowing all requests if Upstash is not configured (local dev).
 */
export async function checkRateLimit(
  limiter: Ratelimit | null,
  key: string
): Promise<RateLimitResult> {
  if (!limiter) {
    return { allowed: true };
  }

  try {
    const { success, reset } = await limiter.limit(key);
    if (success) {
      return { allowed: true };
    }
    const retryAfterMs = Math.max(0, reset - Date.now());
    return { allowed: false, retryAfterMs };
  } catch (error) {
    // If Upstash is unreachable, fail open so the app stays usable
    console.error("[rate-limit] Upstash error, allowing request:", error);
    return { allowed: true };
  }
}
