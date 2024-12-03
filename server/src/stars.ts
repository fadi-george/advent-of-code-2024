import { Hono } from "hono";
import * as jsdom from "jsdom";

export const starsRoute = new Hono().get("/:year", async (c) => {
  const year = c.req.param("year");

  const response = await fetch(`https://adventofcode.com/${year}`, {
    headers: {
      Cookie: process.env.AOC_SESSION_COOKIE || "",
    },
  });
  const text = await response.text();
  const { document } = new jsdom.JSDOM(text).window;

  const stars = new Array(25).fill(0);
  const dayEls = document.querySelectorAll('a[class^="calendar-day"]');
  dayEls.forEach((dayEl, i) => {
    let count = 0;
    if (dayEl.classList.contains("calendar-verycomplete")) {
      count = 2;
    } else if (dayEl.classList.contains("calendar-complete")) {
      count = 1;
    }
    stars[i] = count;
  });

  return c.json(stars);
});
