import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import { babel } from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import clear from 'rollup-plugin-clear'
import terser from '@rollup/plugin-terser'
const targetDir = path.resolve(__dirname, 'dist')
export default {
  input: path.resolve(__dirname, 'src/index.js'),
  external: ['vue'],
  plugins: [
    clear({
      targets: [targetDir],
    }),
    alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname, './src') }
      ]
    }),
    vue(),
    babel({
      exclude: 'node_modules/**',
      // babelHelpers: 'runtime',
      extensions: ['.js', '.vue']
    }),
    resolve(),
    commonjs(),
    postcss(),
    terser()
  ],
  treeshake: {
    moduleSideEffects: false
  },
  output: [
    {
      format: 'es',
      dir: path.join(targetDir, 'es'),
      preserveModules: true,
      preserveModulesRoot: 'src'
    }
  ]
}