export function toCamelCase(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    result[camelKey] =
      value !== null && typeof value === "object" && !Array.isArray(value)
        ? toCamelCase(value as Record<string, unknown>)
        : value;
  }
  return result;
}

export function toSnakeCase(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    result[snakeKey] =
      value !== null && typeof value === "object" && !Array.isArray(value)
        ? toSnakeCase(value as Record<string, unknown>)
        : value;
  }
  return result;
}

export function toCamelArray<T extends Record<string, unknown>>(
  arr: T[],
): Record<string, unknown>[] {
  return arr.map((item) => toCamelCase(item));
}
