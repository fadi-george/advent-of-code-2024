import { Hono } from "hono";

export const answerRoute = new Hono().post("/:year/:day", async (c) => {
  const year = c.req.param("year");
  const day = c.req.param("day");

  const { level, answer } = await c.req.json();

  const response = await fetch(
    `https://adventofcode.com./${year}/day/${day}/answer`,
    {
      method: "POST",
      body: JSON.stringify({
        level,
        answer,
      }),
      headers: {
        Cookie: process.env.AOC_SESSION_COOKIE || "",
      },
    }
  );

  return c.json(await response.json());
});
