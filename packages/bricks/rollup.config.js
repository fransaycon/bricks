import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import globals from 'rollup-plugin-node-globals';
import autoExternal from 'rollup-plugin-auto-external';
import packageJson from './package.json';
import path from 'path';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      name: 'react-lib',
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    autoExternal({
      builtins: true,
      dependencies: true,
      packagePath: path.resolve('./package.json'),
      peerDependencies: true,
    }),
    resolve({ browser: true, preferBuiltins: false }),
    commonjs(),
    globals(),
    typescript({ tsconfig: './tsconfig.json' }),
    terser(),
  ],
  inlineDynamicImports: true,
};
