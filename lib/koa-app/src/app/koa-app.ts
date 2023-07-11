import Koa from "koa";
import KoaRouter from "koa-router";

import { SERVER_ERROR } from "@lib/utility";

import type { BaseMiddleware } from "../types";

export type KoaAppOptions = {
  is_production: boolean;
  name: string;
  port: string | number;
  host: string;
};

export class KoaApp {
  public readonly base_server = new Koa();
  public readonly is_production: boolean = false;
  public readonly print_errors: boolean = true;
  public root_path = "";

  public readonly base_router: KoaRouter;

  public readonly name: string = "koa_app";
  public readonly port: string | number = 3000;
  public readonly host: string = "localhost";

  constructor(options: Partial<KoaAppOptions>) {
    if (options.name) this.name = options.name;
    if (options.port) this.port = options.port;
    if (options.host) this.host = options.host;
    if (require.main) this.root_path = require.main.path;

    this.base_router = new KoaRouter();
  }

  registerMiddleware(middleware: BaseMiddleware) {
    this.base_server.use(middleware);
  }

  registerController(path: string, router: KoaRouter) {
    this.base_router.use(path, router.routes());
  }

  start() {
    this.base_server.use(this.base_router.routes());
    this.base_server.use(async (ctx, next) => {
      // eslint-disable-next-line no-console
      // console.log(ctx.router);
      await next();
      // eslint-disable-next-line no-console
      // console.log(ctx.router);
      if (ctx.router.matched) return;
      ctx.throw(
        SERVER_ERROR.NOT_IMPLEMENTED.status,
        SERVER_ERROR.NOT_IMPLEMENTED.message,
      );
    });
    this.base_server.listen(this.port, () => {
      const dev_url = `http://${this.host}:${this.port}`;
      const prod_url = `https://${this.host}`;
      // eslint-disable-next-line no-console
      console.log(`[env]: ${this.base_server.env}`);
      // eslint-disable-next-line no-console
      console.log(`[hostname]: ${this.host}`);
      // eslint-disable-next-line no-console
      console.log(`[port]: ${this.port}`);
      // eslint-disable-next-line no-console
      console.log(`[listening]: ${this.is_production ? prod_url : dev_url}`);
    });
  }
}
