// node 版本需大于14.8.0
import open from 'open';
import {Parcel} from '@parcel/core';
import chalk from 'chalk';

const params = process.argv.slice(2)
  .reduce((config, param) => {
    const [key, value] = param.split('=');
    config[key.replace(/^--/, '')] = value;
    return config;
  }, {});

const { productId, deviceName } = params;

if (!productId) {
  console.warn(`${chalk.yellow('请提供 productId 以打开面板开发页面')}，
命令： ${chalk.blue('npm run dev -- --productId=your_productId --deviceName=your_deviceName')}
`);
  // process.exit(0);
}

let bundler = new Parcel({
  entries: './src/index.js',
  defaultConfig: '@parcel/config-default',
  shouldAutoInstall: true,
  serveOptions: {
    port: 9000,
    https: false,
  },
  hmrOptions: {
    port: 9000
  }
});

let subscription = await bundler.watch((err, event) => {
  if (err) {
    // fatal error
    throw err;
  }

  if (event.type === 'buildSuccess') {
    let bundles = event.bundleGraph.getBundles();
    console.log(`✨ Built ${bundles.length} bundles in ${event.buildTime}ms!`);
  } else if (event.type === 'buildFailure') {
    console.log(event.diagnostics);
  }
});

open(`https://iot.cloud.tencent.com/h5panel/developing?sw=true&productId=${productId || ''}${deviceName ? `&deviceName=${deviceName}` : ''}`);
