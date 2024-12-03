import { Hono } from "hono";

export const inputsRoute = new Hono().get("/:year/:day", async (c) => {
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

  const text = await response.text();
  console.log(text);

  return c.json({});
});
