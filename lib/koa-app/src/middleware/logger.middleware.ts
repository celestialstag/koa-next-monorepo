import KoaLogger from "koa-logger";
import type { Next } from "koa";

import type { AppContext, BaseMiddlewareConstructor } from "../types";

export const LoggerMiddleware: BaseMiddlewareConstructor = () => {
  return async (ctx: AppContext, next: Next) => {
    return await KoaLogger()(ctx, next);
  };
};
