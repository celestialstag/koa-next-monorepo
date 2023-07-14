import KoaRouter from "koa-router";
import { ParameterizedContext } from "koa";

import { SCRIPTS_TOOL, SpawnProcess, exec_script } from "@lib/rc-perl";
import { SUCCESS } from "@lib/utility";

export const route = ["/tool"];
export const router = new KoaRouter();

export const v0CertificateController = { router, route };

router.get("/satisfaction-survey", async (ctx: ParameterizedContext) => {
  const response = await exec_script(SCRIPTS_TOOL.CUSTOMER_SATISFACTION_SURVEY);

  if (response.error) {
    ctx.response.body = response.error;
  } else {
    ctx.response.body = response.stdout;
  }

  ctx.response.status = SUCCESS.OK.status;
}); // {get} /v1/tool/satisfaction-survey

router.get("/spawn-satisfaction-survey", async (ctx: ParameterizedContext) => {
  const script = new SpawnProcess(SCRIPTS_TOOL.CUSTOMER_SATISFACTION_SURVEY);
  const response = await script.execute();

  if (response.error) {
    ctx.response.body = response.error;
  } else {
    ctx.response.body = response.stdout;
  }

  ctx.response.status = SUCCESS.OK.status;
}); // {get} /v1/tool/satisfaction-survey
