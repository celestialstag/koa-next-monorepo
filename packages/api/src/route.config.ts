import KoaRouter from "koa-router";
import fs from "fs";

import { KoaApp } from "@lib/koa-app";
import { api_config } from "@lib/config";

export const versions = fs.readdirSync(`${__dirname}/controller/`);
const controller_regex = /((controller\.ts)|(controller\.js))$/;

export const load_routes = async (app: KoaApp) => {
  for (const version of versions) {
    const version_router = new KoaRouter();
    try {
      const modules = fs
        .readdirSync(`${__dirname}/controller/${version}/`)
        .reduce(
          (a, x) => (x.match(controller_regex) ? [...a, x] : a),
          [] as string[],
        );
      for (const module of modules) {
        const { route, router }: { route: string; router: KoaRouter } =
          await import(`${__dirname}/controller/${version}/${module}`);
        version_router.use(route, router.routes());
        if (api_config.print_errors) {
          // eslint-disable-next-line no-console
          console.log(`+ [controller] ${version}/${module}`);
        }
      }
      app.registerController(`/api/${version}`, version_router);
    } catch (e) {
      if (api_config.print_errors) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
      if (api_config.print_errors) {
        // eslint-disable-next-line no-console
        console.log(`[fail] ${version}/${module}`);
      }
    }
  }
};
