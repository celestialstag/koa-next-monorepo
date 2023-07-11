import KoaRouter from "koa-router";

interface ControllerProperties {
  readonly routes: string[];
  readonly router: KoaRouter;
}

export class BaseController implements ControllerProperties {
  public readonly routes: string[] = [];
  public readonly router: KoaRouter = new KoaRouter();
  constructor() {
    //
  }
}

// export const Controller = (payload: typeof BaseController) => {1
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Controller = (path: string, payload: any) => {
  // eslint-disable-next-line no-console
  console.log(path);
};

export const RequestMethod = (method = "get", path = "/") => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any, key: string, _desc: PropertyDescriptor) => {
    if (!target.route_paths) target.route_paths = [];
    target.route_paths.push({ key, method, path });
  };
};
