import { KoaApp } from "@lib/koa-app";
import { api_config } from "@lib/config";

import { load_routes } from "./route.config";

const app = new KoaApp({
  is_production: api_config.env === "production",
  name: api_config.appname,
  port: api_config.api_port,
  host: api_config.api_host,
});

load_routes(app).then(() => {
  app.start();
});
