import { Next, ParameterizedContext } from "koa";

import { CLIENT_ERROR } from "@lib/utility";

type SessionGuardOptions = {
  passthrough?: boolean;
};

export type SessionContext = {
  // session: SessionModel;
  // user: Required<UserModel>;
  // roles: BaseRole[];
};

export const SessionGuard = (
  // TODO: Set to false
  options: SessionGuardOptions = { passthrough: true },
) => {
  return async (ctx: ParameterizedContext<SessionContext>, next: Next) => {
    if (!options.passthrough)
      return ctx.throw(
        CLIENT_ERROR.UNAUTHORIZED.status,
        CLIENT_ERROR.UNAUTHORIZED.message,
      );

    ctx.state = {
      ...ctx.state,
      authority: 0,
    };
    return await next();
  };
};
