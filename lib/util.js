'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var now = Date.now();
exports['default'] = {
  noop: function noop() {},

  getKeyFromChildrenIndex: function getKeyFromChildrenIndex(child, index) {
    return child.key || 'rcMenuItem_' + now + '_' + index;
  }
};
module.exports = exports['default'];