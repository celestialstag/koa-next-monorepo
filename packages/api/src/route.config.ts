import KoaRouter from "koa-router";
import fs from "fs";

import { KoaApp } from "@lib/koa-app";
import { api_config } from "@lib/config";

export const versions = fs.readdirSync(`${__dirname}/controller/`);
const controller_regex = /((controller\.ts)|(controller\.js))$/;

// TODO: Make this recursive so directories can be nested.
export const load_routes = async (app: KoaApp) => {
  for (const version of versions) {
    const version_router = new KoaRouter();
    try {
      const modules = fs
        .readdirSync(`${__dirname}/controller/${version}/`)
        .filter((value) => value.match(controller_regex));
      for (const module of modules) {
        try {
          const { route, router }: { route: string; router: KoaRouter } =
            await import(`${__dirname}/controller/${version}/${module}`);
          version_router.use(route, router.routes());
          if (api_config.print_errors) {
            // eslint-disable-next-line no-console
            console.log(`+ [controller] ${version}/${module}`);
          }
        } catch {
          // NOTE: Module failed to load.
          if (api_config.print_errors) {
            // eslint-disable-next-line no-console
            console.log(`[fail] ${version}/${module}`);
          }
        }
      }
      app.registerController(`/api/${version}`, version_router);
    } catch (e) {
      // NOTE: Most likely fs error.
      if (api_config.print_errors) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }
  }
};
