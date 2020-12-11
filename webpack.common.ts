import path from 'path';
import webpack from 'webpack';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const commonConfig: webpack.Configuration = {
  context: path.resolve(__dirname, 'src'),
  entry: ['./main.ts'],
  output: {
    filename: 'main.[fullhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src', 'assets'),
      '@core': path.resolve(__dirname, 'src', 'core'),
      '@types': path.resolve(__dirname, 'types'),
    },
  },

  plugins: [
    new webpack.ProgressPlugin({}),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'template.html'),
      favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.[fullhash].css',
    }),
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
};

export default commonConfig;
