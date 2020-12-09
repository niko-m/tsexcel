import webpack from 'webpack';
import ESLintPlugin from 'eslint-webpack-plugin';
import {merge} from 'webpack-merge';
import commonConfig from './webpack.common';

const devConfig: webpack.Configuration = {
  mode: 'development',
  devtool: 'source-map',

  plugins: [
    new ESLintPlugin({
      extensions: ['ts'],
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [
      {
        test: /.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    compress: true,
    hot: true,
  },
};

const config: webpack.Configuration = merge(commonConfig, devConfig);

export default config;
