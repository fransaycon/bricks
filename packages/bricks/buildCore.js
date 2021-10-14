const esbuild = require('esbuild');
const fs = require("fs-extra")

fs.removeSync("dist")

esbuild.buildSync({
  entryPoints: [
    './src/index.ts',
  ],
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: 'node',
  format: 'cjs',
  tsconfig: './tsconfig.json',
  outdir: './dist',
  external: [
    ...require("module").builtinModules,
    "esbuild",
    "gray-matter",
    "react",
    "react-dom",
    "typescript",
  ],
});
