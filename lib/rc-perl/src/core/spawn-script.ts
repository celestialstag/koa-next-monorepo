import type { ChildProcessWithoutNullStreams } from "child_process";
import { spawn } from "child_process";

import { api_config } from "@lib/config";

const CGI_DIR = api_config.cgi_dir;
const INTERPRETER = "perl";

type SpawnProcessResponse = {
  stdout: string | null;
  error?: null;
};

type SpawnProcessError = {
  stdout?: string;
  stderr: string;
  error?: null;
};

type SpawnProcessOptions = {
  interpreter: string;
  payload?: string[];
  error?: null;
};

export class SpawnProcess {
  private stderr: string | null = null;
  private stdout: string | null = null;
  private status: number | null = null;
  private response: number | null = null;

  private process: ChildProcessWithoutNullStreams | null = null;

  constructor(
    private path: string,
    private options: SpawnProcessOptions = {
      interpreter: INTERPRETER,
      payload: [],
    },
  ) {}

  async execute() {
    return await new Promise<SpawnProcessResponse | SpawnProcessError>(
      (resolve) => {
        this.process = spawn(`/bin/zsh`, [
          `"cd" ${CGI_DIR}`,
          `${this.path}`,
          ...(this.options.payload ?? []),
        ]);

        this.process.stdout.on("data", (data) => {
          // eslint-disable-next-line no-console
          console.log(String(data));

          if (this.stdout === null) return (this.stdout = "");
          return (this.stdout += String(data));
        });

        this.process.stderr.on("data", (data) => {
          // eslint-disable-next-line no-console
          console.log(String(data));

          if (this.stderr === null) return (this.stderr = "");
          return (this.stderr += String(data));
        });

        this.process.on("exit", (data) => {
          // eslint-disable-next-line no-console
          console.log(String(data));

          const response = {
            stdout: this.stdout,
            stderr: this.stderr,
          };

          if (this.stderr) return resolve(response as SpawnProcessError);
          return resolve(response as SpawnProcessResponse);
        });
      },
    );
  }
}
