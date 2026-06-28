import path from "path";

/** Slugs permitidos: kebab-case alfanumérico (ex.: kafka-introducao). */
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const ALLOWED_URL_PROTOCOLS = new Set(["http:", "https:", "mailto:"]);

export function isValidSlug(slug: string): boolean {
  if (!slug || slug.length > 128) {
    return false;
  }

  return SLUG_PATTERN.test(slug);
}

/**
 * Resolve um caminho garantindo que permanece dentro do diretório base.
 * Retorna null se houver tentativa de path traversal.
 */
export function resolvePathWithinBase(
  baseDir: string,
  ...segments: string[]
): string | null {
  const normalizedBase = path.resolve(baseDir);
  const resolved = path.resolve(normalizedBase, ...segments);
  const relative = path.relative(normalizedBase, resolved);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return null;
  }

  return resolved;
}

/** Bloqueia URLs com schemes perigosos (javascript:, data:, etc.). */
export function isSafeExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_URL_PROTOCOLS.has(parsed.protocol);
  } catch {
    return false;
  }
}

export const SECURITY_HEADERS = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; "),
  },
] as const;
