import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import { terser } from 'rollup-plugin-terser'
import autoprefixer from 'autoprefixer'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    postcss({
      modules: true,
      minimize: true,
      plugins: [autoprefixer()],
    }),
    url(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    resolve(),
    commonjs(),
    process.env.NODE_ENV === 'production' && terser(),
  ],
}
