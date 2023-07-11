import KoaBody from "koa-body";
import type { Next } from "koa";

import type { AppContext, BaseMiddlewareConstructor } from "../types";

type BodyParserMiddlewareOptions = {
  max_bytes: number;
  data_dir?: string;
};

export const BodyParserMiddleware: BaseMiddlewareConstructor<
  BodyParserMiddlewareOptions
> = (options = {}) => {
  const { max_bytes = 2 << 16, data_dir } = options;
  return async (ctx: AppContext, next: Next) => {
    return KoaBody({
      formidable: {
        maxFileSize: max_bytes,
        uploadDir: data_dir,
        multiples: false,
      },
      multipart: true,
      urlencoded: true,
    })(ctx, next);
  };
};
