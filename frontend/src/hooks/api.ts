import { queryOptions } from "@tanstack/react-query";

export const getStarsQueryOptions = (year: string) =>
  queryOptions<number[]>({
    queryKey: ["get-stars", year],
    queryFn: () =>
      fetch(`/api/stars/${year}`).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch stars");
        return res.json();
      }),
  });
export const getInputsQueryOptions = (year: string, day: string) =>
  queryOptions<string>({
    queryKey: ["get-inputs", year, day],
    queryFn: () =>
      fetch(`/api/inputs/${year}/${day}`).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch inputs");
        return res.text();
      }),
  });
