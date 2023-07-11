import KoaCORS from "@koa/cors";
import type { Next } from "koa";

import type { AppContext, BaseMiddlewareConstructor } from "../types";

type CorsMiddlewareOptions = {
  origin: string | string[];
  credentials: boolean;
  keepHeadersOnError: boolean;
};

export const CorsMiddleware: BaseMiddlewareConstructor<
  CorsMiddlewareOptions
> = (options = { credentials: true }) => {
  const { origin = "" } = options;
  const origin_list = typeof origin === "string" ? [origin] : origin;
  return async (ctx: AppContext, next: Next) => {
    const originResolver = (ctx: AppContext) => {
      return origin_list.find((value) => value === ctx.origin) || "";
    };
    return await KoaCORS({ ...options, origin: originResolver })(ctx, next);
  };
};
