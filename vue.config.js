const { defineConfig } = require('@vue/cli-service')
const path = require('path')

// const fs = require('fs')
// const postcss = require('postcss')
// const resolve = (dir) => path.resolve(__dirname, dir)
// const IS_PROD = ['prod', 'production'].includes(process.env.NODE_ENV)
// function getLessVaribles(fileUrl, list = {}) {
//   if (!fs.existsSync(fileUrl)) return {}
//   let lessFile = fs.readFileSync(fileUrl, 'utf8')
//   return postcss.parse(lessFile).nodes.reduce((acc, curr) => {
//     // eslint-disable-next-line no-useless-escape
//     acc[`${curr.name.replace(/\:/, '')}`] = `${curr.params}`
//     return acc
//   }, list)
// }
// const modifyVars = getLessVaribles(resolve('./src/assets/less/variables.less'))
module.exports = defineConfig({
  transpileDependencies: true,
  // css: {
  //   extract: IS_PROD,
  //   sourceMap: false,
  //   loaderOptions: {
  //     less: {
  //       modifyVars,
  //       javascriptEnabled: true
  //     }
  //   }
  // },
  // 1.配置方式一
  outputDir: './build',
  // publicPath: './',
  // // 2.配置方式二：和webpack属性完全一致，最后会进行合并
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       components: '@/components'
  //     }
  //   }
  // }
  // 配置方式三：
  devServer: {
    host: '0.0.0.0',
    open: true,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'https:///www.web.wdjyfxl.com/prod-api',
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        },
        ws: true,
        changeOrigin: true
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', '@/components')
      .set('views', '@/views')
    config.plugin('html').tap((args) => {
      args[0].title = 'jason CMS'
      return args
    })
    config.resolve.symlinks(true)
  }
})
