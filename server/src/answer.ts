import { Hono } from "hono";
import * as jsdom from "jsdom";

export const answerRoute = new Hono().post("/:year/:day", async (c) => {
  const year = c.req.param("year");
  const day = c.req.param("day");

  const { level, answer } = await c.req.json();

  const response = await fetch(
    `https://adventofcode.com/${year}/day/${day}/answer`,
    {
      method: "POST",
      body: new URLSearchParams({ level, answer }),
      headers: {
        Cookie: process.env.AOC_SESSION_COOKIE || "",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  const text = await response.text();
  console.log(text);
  const { document } = new jsdom.JSDOM(text).window;

  if (document.body.textContent?.includes("That's not the right answer")) {
    return c.json({
      success: false,
    });
  } else if (document.body.textContent?.includes("That's the right answer!")) {
    return c.json({
      success: true,
    });
  }
});
