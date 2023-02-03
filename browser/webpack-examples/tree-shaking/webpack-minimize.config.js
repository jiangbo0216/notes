const path = require('path')

/**
 * @type {import("webpack/types").Configuration}
 */
const config = {
  mode: 'production',
  entry: {
    'shaking-success':'./src/shaking-success.js',
    'shaking-fail-for-side-effects':'./src/shaking-fail-for-side-effects.js',
    'case-1': './src/case-1',
    'case-2': './src/case-2',
    'case-3': './src/case-3',
  },
  output: {
    path: path.resolve(__dirname, 'dist/minimize'),
    filename: "[name]-minimize.js"
  },

  optimization:{
    usedExports: true, // 开启 tree shaking
    minimize: true, // 默认 prod 时为 true
    sideEffects: true, // sideEffects: true 之后，webpack 在分析依赖时就会去识别 package.json 中的副作用标记 (sideEffects)
    concatenateModules: false
  }
};

module.exports = config;
