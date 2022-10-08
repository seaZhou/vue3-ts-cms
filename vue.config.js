const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
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
  }
})
