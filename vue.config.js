const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    proxy: {
      '/apis': {
        target: 'http://localhost:8998',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/apis': ''
        }
      }
    }
  }

})
