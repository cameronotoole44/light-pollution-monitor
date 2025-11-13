import { useEffect, useMemo, useState } from "react";
import { CityFile, type CitySeriesT } from "@/data/schema";
import CitySearch from "@/components/CitySearch";
import YearSlider from "@/components/YearSlider";
import SparkChart from "@/components/SparkChart";
import TrendCard from "@/components/TrendCard";
import MinimalGlow from "@/components/MinimalGlow";

type Row = { year: number; value: number };

export default function Home() {
  const [cities, setCities] = useState<CitySeriesT[]>([]);
  const [picked, setPicked] = useState<CitySeriesT | null>(null);
  const [birthYear, setBirthYear] = useState<number>(2000);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/data/city-timeseries.sample.json", {
          cache: "no-store",
        });
        if (!res.ok) {
          setError(
            "No data file found. Add /public/data/city-timeseries.sample.json"
          );
          return;
        }
        const json = await res.json();
        const parsed = CityFile.parse(json);
        if (cancelled) return;

        setCities(parsed.cities);
        setPicked(parsed.cities[0] ?? null);

        const allYears = parsed.cities.flatMap((c) => c.years);
        if (allYears.length) {
          const minY = Math.min(...allYears);
          const maxY = Math.max(...allYears);
          setBirthYear(Math.min(2000, Math.max(minY, maxY - 20)));
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to load data.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const chartData: Row[] = useMemo(() => {
    if (!picked) return [];
    return picked.years.map((y, i) => ({
      year: y,
      value: picked.values[i] ?? 0,
    }));
  }, [picked]);

  const latestValue = picked
    ? (picked.values[picked.values.length - 1] ?? 0)
    : 0;
  const minYear = useMemo(
    () => (picked ? Math.min(...picked.years) : 1992),
    [picked]
  );
  const maxYear = useMemo(
    () => (picked ? Math.max(...picked.years) : 2024),
    [picked]
  );

  return (
    <div className="container">
      <h1 className="page-title">Light Pollution Monitor</h1>
      <div className="subtitle lead">
        A minimalist look at how your city’s night sky brightness has changed
        over time.
      </div>

      {error && (
        <div className="card error-box">
          <strong>Heads up:</strong> {error}
        </div>
      )}

      <div className="row">
        <div className="stack">
          {!!cities.length && <CitySearch cities={cities} onPick={setPicked} />}

          {picked && (
            <YearSlider
              min={minYear}
              max={maxYear}
              value={Math.max(minYear, Math.min(maxYear, birthYear))}
              onChange={setBirthYear}
            />
          )}

          {picked && (
            <TrendCard
              cityName={picked.name}
              birthYear={birthYear}
              series={picked}
            />
          )}
        </div>

        <div className="stack">
          <MinimalGlow intensity={latestValue / 20} />
          <SparkChart data={chartData} />
        </div>
      </div>
    </div>
  );
}
