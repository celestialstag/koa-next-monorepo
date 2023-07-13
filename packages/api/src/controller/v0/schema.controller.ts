import KoaRouter from "koa-router";
import { ParameterizedContext } from "koa";
import { convertSchema } from "@sodaru/yup-to-json-schema";

import {
  fcInsuranceSchema,
  fcProtectionSchema,
  millenniumProtectionSchema,
} from "@lib/schema-validator";
import { SUCCESS } from "@lib/utility";

export const route = ["/schema"];
export const router = new KoaRouter();

export const v0SchemaController = { router, route };

//***********************************************
//* certificate
//***********************************************

router.get("/cert/insurance", async (ctx: ParameterizedContext) => {
  ctx.response.body = convertSchema(fcInsuranceSchema);
  ctx.response.status = SUCCESS.OK.status;
}); // {get} /v0/schema/cert/insurance

router.get("/cert/protection", async (ctx: ParameterizedContext) => {
  ctx.response.body = convertSchema(fcProtectionSchema);
  ctx.response.status = SUCCESS.OK.status;
}); // {get} /v0/schema/cert/insurance

router.get("/cert/millennium", async (ctx: ParameterizedContext) => {
  ctx.response.body = convertSchema(millenniumProtectionSchema);
  ctx.response.status = SUCCESS.OK.status;
}); // {get} /v0/schema/cert/insurance
