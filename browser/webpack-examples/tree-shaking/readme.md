- <https://juejin.cn/post/7127878140180824100#heading-3>
- <https://zhuanlan.zhihu.com/p/403901557?utm_campaign=shareopn&utm_medium=social&utm_oi=74132582563840&utm_psn=1604271566757597184&utm_source=wechat_session>

webpac 对于 es 模块 tree-shaking 分为下面的部分

es.js 为测试的 es6 模块的名称

1. 导入
   1. es 模块中所有的导入在这个模块 export 未使用的情况下不被打包 (case-1)
   2.  (case-2)es 模块中所有的导入与使用的这个模块 export 无关的情况下不被打包
   3. es 模块中所有的导入与使用的这个模块 export 无关的情况，但是import 被用于赋值操作，这种情况下被打包 (case-3)
2. 简单导出（常量或者无外部依赖的函数）
3. 复杂导出（依赖import或者模块顶层赋值操作，函数或者变量）
4. 副作用导出（console，window）
5. 模块顶层赋值操作
6. 模块顶层函数执行（有返回值&无返回值）

如何优化包体积：

1. 定位问题
   1. 代码覆盖扫描，定位首屏没有执行的多余代码，或者关键路径没有执行的代码
2. 修改代码，设计代码结构
