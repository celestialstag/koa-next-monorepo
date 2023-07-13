import type * as Koa from "koa";

declare module "koa" {
  export interface Request extends Koa.Request {
    params: Record<string, unknown>;
    body: Record<string, unknown> & string;
  }

  // type ParameterizedContext<StateT = DefaultState, ContextT = DefaultContext, ResponseBodyT = unknown> = ExtendableContext
  export interface ResolverContext<
    StateT = Koa.DefaultState,
    ContextT = Koa.DefaultContext,
    ResponseBodyT = unknown,
  > extends Koa.ParameterizedContext<StateT, ContextT, ResponseBodyT> {
    request: {
      params: Record<string, unknown>;
      body: Record<string, unknown>;
    };
  }

  // export interface Request extends Koa.Request {
  //   params: Record<string, unknown>;
  //   body: Record<string, unknown> & string;
  // }
}
