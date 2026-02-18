const MAX_MAP_SIZE = 10_000;
const MAX_TTL_MS = 15 * 60 * 1000; // 15 minutes

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

function cleanup() {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetTime) {
      store.delete(key);
    }
  }
}

/**
 * Simple in-memory rate limiter.
 * Returns { allowed: true } if the request is within limits,
 * or { allowed: false, retryAfterMs } if rate-limited.
 */
export function checkRateLimit(
  key: string,
  opts: { windowMs?: number; max?: number } = {}
): { allowed: true } | { allowed: false; retryAfterMs: number } {
  const windowMs = Math.min(opts.windowMs ?? 60_000, MAX_TTL_MS);
  const max = opts.max ?? 5;
  const now = Date.now();

  // Cleanup on every call (cheap iteration for small maps)
  cleanup();

  // Evict oldest entries if map is too large
  if (store.size > MAX_MAP_SIZE) {
    const excess = store.size - MAX_MAP_SIZE;
    const iter = store.keys();
    for (let i = 0; i < excess; i++) {
      const next = iter.next();
      if (!next.done) store.delete(next.value);
    }
  }

  const entry = store.get(key);

  if (entry && now < entry.resetTime) {
    if (entry.count >= max) {
      return { allowed: false, retryAfterMs: entry.resetTime - now };
    }
    entry.count++;
    return { allowed: true };
  }

  store.set(key, { count: 1, resetTime: now + windowMs });
  return { allowed: true };
}
