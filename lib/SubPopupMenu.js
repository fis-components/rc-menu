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
    onExpandedChange: _react2['default'].PropTypes.func,
    onDestroy: _react2['default'].PropTypes.func,
    expandedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
    openSubMenuOnMouseEnter: _react2['default'].PropTypes.bool
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

  onExpandedChange: function onExpandedChange(e) {
    this.props.onExpandedChange(e);
  },

  onItemHover: function onItemHover(_ref) {
    var hover = _ref.hover;
    var key = _ref.key;
    var item = _ref.item;
    var trigger = _ref.trigger;

    if (!hover && trigger) {
      if (!this.props.openSubMenuOnMouseEnter) {
        return;
      }
    }
    this.setState({
      activeKey: hover ? key : null
    });

    if (hover && !item.isSubMenu) {
      var subMenu = this.lastExpandedSubMenu();
      if (subMenu && key !== subMenu.props.eventKey) {
        this.onExpandedChange({
          key: subMenu.props.eventKey,
          expanded: false,
          item: subMenu,
          trigger: 'mouseleave'
        });
      }
    }
  },

  onDestroy: function onDestroy(key) {
    this.props.onDestroy(key);
  },

  renderMenuItem: function renderMenuItem(c, i) {
    var key = (0, _util.getKeyFromChildrenIndex)(c, i);
    var props = this.props;
    var extraProps = {
      expandedKeys: props.expandedKeys,
      selectedKeys: props.selectedKeys,
      expanded: props.expandedKeys.indexOf(key) !== -1,
      selected: props.selectedKeys.indexOf(key) !== -1
    };
    return this.renderCommonMenuItem(c, i, extraProps);
  },

  render: function render() {
    var props = (0, _objectAssign2['default'])({}, this.props);
    props.className += ' ' + props.prefixCls + '-sub';
    return this.renderRoot(props);
  },

  lastExpandedSubMenu: function lastExpandedSubMenu() {
    var _this = this;

    var lastOpen = [];
    if (this.props.expandedKeys.length) {
      lastOpen = this.instanceArray.filter(function (c) {
        return _this.props.expandedKeys.indexOf(c.props.eventKey) !== -1;
      });
    }
    return lastOpen[0];
  }
});

exports['default'] = SubPopupMenu;
module.exports = exports['default'];