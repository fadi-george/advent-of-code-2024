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
      type: "incorrect",
    });
  }
  if (document.body.textContent?.includes("That's the right answer!")) {
    return c.json({
      success: true,
      type: "correct",
    });
  }
  // answered too quickly
  if (document.body.textContent?.includes("You gave an answer too recently")) {
    const match = document.body.textContent?.match(
      /You have (?:(\d+)m\s*)?(\d+)s left to wait/
    );
    const minutes = match?.[1] ? parseInt(match[1]) : 0;
    const seconds = match?.[2] ? parseInt(match[2]) : 0;
    return c.json({
      success: false,
      type: "delay",
      waitTime: minutes * 60 + seconds,
    });
  }

  return c.json({
    success: false,
    type: "unknown",
  });
});
