const esbuild = require('esbuild');

esbuild.buildSync({
  entryPoints: [
    './src/index.ts',
  ],
  outfile: './dist/index.js',
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: 'node',
  tsconfig: './tsconfig.json',
  external: [
    "esbuild",
    "fs-extra",
    "typescript",
    "gray-matter"
  ],
});
