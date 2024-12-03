import { Hono } from "hono";
import { starsRoute } from "./stars";
import { logger } from "hono/logger";
import { inputsRoute } from "./inputs";

const app = new Hono();

app.use("*", logger());
app.basePath("/api").route("/stars", starsRoute).route("/inputs", inputsRoute);

export default {
  port: 8080,
  fetch: app.fetch,
};
