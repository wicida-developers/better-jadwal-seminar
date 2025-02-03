import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import routes from "./routes";
import { scheduler } from "./scheduler";

const app = new Hono();

app.use(logger());
app.use(cors({ origin: "*" }));

app.route("/", routes);

export default {
  fetch: app.fetch,
  scheduled: scheduler,
};
