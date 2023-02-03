/**
 * 这个模块会被打包，但是因为 b 被用到了 & import 的 a 被用来二次赋值所以 a 也会被打包，尽管 map 没有被用到。 tree-shaking 结果为
  (a, r, e) => {
    e.d(r, { b: () => t });
    var o = e(430);
    const t = "bbbbbbbb";
    o.a;
  },
 */
import {a} from './a'

export const b = 'bbbbbbbb'

export const map = {
  a
}

export {
  a
}