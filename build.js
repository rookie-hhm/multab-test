import path from 'path'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import { babel } from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import clear from 'rollup-plugin-clear'
import { writeBundles, excludeFiles, targetDir, buildConfigEntries } from './build-utils.js'
import { fileURLToPath } from 'node:url'
import { rollup } from 'rollup'
import glob from 'fast-glob'
const dirname = path.dirname(fileURLToPath(import.meta.url))

const input = excludeFiles(
  await glob('**/*.{js,ts,vue,scss}', {
    cwd: path.resolve(dirname, 'src'),
    absolute: true,
    onlyFiles: true,
  })
)
// console.log(input, 'input')
const buildModules = async () => {
  const bundle = await rollup({
    // input: path.resolve(dirname, 'src/index.js'),
    input,
    external: ['vue'],
    plugins: [
      clear({
        targets: [targetDir],
      }),
      
      alias({
        entries: [
          { find: '@', replacement: path.resolve(dirname, './src') }
        ]
      }),
      vue(),
      // commonjs(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'runtime',
        extensions: ['.js', '.vue']
      }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      postcss(),
    ],
  })
  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]) => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: path.resolve(dirname, 'src'),
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`,
      }
    })
  )
}

buildModules()
