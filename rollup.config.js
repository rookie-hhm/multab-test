import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import { babel } from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import clear from 'rollup-plugin-clear'
import terser from '@rollup/plugin-terser'
import pkg from './package.json'
// import rename from 'rollup-plugin-rename'
import renameNodeModules from "rollup-plugin-rename-node-modules";
const targetDir = path.resolve(__dirname, 'dist')
const { devDependencies, dependencies } = pkg
export default {
  input: path.resolve(__dirname, 'src/index.js'),
  external: [...Object.keys(devDependencies), ...Object.keys(dependencies)],
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
      babelHelpers: 'bundled',
      extensions: ['.js', '.vue']
    }),
    commonjs(),
    resolve({
      extensions: ['.vue', '.js', '.scss', '.jsx']
    }),
    renameNodeModules('dependencies'),
    // {
    //   name: "style",
    //   generateBundle(config, bundle) {
    //     //这里可以获取打包后的文件目录以及代码code
    //     const keys = Object.keys(bundle);

    //     for (const key of keys) {
    //       const bundler = bundle[key];
    //       //rollup内置方法,将所有输出文件code中的.scss变成.css
    //       console.log(bundler.code, 'code')
    //       this.emitFile({
    //         type: "asset",
    //         fileName: key, //文件名名不变
    //         source: bundler.code.replace(/\.scss/g, ".css"),
    //       });
    //     }
    //   }
    // },
    postcss(),
    // terser()
  ],
  // treeshake: {
  //   moduleSideEffects: false
  // },
  output: [
    {
      format: 'es',
      dir: path.join(targetDir, 'es'),
      preserveModules: true,
      preserveModulesRoot: 'src'
    }
  ]
}