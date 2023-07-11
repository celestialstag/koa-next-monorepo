import KoaJSON from "koa-json";
import type { Next } from "koa";

import type { AppContext, BaseMiddlewareConstructor } from "../types";

type JsonMiddlewareOptions = {
  pretty: boolean;
  param: string;
  spaces: number;
};

export const JsonMiddleware: BaseMiddlewareConstructor<
  JsonMiddlewareOptions
> = (options = {}) => {
  const { pretty = false, param = "pretty" } = options;
  return async (ctx: AppContext, next: Next) => {
    return await KoaJSON({ ...options, pretty, param })(ctx, next);
  };
};
