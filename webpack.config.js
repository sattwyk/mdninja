const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [new HTMLWebpackPlugin({ template: './client/index.html' })],
  devServer: {
    host: 'localhost',
    port: 8090,
    hot: true,
    open: true,
    compress: true,

    webSocketServer: 'ws',

    historyApiFallback: true,

    static: {
      directory: path.join(__dirname, 'build'),
      publicPath: '/',
    },

    headers: { 'Access-Control-Allow-Origin': '*' },

    proxy: {
      '/api/**': {
        target: 'http://localhost:3500',
        secure: false,
      },
      '/assets/**': {
        target: 'http://localhost:3500',
        secure: false,
      },
    },
    watchFiles: ['client'],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
