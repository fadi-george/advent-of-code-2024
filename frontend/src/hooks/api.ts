import { queryOptions } from "@tanstack/react-query";

export const getStarsQueryOptions = queryOptions<number[]>({
  queryKey: ["get-stars"],
  queryFn: () =>
    fetch("/api/stars").then((res) => {
      if (!res.ok) throw new Error("Failed to fetch stars");
      return res.json();
    }),
});
