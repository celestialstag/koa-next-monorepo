import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const envConfig = dotenv.config({
  path: "../../.env",
  override: true,
});

dotenvExpand.expand(envConfig);

const env = typeof window === "undefined" ? process.env : import.meta.env;

export type IConfigEnvironment =
  | "development"
  | "production"
  | "staging"
  | "test";

export type IConfigLogErrors = false | true;

export type IBaseConfig = {
  /** general */
  env: IConfigEnvironment;
  print_errors: IConfigLogErrors;
  appname: string;
  app_title: string;
  app_email: string;
  app_description: string;
  host: string;
  /** api config */
  api_port: number;
  api_host: string;
  api_version: string;
  /** web config */
  web_port: number;
  web_host: string;
  /** data */
  data_dir: string;
  max_bytes: number;
  /** s3 */
  s3: {
    endpoint: string;
    bucket: string;
    region: string;
  };
};

export const base_config: IBaseConfig = {
  /** general */
  env: (env.ENV as IConfigEnvironment) ?? "development",
  print_errors: env.DEPLOYMENT === "false" ? false : true,
  appname: env.APPNAME ?? "app_title",
  app_title: env.APP_TITLE ?? "app_title",
  app_email: env.APP_EMAIL ?? "app@example.com",
  app_description: env.APP_DESCRIPTION ?? "app_description",
  host: env.HOST ?? "localhost",
  /** api config */
  api_port: parseInt(env.API_PORT ?? "3000"),
  api_host: env.API_HOST ?? "localhost",
  api_version: env.API_VERSION ?? "v1",
  /** web config */
  web_port: parseInt(env.WEB_PORT ?? "3010"),
  web_host: env.WEB_HOST ?? "localhost",
  /** data */
  data_dir: env.DATA_DIR ?? "data",
  max_bytes: parseInt(env.MAX_BYTES || `${(2 << 22) * 250}`),
  /** s3 */
  s3: {
    endpoint: env.S3_ENDPOINT ?? "http://localhost:9000",
    bucket: env.S3_BUCKET ?? "app-bucket",
    region: env.S3_REGION ?? "us-west-1",
  },
};
