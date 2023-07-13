import KoaRouter from "koa-router";
import fs from "fs";

import { KoaApp } from "@lib/koa-app";
import { api_config } from "@lib/config";

export const versions = fs.readdirSync(`${__dirname}/controller`);
const controller_regex = /[.]?(controller\.ts|controller\.js)$/;

type Controller = { route: string; router: KoaRouter };
const controller_dir = `${__dirname}/controller`;

const import_route = async (path: string) => {
  try {
    return (await import(path)) as Controller;
  } catch {
    return null;
  }
};

const load_routes = async (route: string) => {
  const is_controller = route.match(controller_regex);
  const filename = route
    .replace(controller_dir, "")
    .replace(controller_regex, "");
  const sub_router = new KoaRouter();

  if (is_controller) {
    const module = await import_route(route);
    if (module) {
      sub_router.use(module.route, module.router.routes());
      if (api_config.print_errors) {
        // eslint-disable-next-line no-console
        console.log(`+ [controller] /api${filename}`);
      }
    } else {
      if (api_config.print_errors) {
        // eslint-disable-next-line no-console
        console.log(`+ [error] /api${filename}`);
      }
    }
    return sub_router;
  } else {
    const routes = fs.readdirSync(route);
    for (const sub_route of routes) {
      const router = await load_routes(`${route}/${sub_route}`);
      sub_router.use(router.routes());
    }
    return sub_router;
  }
};

export const configure_routes = async (app: KoaApp) => {
  const routes = fs.readdirSync(controller_dir);
  const base_router = new KoaRouter({ prefix: "/api" });
  for (const route of routes) {
    const router = await load_routes(`${controller_dir}/${route}`);
    base_router.use(`/${route}`, router.routes());
  }
  app.useRouter(base_router);
};
