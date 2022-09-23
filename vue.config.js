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
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://152.136.185.210:5000',
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
  }
})
