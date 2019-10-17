import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";

import pkg from "./package.json";

const config = {
  input: "src/index.js",
  external: ["react", "prop-types"],
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    babel({
      exclude: "node_modules/**"
    }),
    resolve(),
    commonjs()
  ]
};
export default config;
