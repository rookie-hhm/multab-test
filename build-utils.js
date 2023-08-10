// import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
// 创建require函数 (commonjs中的require)
// const require = createRequire()
const dirname = path.dirname(fileURLToPath(import.meta.url))
export const targetDir = path.resolve(dirname, 'dist')
export const buildConfig = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: path.resolve(targetDir, 'es'),
    },
    bundle: {
      path: `/es`,
    },
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: path.resolve(targetDir, 'lib'),
    },
    bundle: {
      path: `/lib`,
    },
  },
}
export const buildConfigEntries = Object.entries(
  buildConfig
)

export function writeBundles(bundle, options) {
  return Promise.all(options.map((option) => bundle.write(option)))
}


export const excludeFiles = (files) => {
  const excludes = ['node_modules', 'dist']
  return files.filter(
    (path) => !excludes.some((exclude) => path.includes(exclude))
  )
}