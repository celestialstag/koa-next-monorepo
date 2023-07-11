import KoaRouter from "koa-router";
import { ParameterizedContext } from "koa";

import { BaseController, Controller, RequestMethod } from "@lib/koa-app";
import { SUCCESS } from "@lib/utility";

export const route = ["/ping"];
export const router = new KoaRouter();

export const PingController = { router, route };

router.get("/", async (ctx: ParameterizedContext) => {
  ctx.response.body = "Pong!";
  ctx.response.status = SUCCESS.OK.status;
}); // {get} /v1/hello

@Controller("path")
export class Ping2Controller extends BaseController {
  // routes: string[] = [];
  // router: KoaRouter = new KoaRouter();

  constructor() {
    super();
    // eslint-disable-next-line no-console
    console.log(this.Get.prototype);
  }

  @RequestMethod("get", "/")
  Get() {
    //
  }

  @RequestMethod("post", "/")
  Post() {
    //
  }
}

const Q = new Ping2Controller();

// console.log(Q);
