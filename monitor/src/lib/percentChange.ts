export function percentChange(from: number, to: number): number {
  if (from === 0) return Infinity;
  return ((to - from) / Math.abs(from)) * 100;
}
