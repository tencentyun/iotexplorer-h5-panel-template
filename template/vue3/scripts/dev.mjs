// node 版本需大于14.8.0
import open from 'open';
import {Parcel} from '@parcel/core';

const params = process.argv.slice(2)
  .reduce((config, param) => {
    const [key, value] = param.split('=');
    config[key.replace(/^--/, '')] = value;
    return config;
  }, {});

if (!params.productId || !params.deviceName) {
  console.warn('请提供productId 和 deviceName 打开面板开发页面');
}

let bundler = new Parcel({
  entries: './src/index.js',
  defaultConfig: '@parcel/config-default',
  serveOptions: {
    port: 9000,
    https: true,
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

open(`https://iot.cloud.tencent.com/h5panel/developing?productId=${params.productId || ''}&deviceName=${params.deviceName || ''}`);
