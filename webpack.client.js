const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env) {
  const devMode = env && env.dev;
  return {
    devServer: {
      host: '0.0.0.0',
      open: true,
    },
    devtool: devMode ? 'eval' : 'source-map',
    entry: {
      client: [path.resolve(__dirname, 'src/client')],
    },
    mode: devMode ? 'development' : 'production',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'babel-loader',
          include: path.resolve(__dirname, 'src'),
        },
      ],
    },
    optimization: {
      // Uncomment for more detailed bundle stats
      // concatenateModules: false,
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            enforce: true,
            chunks: 'all',
          },
        },
      },
    },
    output: {
      filename: devMode ? '[name].js' : '[name].[chunkhash:6].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'SD Election Results',
        template: 'src/client/index.html',
      }),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    stats: 'minimal',
  };
};
