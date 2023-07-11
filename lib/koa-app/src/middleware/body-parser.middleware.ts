import type { Middleware } from "koa";

export interface BaseMiddleware {
  /* properties */
  readonly options: Record<string, unknown>;
  readonly middleware: Middleware;
  /* functions */
  register(middleware: unknown): Middleware;
}
