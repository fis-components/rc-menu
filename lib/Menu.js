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

var Menu = _react2['default'].createClass({
  displayName: 'Menu',

  propTypes: {
    defaultSelectedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
    onClick: _react2['default'].PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      defaultSelectedKeys: []
    };
  },

  mixins: [_MenuMixin2['default']],

  getInitialState: function getInitialState() {
    var props = this.props;
    var selectedKeys = props.defaultSelectedKeys;
    if ('selectedKeys' in props) {
      selectedKeys = props.selectedKeys;
    }
    return {
      selectedKeys: selectedKeys || []
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var props = {};
    if ('selectedKeys' in nextProps) {
      props.selectedKeys = nextProps.selectedKeys;
    }
    this.setState(props);
  },

  onDestroy: function onDestroy(key) {
    var state = this.state;
    var props = this.props;
    var selectedKeys = state.selectedKeys;
    var index = selectedKeys.indexOf(key);
    if (!('selectedKeys' in props) && index !== -1) {
      selectedKeys.splice(index, 1);
    }
  },

  onSelect: function onSelect(selectInfo) {
    var props = this.props;
    // root menu
    var selectedKeys = this.state.selectedKeys;
    var selectedKey = selectInfo.key;
    if (props.multiple) {
      selectedKeys = selectedKeys.concat([selectedKey]);
    } else {
      selectedKeys = [selectedKey];
    }
    if (!('selectedKeys' in props)) {
      this.setState({
        selectedKeys: selectedKeys
      });
    }
    props.onSelect((0, _objectAssign2['default'])({}, selectInfo, {
      selectedKeys: selectedKeys
    }));
  },

  onClick: function onClick(e) {
    var props = this.props;
    // no top menu
    if (!props.multiple) {
      this.setState({
        activeKey: null
      });
    }
    this.props.onClick(e);
  },

  onDeselect: function onDeselect(selectInfo) {
    var props = this.props;
    var selectedKeys = this.state.selectedKeys.concat();
    var selectedKey = selectInfo.key;
    var index = selectedKeys.indexOf(selectedKey);
    if (index !== -1) {
      selectedKeys.splice(index, 1);
    }
    if (!('selectedKeys' in props)) {
      this.setState({
        selectedKeys: selectedKeys
      });
    }
    props.onDeselect((0, _objectAssign2['default'])({}, selectInfo, {
      selectedKeys: selectedKeys
    }));
  },

  renderMenuItem: function renderMenuItem(c, i) {
    var props = this.props;
    var key = (0, _util.getKeyFromChildrenIndex)(c, i);
    var state = this.state;
    var extraProps = {
      selectedKeys: state.selectedKeys,
      selected: state.selectedKeys.indexOf(key) !== -1
    };
    extraProps.openSubMenuOnMouseEnter = props.openSubMenuOnMouseEnter;
    extraProps.closeSubMenuOnDeactive = true;
    extraProps.deactiveSubMenuOnMouseLeave = props.openSubMenuOnMouseEnter;
    if (this.lastOpenKey) {
      extraProps.open = state.activeKey === key;
    }
    return this.renderCommonMenuItem(c, i, extraProps);
  },

  render: function render() {
    var props = (0, _objectAssign2['default'])({}, this.props);
    var lastOpenKey = undefined;
    if (!props.openSubMenuOnMouseEnter) {
      var lastOpened = this.instanceArray.filter(function (c) {
        return c.state && c.state.open;
      });
      lastOpenKey = lastOpened[0] && lastOpened[0].props.eventKey;
    }
    this.lastOpenKey = lastOpenKey;
    props.className += ' ' + props.prefixCls + '-root';
    return this.renderRoot(props);
  }
});

exports['default'] = Menu;
module.exports = exports['default'];