/**
 * @type {import("webpack/types").Configuration}
 */
const config = {
  mode: 'production',
  entry: {
    'shaking-success':'./src/shaking-success.js',
    'shaking-fail-for-side-effects':'./src/shaking-fail-for-side-effects.js',
    
  },

  optimization:{
    usedExports: true, // 开启 tree shaking
    // minimize: false,
    sideEffects: true, // sideEffects: true 之后，webpack 在分析依赖时就会去识别 package.json 中的副作用标记 (sideEffects)
    concatenateModules: false
  }
};

module.exports = config;
