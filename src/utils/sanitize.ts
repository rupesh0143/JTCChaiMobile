export const sanitizeText = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/onerror=/gi, '')
    .replace(/onload=/gi, '')
    .replace(/["'`;\\\\]/g, '')
    .trim();
};

export const sanitizeEmail = (email: string): string => {
  return sanitizeText(email).toLowerCase();
};

export const sanitizeNumber = (value: unknown): number => {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    return 0;
  }

  return parsed;
};