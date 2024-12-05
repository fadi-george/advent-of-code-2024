import { Hono } from "hono";
import { starsRoute } from "./stars";
import { logger } from "hono/logger";
import { inputsRoute } from "./inputs";
import { answerRoute } from "./answer";
import "../../aoc/lib/array";

const app = new Hono();

app.use("*", logger());
app
  .basePath("/api")
  .route("/stars", starsRoute)
  .route("/inputs", inputsRoute)
  .route("/answer", answerRoute);

export default {
  port: 8080,
  fetch: app.fetch,
};
