import webpack from 'webpack';
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';

const prodConfig: webpack.Configuration = {
  mode: 'production',
  devtool: false,
};

const config: webpack.Configuration = merge(commonConfig, prodConfig);

export default config;
