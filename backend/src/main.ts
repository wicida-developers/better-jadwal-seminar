import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { d1Database } from "./lib/d1-database";
import { scheduler } from "./scheduler";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(logger());
app.use(cors({ origin: "*" }));

app.get("/seminars", async (c) => {
  try {
    const db = d1Database(c.env.DB);

    const total = await db.seminar.count();
    const page = Number(c.req.query("page")) || 1;
    const limit = Number(c.req.query("limit")) || 10;
    const offset = (page - 1) * limit;
    const pageCount = Math.ceil(total / limit);

    const seminars = await db.seminar.get(limit, offset);
    const lastUpdated = await db.KV.get("last_updated");

    return c.json({
      success: true,
      meta: {
        limit,
        page,
        pageCount,
      },
      data: {
        lastUpdated,
        seminars,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return c.json(
        {
          success: false,
          message: error.message,
        },
        500
      );
    }
  }
});

export default {
  fetch: app.fetch,
  scheduled: scheduler,
};
