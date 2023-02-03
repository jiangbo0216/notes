/**
 * 这个模块会被打包，但是因为只有 b 被用到了 tree-shaking 结果为
 * 341: (e, r, o) => {
 *    o.d(r, { b: () => t });
 *    const t = "bbbbbbbb";
 * },
 */
import {a} from './a'

export const b = 'bbbbbbbb'



export {
  a
}