import KoaRouter from "koa-router";
import { ParameterizedContext } from "koa";

import { SUCCESS } from "@lib/utility";

export const route = ["/health"];
export const router = new KoaRouter();

export const HealthController = { router, route };

router.get("/", async (ctx: ParameterizedContext) => {
  ctx.response.body = SUCCESS.OK.message;
  ctx.response.status = SUCCESS.OK.status;
}); // {get} /v1/health