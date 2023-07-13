import KoaRouter from "koa-router";
import { ParameterizedContext } from "koa";
import { convertSchema } from "@sodaru/yup-to-json-schema";

import {
  createCertificateSchema,
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

router.get("/cert", async (ctx: ParameterizedContext) => {
  ctx.response.body = convertSchema(
    createCertificateSchema.meta({
      jsonSchema: {
        $id: "/cert/insurance",
      },
    }),
    {},
  );
  ctx.response.status = SUCCESS.OK.status;
}); // {get} /v0/schema/cert

router.get("/cert/insurance", async (ctx: ParameterizedContext) => {
  ctx.response.body = convertSchema(
    fcInsuranceSchema.meta({
      jsonSchema: {
        $id: "/cert/insurance",
      },
    }),
    {},
  );
  ctx.response.status = SUCCESS.OK.status;
}); // {get} /v0/schema/cert/insurance

router.get("/cert/protection", async (ctx: ParameterizedContext) => {
  ctx.response.body = convertSchema(
    fcProtectionSchema.meta({
      jsonSchema: {
        $id: "/cert/protection",
      },
    }),
  );
  ctx.response.status = SUCCESS.OK.status;
}); // {get} /v0/schema/cert/protection

router.get("/cert/millennium", async (ctx: ParameterizedContext) => {
  ctx.response.body = convertSchema(
    millenniumProtectionSchema.meta({
      jsonSchema: {
        $id: "/cert/millennium",
      },
    }),
  );
  ctx.response.status = SUCCESS.OK.status;
}); // {get} /v0/schema/cert/millennium
