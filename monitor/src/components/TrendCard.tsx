import { percentChange } from "@/lib/percentChange";

type Series = { years: number[]; values: number[] };

export default function TrendCard({
  cityName,
  birthYear,
  series,
}: {
  cityName: string;
  birthYear: number;
  series: Series;
}) {
  const { years, values } = series;
  const firstIdx = years.findIndex((y) => y >= birthYear);
  const lastIdx = years.length - 1;

  const start = firstIdx >= 0 ? (values[firstIdx] ?? values[0]) : values[0];
  const end = values[lastIdx] ?? values[values.length - 1];
  const pct = percentChange(start, end);

  return (
    <div className="card">
      <div className="subtitle">
        Since you were born in <strong>{birthYear}</strong>…
      </div>
      <h2 className="h2">{cityName}</h2>
      <div>
        Average radiance changed from{" "}
        <span className="accent">{start.toFixed(1)}</span> to{" "}
        <span className="accent">{end.toFixed(1)}</span> nW/cm²/sr
      </div>
      <div className="mt-8">
        That’s a{" "}
        <strong className="accent">
          {Number.isFinite(pct) ? `${pct.toFixed(1)}%` : "—"}
        </strong>{" "}
        change.
      </div>
      <div className="subtitle mt-8">
        Higher radiance ≈ brighter skies at night → fewer visible stars.
      </div>
    </div>
  );
}
