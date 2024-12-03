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
export const getInputsQueryOptions = queryOptions<Record<string, string>>({
  queryKey: ["get-inputs"],
  queryFn: () =>
    fetch("/api/inputs").then((res) => {
      if (!res.ok) throw new Error("Failed to fetch inputs");
      return res.json();
    }),
});
