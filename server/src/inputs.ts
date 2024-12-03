import { Hono } from "hono";

export const inputsRoute = new Hono()
  .get("/:year/:day", async (c) => {
    const year = c.req.param("year");
    const day = c.req.param("day");
    const response = await fetch(
      `https://adventofcode.com/${year}/day/${day}/input`,
      {
        headers: {
          Cookie: process.env.AOC_SESSION_COOKIE || "",
        },
      }
    );

    const input = await response.text();
    return c.text(input);
  })
  .post("/:year/:day", async (c) => {
    const year = c.req.param("year");
    const day = c.req.param("day");
    const query = c.req.query("type") ?? "js";

    const { input } = await c.req.json();

    if (query === "js") {
      const { default: run } = (await import(
        `../../aoc/${year}/day${day}/index.ts`
      )) as {
        default: (input: string) => {
          part1: string;
          part2: string;
        };
      };

      const start = performance.now();
      const res = run(input);
      const end = performance.now();

      return c.json({
        ...res,
        runTime: end - start,
      });
    }

    return c.text("test");
  });
