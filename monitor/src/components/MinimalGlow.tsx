export default function MinimalGlow({ intensity }: { intensity: number }) {
  const clamped = Math.min(1, Math.max(0, intensity)); // 0..1
  const size = 200 + clamped * 260;
  const blur = 40 + clamped * 80;
  const alpha = 0.15 + clamped * 0.35;

  return (
    <div className="card glow-card">
      <div
        className="glow-ball"
        style={
          {
            "--glow-size": `${size}px`,
            "--glow-blur": `${blur}px`,
            "--glow-alpha": alpha,
          } as React.CSSProperties
        }
        aria-label="City glow visualization"
      />
      <div className="subtitle glow-note">
        Minimal city glow (higher radiance → brighter / larger halo)
      </div>
    </div>
  );
}
