var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('../webpack.config')
new WebpackDevServer(webpack(config), {
  contentBase: './src/www',
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {

    "/portal/rest": {
      target: {
        host: "127.0.0.1",
        protocol: 'http:',
        port: 8000
      },
      ignorePath: false,
      secure: false
    },

  }
}).listen(5000, 'localhost', function(err) {
  if (err) {
    console.log(err)
  }
  console.log('Listening at localhost:5000')
})
