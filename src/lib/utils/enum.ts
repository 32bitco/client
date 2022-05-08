export function variantFromValue(enumerable: object, value: unknown): string {
  return Object.keys(enumerable)[Object.values(enumerable).indexOf(value)] as string;
}
