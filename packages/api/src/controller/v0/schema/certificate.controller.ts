import KoaRouter from "koa-router";
import { ParameterizedContext } from "koa";

import {
  fcInsuranceSchema,
  fcProtectionSchema,
  millenniumProtectionSchema,
} from "@lib/schema-validator/product";
import { SUCCESS } from "@lib/utility";

export const route = ["/certificate"];
export const router = new KoaRouter();

export const v0CertificateController = { router, route };

router.get("/insurance", async (ctx: ParameterizedContext) => {
  ctx.response.body = "Hello";
  ctx.response.status = SUCCESS.OK.status;
}); // {get} /v0/schema/certificate/insurance

router.get("/protection", async (ctx: ParameterizedContext) => {
  ctx.response.body = "Hello2";
  ctx.response.status = SUCCESS.OK.status;
}); // {get} /v0/schema/certificate/protection

router.get("/millennium", async (ctx: ParameterizedContext) => {
  ctx.response.body = "Hello3";
  ctx.response.status = SUCCESS.OK.status;
}); // {get} /v0/schema/certificate/millennium
