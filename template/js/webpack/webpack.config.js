/* eslint-disable */
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 当 JS 文件大小超过 2MB 限制时，可置为 true 开启 webpack 的代码拆分
// 开启后 npm run release 将输出多个文件，需要全部上传到控制台交互开发的设置项中
// 具体设置项在 optimization.splitChunks
const enableCodeSplitting = false;

class ModifiedMiniCssExtractPlugin extends MiniCssExtractPlugin {
  getCssChunkObject(mainChunk) {
    return {}
  }
}

module.exports = (env, argv) => {
  const { mode } = env;
  const { productId = '', deviceName = '' } = argv;
  console.log(`正在打开${productId || ''}`);

  const isDevMode = mode === 'development';
  const srcPath = path.join(__dirname, `../src`);
  const distPath = path.join(__dirname, '../dist', isDevMode ? '/debug' : '/release');

  console.log('srcPath', srcPath);
  console.log('distPath', distPath);

  return {
    name: 'iot-explorer-h5-panel-sdk-demo',
    mode,
    entry: {
      index: path.join(srcPath, '/index.js'),
    },
    output: {
      path: distPath,
      filename: isDevMode ? '[name].js' : 'SmartLock.[contenthash:8].js',
      libraryTarget: 'umd'
    },
    externals: {
      'qcloud-iotexplorer-h5-panel-sdk': 'h5PanelSdk',
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    devServer: {
      contentBase: distPath,
      port: 9000,
      host: '127.0.0.1',
      disableHostCheck: true, //  新增该配置项
      overlay: true,
      hot: true,
      headers: {
        'access-control-allow-origin': '*'
      },
      open: {
        newInstance: false
      },
      openPage: `https://iot.cloud.tencent.com/h5panel/developing?productId=${productId}&deviceName=${deviceName}`,
    },
    module: {
      // 现在的 babel 配置已经很简单了，我们只需要加入默认的配置即可
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules|vendors/,
          use: {
            loader: 'babel-loader',
            options: {
              sourceType: 'unambiguous',
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
              plugins: [
                isDevMode && require.resolve('react-refresh/babel'),
                '@babel/plugin-proposal-class-properties',
                [
                  '@babel/plugin-transform-runtime',
                  {
                    'absoluteRuntime': false,
                    'corejs': false,
                    'helpers': true,
                    'regenerator': true,
                    'useESModules': false,
                  }
                ],
              ].filter(Boolean)
            },
          }
        },
        {
          test: /\.svg$/,
          use: [
            'url-loader',
            'svg-transform-loader',
            {
              loader: 'svgo-loader',
              options: {
                plugins: [{ removeTitle: true }, { convertStyleToAttrs: true }],
              },
            },
          ],
        },
        {
          test: /\.(le|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('autoprefixer')(),
                  require('postcss-px-to-viewport')({
                    viewportWidth: 375,
                  })
                ],
              },
            },
            {
              loader: 'less-loader',
            },
          ],
        },
      ],
    },
    resolve: {
      // 添加 jsx 后缀支持
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@src': path.resolve(__dirname, '../src'),
        '@components': path.resolve(__dirname, '../src/components'),
      },
    },
    devtool: isDevMode ? 'inline-source-map' : false,
    optimization: enableCodeSplitting && !isDevMode ?
      {
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/](react|react-dom|qcloud-iotexplorer-h5-panel-sdk)[\\/]/,
              name: 'vendor',
              chunks: 'all',
            }
          }
        }
      } : {},
    plugins: [
      new webpack.ProgressPlugin(),
      isDevMode && new ReactRefreshWebpackPlugin(),
      new CleanWebpackPlugin(),
      ...(isDevMode ? [new webpack.HotModuleReplacementPlugin()] : []),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      new ModifiedMiniCssExtractPlugin({
        filename: isDevMode ? '[name].css' : 'SmartLock.[contenthash:8].css',
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          autoprefixer: { disable: true },
        },
      }),
      // !isDevMode && new BundleAnalyzerPlugin()
    ].filter(Boolean),
    stats: { children: false },
  };
};
