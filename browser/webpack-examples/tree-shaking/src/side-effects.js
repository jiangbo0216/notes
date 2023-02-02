import {a} from './a'
// export const side = 'side'
import './c'

function merge() {
  var _final = {};

  for (
    var _len = arguments.length, objs = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    objs[_key] = arguments[_key];
  }

  for (var _i = 0, _objs = objs; _i < _objs.length; _i++) {
    var obj = _objs[_i];
    mergeRecursively(_final, obj);
  }

  return _final;
}

// 静态 import a 一旦使用就会被打包
export const sideMap = {
  a
}


// 静态 import a 一旦使用就会被打包
export const sideMap2 = {
  a: require('./b').d
}

function sideFunc () {
  merge('sideEffects')
}

const sideFuncReturn = sideFunc()