const MonacoWebpackEditorPlugin = require('monaco-editor-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  chainWebpack(config) {
    config.plugin('monaco').use(new MonacoWebpackEditorPlugin());
    config.plugin('circular').use(
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        include: /lib/
      })
    );
  }
};
