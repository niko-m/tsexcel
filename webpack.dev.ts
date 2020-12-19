import webpack from 'webpack';
import ESLintPlugin from 'eslint-webpack-plugin';
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';

const devConfig: webpack.Configuration = {
  mode: 'development',
  devtool: 'source-map',

  plugins: [
    new ESLintPlugin({
      extensions: ['ts'],
    }),
  ],

  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    compress: true,
  },
};

const config: webpack.Configuration = merge(commonConfig, devConfig);

export default config;
