import webpack from 'webpack';
import {merge} from 'webpack-merge';
import commonConfig from './webpack.common';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const prodConfig: webpack.Configuration = {
  mode: 'production',
  devtool: false,

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.[hash].css',
    }),
  ],

  module: {
    rules: [
      {
        test: /.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
};

const config: webpack.Configuration = merge(commonConfig, prodConfig);

export default config;
