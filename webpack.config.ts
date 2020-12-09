import path from 'path';
import webpack from 'webpack';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled MiniCssExtractPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/mini-css-extract-plugin
 *
 */

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/*
 * We've enabled TerserPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 */

import TerserPlugin from 'terser-webpack-plugin';

const isProd = process.env.NODE_ENV === 'production';

const config: webpack.Configuration = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'source-map',

  context: path.resolve(__dirname, 'src'),
  entry: ['./main.ts'],
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },

  plugins: [
    new webpack.ProgressPlugin({}),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main.[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'template.html'),
      favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
      filename: 'index.html',
    }),
    new ESLintPlugin({
      extensions: ['ts'],
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: [/node_modules/],
      },
      {
        test: /.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(ico|gif|png|jpg|jpeg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: false,
    },
  },

  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    compress: true,
    hot: true,
  },
};

export default config;
