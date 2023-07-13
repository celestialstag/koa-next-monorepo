import KoaRouter from "koa-router";
import { ParameterizedContext } from "koa";

import { SUCCESS } from "@lib/utility";

export const route = ["/certificate"];
export const router = new KoaRouter();

export const v0CertificateController = { router, route };

router.get("/insurance", async (ctx: ParameterizedContext) => {
  ctx.response.body = SUCCESS.OK.message;
  ctx.response.status = SUCCESS.OK.status;
}); // {get} /v0/certificate/insurance

router.get("/protection", async (ctx: ParameterizedContext) => {
  ctx.response.body = SUCCESS.OK.message;
  ctx.response.status = SUCCESS.OK.status;
}); // {get} /v0/certificate/protection

router.get("/millennium", async (ctx: ParameterizedContext) => {
  ctx.response.body = SUCCESS.OK.message;
  ctx.response.status = SUCCESS.OK.status;
}); // {get} /v0/certificate/millennium
