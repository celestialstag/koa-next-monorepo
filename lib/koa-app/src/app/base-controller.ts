import KoaRouter from "koa-router";

interface ControllerProperties {
  readonly route: string[];
  readonly router: KoaRouter;
}

export class BaseController implements ControllerProperties {
  public readonly path = "";
  public readonly route: string[] = [];
  public readonly router: KoaRouter = new KoaRouter();
  constructor() {
    // do something
  }
}

type ReqMethod = "post" | "get" | "update" | "delete";

export const Controller = (payload: typeof BaseController) => {
  const pathname = payload.name
    .replace(/Controller$/, "")
    .split(/(?=[A-Z])/)
    // .split(/([A-Z][a-z0-9]+)/)
    .join("-")
    .toLocaleLowerCase();
  // eslint-disable-next-line no-console
  console.log(pathname);
};

export const RequestMethod = (method: ReqMethod = "get", path = "/") => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any, key: string, _desc: PropertyDescriptor) => {
    if (!target.route_paths) target.route_paths = [];
    target.route_paths.push({ key, method, path });
  };
};
