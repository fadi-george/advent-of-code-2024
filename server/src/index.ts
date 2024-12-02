import { Hono } from "hono";
import { starsRoute } from "./stars";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", logger());

app.basePath("/api").route("/stars", starsRoute);

export default {
  port: 8080,
  fetch: app.fetch,
};
