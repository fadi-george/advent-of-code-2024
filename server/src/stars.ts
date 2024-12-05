import { Hono } from "hono";
import * as jsdom from "jsdom";

const MAX_DAYS = 25;

export const starsRoute = new Hono().get("/:year", async (c) => {
  const year = c.req.param("year");

  const response = await fetch(`https://adventofcode.com/${year}`, {
    headers: {
      Cookie: process.env.AOC_SESSION_COOKIE || "",
    },
  });
  const text = await response.text();
  const { document } = new jsdom.JSDOM(text).window;

  const stars = new Array(MAX_DAYS).fill(0);
  const dayEls = document.querySelectorAll('a[class^="calendar-day"]');
  dayEls.forEach((dayEl, i) => {
    const dayIndex = dayEl.classList.toString().match(/\d+/)?.[0];
    let count = 0;
    if (dayEl.classList.contains("calendar-verycomplete")) {
      count = 2;
    } else if (dayEl.classList.contains("calendar-complete")) {
      count = 1;
    }
    if (dayIndex) {
      stars[+dayIndex - 1] = count;
    }
  });

  return c.json(stars);
});
