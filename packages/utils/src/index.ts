export function toTitleCase(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function passwordStrengthScore(password: string): number {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  return Math.min(score, 5);
}

export function buildAuthQrPayload(input: { identifier: string; password: string; rememberDevice: boolean }): string {
  return JSON.stringify({
    scope: "medix-auth-login",
    identifier: input.identifier.trim().toLowerCase(),
    rememberDevice: input.rememberDevice,
    checksum: `${input.identifier.length}:${input.password.length}`,
  });
}

export function summarizeAuthTarget(identifier: string): string {
  const trimmed = identifier.trim();

  if (!trimmed) {
    return "Waiting for credentials";
  }

  if (trimmed.includes("@")) {
    return trimmed.toLowerCase();
  }

  if (/^\+?[0-9\s()-]+$/.test(trimmed)) {
    const digitsOnly = trimmed.replace(/\D/g, "");
    return digitsOnly.length >= 4 ? `•••• ${digitsOnly.slice(-4)}` : trimmed;
  }

  return trimmed;
}
