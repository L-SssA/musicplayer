const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  devServer: {
    proxy: 'http://localhost:3000'
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve('src'))
      .set("~c", resolve('src/components/'))

  }
}