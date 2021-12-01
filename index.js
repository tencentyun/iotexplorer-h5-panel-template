// @ts-check

// !!! Sharing the dependencies of caz
module.paths = require.main.paths

const path = require('path')
const chalk = require('chalk')
const { name, version } = require('./package.json')
const IOT_PANEL_COMPONENT = 'iot-panel-component';

/** @type {import('caz').Template} */
module.exports = {
  name,
  version,
  source: 'template/js',
  prompts: [
    // TODO: custom template prompts
    {
      name: 'name',
      type: 'text',
      message: 'Project name'
    },
    {
      name: 'version',
      type: 'text',
      message: 'Project version'
    },
    {
      name: 'description',
      type: 'text',
      message: 'Project description',
      initial: 'Awesome h5-panel apps.'
    },
    {
      name: 'framework',
      type: prev => process.env.NODE_ENV === 'test' || prev ? 'select' : null,
      message: '请选一个框架',
      hint: ' ',
      choices: [
        { title: 'react-js', value: 'react-js' },
        { title: 'vue 3', value: 'vue 3' },
      ]
    },
    {
      name: 'features',
      type: 'multiselect',
      message: 'Choose the features you need',
      instructions: false,
      choices: [
        { title: '安装标准面板组件库[react]', value: IOT_PANEL_COMPONENT, selected: false },
      ]
    },
    {
      name: 'install',
      type: 'confirm',
      message: 'Install dependencies',
      initial: true
    },
    {
      name: 'pm',
      type: prev => process.env.NODE_ENV === 'test' || prev ? 'select' : null,
      message: 'Package manager',
      hint: ' ',
      choices: [
        { title: 'npm', value: 'npm' },
        { title: 'yarn', value: 'yarn' },
        { title: 'pnpm', value: 'pnpm' }
      ]
    }
  ],
  setup: ctx => {
    switch (ctx.answers.framework) {
      case 'vue 3':
        ctx.config.source = 'template/vue3';
        break;
      default:
        ctx.config.source = 'template/js';
    }
  },
  prepare: async ctx => {
    // Execute install according to user's choice.
    ctx.config.install = ctx.answers.install && ctx.answers.pm

    if (ctx.answers.features.includes(IOT_PANEL_COMPONENT)) {
      const packageJson = ctx.files.find(file => file.path === 'package.json');
      const content = JSON.parse(packageJson.contents.toString());
      content.dependencies['qcloud-iot-panel-component'] = '^0.0.32';
      packageJson.contents = Buffer.from(JSON.stringify(content, null, 2));
    }
  },
  complete: async ctx => {
    // TODO: custom complete callback
    console.clear()
    console.log(chalk`Created a new panel project in {cyan ${ctx.project}} by the {blue ${ctx.template}} template.\n`)
    console.log('Getting Started:')
    if (ctx.dest !== process.cwd()) {
      console.log(chalk`  $ {cyan cd ${path.relative(process.cwd(), ctx.dest)}}`)
    }
    if (ctx.config.install === false) {
      console.log(chalk`  $ {cyan npm install} {gray # or yarn}`)
    }
    console.log(chalk`  $ {cyan ${ctx.config.install ? ctx.config.install : 'npm'} run dev -- --productId={magenta your_product_id} --deviceName={magenta your_devicename}} {gray # deviceName 参数可选}`)
    console.log('\nHappy hacking :)\n')
  }
}
