import { Hono } from "hono";
import { logger } from "hono/logger";
import { poweredBy } from "hono/powered-by";
import { xRayTraceId } from "./utils/x-ray-trace-id";


const VERSION = "0.2.0"

export type AppType = typeof route;

export const app = new Hono().basePath("/sw");

// middlewares
app.use(logger());
app.use(poweredBy());
app.use(async (c, next) => {
  c.header("amzn-trace-id-like", xRayTraceId());
  c.header('sw-version', VERSION)
  await next();
});

const route = app
  .get("/version", (c) => c.text(`v${VERSION}`))
  .get("/health", (c) => {
    return c.json({ ok: true, ts: Date.now() });
  });
