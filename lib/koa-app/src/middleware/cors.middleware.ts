import KoaCORS from "@koa/cors";

import type { Next } from "koa";

import { AppContext } from "../app";
import { BaseMiddlewareConstructor } from "./base.middleware";

type CorsMiddlewareOptions = {
  origin: string | string[];
  credentials: boolean;
  keepHeadersOnError: boolean;
};

export const CorsMiddleware: BaseMiddlewareConstructor<
  CorsMiddlewareOptions
> = (options = { origin: "", credentials: true }) => {
  return async (ctx: AppContext, next: Next) => {
    const origin = options.origin as string[];
    const originResolver = (ctx: AppContext) => {
      return origin.find((value) => value === ctx.origin) || "";
    };

    await KoaCORS({
      credentials: true,
      ...options,
      origin: typeof origin === "string" ? origin : originResolver,
    })(ctx, next);
  };
};
