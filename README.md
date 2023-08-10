### 操作
先执行`npm i` 安装依赖 在`node@16`下进行操作
### 问题

1. 在`rollup`配置了`preserveModules: true`的情况下, 执行`npm run build-rollup`之后，生成了`dist`目录，但是`dist`目录下会有`node_modules`(里面是一些第三方依赖库)，怎么把这个目录删掉，只保留`src`目录下的结构


2.
打包完之后，进入到`example`演示项目下，明明只在项目中引入了一个`Test`组件，为什么执行执行项目打包的时候，会把所有的内容都打包进去了，打完包之后可以进入到`example/dist`下的js可以搜索到`better-scroll`，`Test`组件是一个干净的组件(没有引入better-scroll)。

看起来是`tree-shaking`失效了，但是我打包出来的文件`dist/es/index`明明就是用`ESM`导出的