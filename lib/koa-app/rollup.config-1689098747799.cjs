'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dts = require('rollup-plugin-dts');
var pluginNodeResolve = require('@rollup/plugin-node-resolve');
var typescript = require('@rollup/plugin-typescript');
var terser = require('@rollup/plugin-terser');

const pkg = require("./package.json");

var rollup_config = [
  {
    input: "./src/index.ts",
    output: [
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        outputToFilesystem: false,
      }),
      terser({
        mangle: { toplevel: true },
        compress: {
          module: true,
          toplevel: true,
          unsafe_arrows: true,
        },
      }),
    ],
    external: [
      "fs",
      "@koa/cors",
      "koa",
      "koa-cors",
      "koa-json",
      "koa-router",
      "@lib/config",
    ],
  },
  {
    input: "./dist/esm/index.d.ts",
    output: [{ file: "./dist/index.d.ts", format: "esm" }],
    plugins: [pluginNodeResolve.nodeResolve(), dts.default()],
  },
];

exports.default = rollup_config;
