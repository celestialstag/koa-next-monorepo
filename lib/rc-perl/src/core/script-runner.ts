import { api_config } from "@lib/config";
import { exec } from "child_process";

const CGI_DIR = api_config.cgi_dir;
const INTERPRETER = "perl";

export enum SCRIPTS_TOOL {
  CUSTOMER_SATISFACTION_SURVEY = "./Tools/satisfactionSurvey.cgi",
}

type ScriptResponse = {
  stdout: string;
  error?: null;
};

type ScriptError = {
  stdout?: string;
  stderr?: string;
  error: string;
};

type ScriptExec = ScriptResponse | ScriptError;

type ExecScriptOptions = {
  payload?: string;
  interpreter?: string;
};

export const exec_script = (
  script: string,
  { payload = "", interpreter = INTERPRETER }: ExecScriptOptions = {},
) => {
  return new Promise<ScriptExec>((res) => {
    const proc = exec(
      `"cd" ${CGI_DIR} && "${interpreter}" ${script} ${payload}`.trim(),
      (err, stdout, stderr) => {
        if (stderr) return res({ stdout, stderr, error: err?.message });
        return res({ stdout });
        // return res({ stdout });
      },
    );
    proc.on("exit", () => proc.kill());
    proc.on("error", () => proc.kill());
  });
};
