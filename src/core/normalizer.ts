/**
 * Normalizer utility to safely clean and standardize identifiers.
 * Rules:
 * - Empty / null / whitespace-only values must NOT connect accounts.
 * - Phone numbers with dashes, spaces, or leading/trailing whitespace are normalized to digits.
 */

export function normalizePhone(phone?: string | null): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, '');
  return digits.length > 0 ? digits : null;
}

export function normalizeIdentifier(val?: string | null): string | null {
  if (!val) return null;
  const trimmed = val.trim();
  return trimmed.length > 0 ? trimmed.toLowerCase() : null;
}
