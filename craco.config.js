const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      if (!webpackConfig.resolve) webpackConfig.resolve = {};
      if (!webpackConfig.resolve.fallback) webpackConfig.resolve.fallback = {};
      
      Object.assign(webpackConfig.resolve.fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer/"),
        "process": require.resolve("process/browser.js")
      });

      return webpackConfig;
    },
    plugins: {
      add: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser.js' 
        }),
        new webpack.DefinePlugin({
          'process.env': JSON.stringify(process.env)
        })
      ]
    }
  }
};