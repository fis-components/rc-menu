'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MenuMixin = require('./MenuMixin');

var _MenuMixin2 = _interopRequireDefault(_MenuMixin);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _util = require('./util');

var SubPopupMenu = _react2['default'].createClass({
  displayName: 'SubPopupMenu',

  propTypes: {
    onSelect: _react2['default'].PropTypes.func,
    onClick: _react2['default'].PropTypes.func,
    onDeselect: _react2['default'].PropTypes.func,
    onDestroy: _react2['default'].PropTypes.func
  },

  mixins: [_MenuMixin2['default']],

  onDeselect: function onDeselect(selectInfo) {
    this.props.onDeselect(selectInfo);
  },

  onSelect: function onSelect(selectInfo) {
    this.props.onSelect(selectInfo);
  },

  onClick: function onClick(e) {
    this.props.onClick(e);
  },

  onDestroy: function onDestroy(key) {
    this.props.onDestroy(key);
  },

  renderMenuItem: function renderMenuItem(c, i) {
    var key = (0, _util.getKeyFromChildrenIndex)(c, i);
    var props = this.props;
    var extraProps = {
      selectedKeys: props.selectedKeys,
      selected: props.selectedKeys.indexOf(key) !== -1
    };
    extraProps.openSubMenuOnMouseEnter = true;
    extraProps.closeSubMenuOnDeactive = true;
    extraProps.deactiveSubMenuOnMouseLeave = props.deactiveSubMenuOnMouseLeave;
    return this.renderCommonMenuItem(c, i, extraProps);
  },

  render: function render() {
    var props = (0, _objectAssign2['default'])({}, this.props);
    props.className += ' ' + props.prefixCls + '-sub';
    return this.renderRoot(props);
  }
});

exports['default'] = SubPopupMenu;
module.exports = exports['default'];