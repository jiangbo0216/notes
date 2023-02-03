/**
 * case-1 测试：es 模块中所有的导入与使用的这个模块 export 无关的情况下不被打包
 * case-1 import 模块 es 中导出的 b
 */

import {b} from './es'

console.log('case-1', b)