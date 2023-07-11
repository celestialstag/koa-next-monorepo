import type { Next } from "koa";

import { AppContext } from "../app";

export type BaseMiddleware = (ctx: AppContext, next: Next) => Promise<unknown>;

export type BaseMiddlewareConstructor<T = Record<string, unknown>> = (
  options?: Partial<T>,
) => BaseMiddleware;
