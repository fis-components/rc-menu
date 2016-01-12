'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var now = Date.now();
exports['default'] = {
  noop: function noop() {},

  getKeyFromChildrenIndex: function getKeyFromChildrenIndex(child, menuEventKey, index) {
    var prefix = menuEventKey || '';
    return child.key || prefix + 'item_' + now + '_' + index;
  }
};
module.exports = exports['default'];