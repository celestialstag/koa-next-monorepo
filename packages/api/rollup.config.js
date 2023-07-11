import typescript from "@rollup/plugin-typescript";

const pkg = require("./package.json");

export default [
  {
    input: "./src/server.ts",
    output: [
      {
        file: pkg.main,
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
