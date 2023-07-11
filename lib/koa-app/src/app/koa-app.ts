import Koa, { ParameterizedContext } from "koa";

import { api_config } from "@lib/config";

import { BaseMiddleware } from "../middleware/base.middleware";
import { KoaAppOptions } from "./base-app";

export type AppContext = ParameterizedContext;

export class KoaApp {
  public readonly name: string = "koa_app";
  public readonly port: string | number = api_config.api_port;
  public readonly host: string = api_config.api_host;

  constructor(
    private readonly base_server = new Koa(),
    options: Partial<KoaAppOptions>,
  ) {
    if (options.name) this.name = options.name;
    if (options.port) this.port = options.port;
    if (options.host) this.host = options.host;
  }

  register(middleware: BaseMiddleware) {
    this.base_server.use(middleware);
  }

  start() {
    this.base_server.listen(this.port, () => {
      const is_prod = api_config.env === "production";
      const dev_url = `http://${api_config.api_host}:${this.port}`;
      const prod_url = `https://${api_config.api_host}`;
      // eslint-disable-next-line no-console
      console.log(`[env]: ${this.base_server.env}`);
      // eslint-disable-next-line no-console
      console.log(`[hostname]: ${api_config.api_host}`);
      // eslint-disable-next-line no-console
      console.log(`[port]: ${api_config.api_port}`);
      // eslint-disable-next-line no-console
      console.log(`[listening]: ${is_prod ? prod_url : dev_url}`);
    });
  }
}
