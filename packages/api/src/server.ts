import { convertSchema } from "@sodaru/yup-to-json-schema";

import { CorsMiddleware, KoaApp, LoggerMiddleware } from "@lib/koa-app";
import { api_config } from "@lib/config";
import { dealSchema } from "@lib/schema-validator/deal";

import { configure_routes } from "./route.config";

const app = new KoaApp({
  is_production: api_config.env === "production",
  name: api_config.appname,
  port: api_config.api_port,
  host: api_config.api_host,
});

app.registerMiddleware(LoggerMiddleware());

app.registerMiddleware(
  CorsMiddleware({
    origin: "localhost",
  }),
);

configure_routes(app).then(() => {
  app.start();
});
