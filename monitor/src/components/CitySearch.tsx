import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import type { CitySeriesT } from "@/data/schema";

type Props = {
  cities: CitySeriesT[];
  onPick: (c: CitySeriesT) => void;
};

export default function CitySearch({ cities, onPick }: Props) {
  const [q, setQ] = useState("");
  const fuse = useMemo(
    () =>
      new Fuse(cities, {
        keys: ["name", "country", "id"],
        threshold: 0.3,
        ignoreLocation: true,
      }),
    [cities]
  );

  const results = q
    ? fuse.search(q, { limit: 8 }).map((r) => r.item)
    : cities.slice(0, 8);

  return (
    <div className="card">
      <label className="subtitle block">Where are you from?</label>
      <input
        className="input"
        placeholder="Toronto, Austin, Paris…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="list">
        {results.map((c) => (
          <button key={c.id} className="list-item" onClick={() => onPick(c)}>
            {c.name} <span className="subtitle">({c.country})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
