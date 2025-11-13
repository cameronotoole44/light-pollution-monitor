import { z } from "zod";

export const CitySeries = z
  .object({
    id: z.string(),
    name: z.string(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
    years: z.array(z.number().int()),
    values: z.array(z.number()),
  })
  .refine((d) => d.years.length === d.values.length, {
    message: "years and values must be same length",
  });

export const CityFile = z.object({
  version: z.number(),
  unit: z.literal("radiance_nW/cm2/sr"),
  cities: z.array(CitySeries),
});

export type CitySeriesT = z.infer<typeof CitySeries>;
export type CityFileT = z.infer<typeof CityFile>;
