- https://webpack.js.org/configuration/optimization/

```json
optimization:{
  usedExports: true, // 开启 tree shaking
  minimize: true, // 默认 prod 时为 true
  sideEffects: true, // sideEffects: true 之后，webpack 在分析依赖时就会去识别 package.json 中的副作用标记 (sideEffects)
  concatenateModules: false
}
```