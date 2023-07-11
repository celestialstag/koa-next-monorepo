import KoaJSON from "koa-json";

import type { Next } from "koa";

import { AppContext } from "../app";
import { BaseMiddlewareConstructor } from "./base.middleware";

type JsonMiddlewareOptions = {
  pretty: boolean;
  param: string;
  spaces: number;
};

export const JsonMiddleware: BaseMiddlewareConstructor<
  JsonMiddlewareOptions
> = (options = { pretty: false, param: "pretty" }) => {
  return async (ctx: AppContext, next: Next) => {
    await KoaJSON({ pretty: false, param: "pretty", ...options })(ctx, next);
  };
};
