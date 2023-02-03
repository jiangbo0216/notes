/**
 * case-1 测试：es 模块中所有的导入在这个模块 export 未使用的情况下不被打包
 * case-1 import 模块 es 中不存在的导出 b
 */

import {b} from './es'

console.log('case-1', b)