import Fuse from "fuse.js";
import type { CitySeriesT } from "../data/schema";

export function makeCityIndex(cities: CitySeriesT[]) {
  return new Fuse(cities, {
    keys: ["name", "country", "id"],
    threshold: 0.3,
    ignoreLocation: true,
  });
}
