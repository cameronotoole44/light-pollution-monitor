export function clampYear(y: number, min: number, max: number) {
  return Math.max(min, Math.min(max, y));
}
