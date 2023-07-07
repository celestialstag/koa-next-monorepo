import typescript from "@rollup/plugin-typescript";

const packageJson = require("./package.json");

export default [
  {
    input: "./src/server.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.build.json",
        outputToFilesystem: true,
      }),
    ],
  },
];
