const MonacoWebpackEditorPlugin = require('monaco-editor-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const path = require('path');

const resolve = (filename) => path.resolve(__dirname, filename);
const isLib = process.env.TYPE === 'lib';

module.exports = {
  chainWebpack(config) {
    config.resolve.alias.set('lib', resolve('lib'));
    if (!isLib) {
      config.plugin('monaco').use(new MonacoWebpackEditorPlugin());
      config.plugin('circular').use(
        new CircularDependencyPlugin({
          exclude: /a\.js|node_modules/,
          include: /lib/
        })
      );
    }
  }
};
