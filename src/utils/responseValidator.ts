export const isValidArray = (data: unknown): boolean => {
  return Array.isArray(data);
};

export const isValidObject = (
  data: unknown,
): data is Record<string, unknown> => {
  return typeof data === 'object' && data !== null;
};