import { Hono } from "hono";
import * as jsdom from "jsdom";

export const starsRoute = new Hono().get("/", async (c) => {
  const response = await fetch("https://adventofcode.com", {
    headers: {
      Cookie: process.env.AOC_SESSION_COOKIE || "",
    },
  });
  const text = await response.text();
  const { document } = new jsdom.JSDOM(text).window;

  const stars = new Array(25).fill(0);
  const days = document.querySelectorAll('a[class^="calendar-day"]');
  days.forEach((day, i) => {
    const starCount = day.querySelectorAll('[class^="calendar-mark"]').length;
    stars[i] = starCount;
  });

  return c.json(stars);
});
