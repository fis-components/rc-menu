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
    openSubMenuOnMouseEnter: _react2['default'].PropTypes.bool,
    selectedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
    defaultSelectedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
    defaultExpandedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
    expandedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
    mode: _react2['default'].PropTypes.string,
    onClick: _react2['default'].PropTypes.func,
    onExpandedChange: _react2['default'].PropTypes.func,
    onSelect: _react2['default'].PropTypes.func,
    onDeselect: _react2['default'].PropTypes.func,
    onDestroy: _react2['default'].PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      openSubMenuOnMouseEnter: true,
      onExpandedChange: function onExpandedChange() {},
      onClick: function onClick() {},
      onSelect: function onSelect() {},
      onDeselect: function onDeselect() {},
      defaultSelectedKeys: [],
      defaultExpandedKeys: []
    };
  },

  mixins: [_MenuMixin2['default']],

  getInitialState: function getInitialState() {
    var props = this.props;
    var selectedKeys = props.defaultSelectedKeys;
    var expandedKeys = props.defaultExpandedKeys;
    if ('selectedKeys' in props) {
      selectedKeys = props.selectedKeys || [];
    }
    if ('expandedKeys' in props) {
      expandedKeys = props.expandedKeys || [];
    }
    return {
      selectedKeys: selectedKeys, expandedKeys: expandedKeys
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var props = {};
    if ('selectedKeys' in nextProps) {
      props.selectedKeys = nextProps.selectedKeys;
    }
    if ('expandedKeys' in nextProps) {
      props.expandedKeys = nextProps.expandedKeys;
    }
    this.setState(props);
  },

  onDestroy: function onDestroy(key) {
    var state = this.state;
    var props = this.props;
    var selectedKeys = state.selectedKeys;
    var expandedKeys = state.expandedKeys;
    var index = selectedKeys.indexOf(key);
    if (!('selectedKeys' in props) && index !== -1) {
      selectedKeys.splice(index, 1);
    }
    index = expandedKeys.indexOf(key);
    if (!('expandedKeys' in props) && index !== -1) {
      expandedKeys.splice(index, 1);
    }
  },

  onItemHover: function onItemHover(e) {
    var key = e.key;
    var hover = e.hover;
    var trigger = e.trigger;
    var item = e.item;

    if (!trigger) {
      this.setState({
        activeKey: hover ? key : null
      });
    } else if (hover || this.props.openSubMenuOnMouseEnter) {
      this.setState({
        activeKey: hover ? key : null
      });
    }

    if (hover && this.props.openSubMenuOnMouseEnter && !item.isSubMenu) {
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
    if (!props.multiple && !this.isInlineMode()) {
      var tmp = this.instanceArray.filter(function (c) {
        return c.props.eventKey === e.key;
      });
      if (!tmp.length) {
        this.setState({
          activeKey: null
        });
        if (!('expandedKeys' in this.props)) {
          this.setState({ expandedKeys: [] });
        }
        this.props.onExpandedChange({ expandedKeys: [] });
      }
    }
    props.onClick(e);
  },

  onExpandedChange: function onExpandedChange(e) {
    var expandedKeys = this.state.expandedKeys;
    var changed = true;
    if (e.expanded) {
      changed = expandedKeys.indexOf(e.key) === -1;
      if (changed) {
        // same level only one turn on
        if (!this.isInlineMode()) {
          expandedKeys = expandedKeys.filter(function (k) {
            return e.parent.instanceArray.every(function (c) {
              return c.props.eventKey !== k;
            });
          });
        }
        expandedKeys = expandedKeys.concat(e.key);
      }
    } else {
      var index = expandedKeys.indexOf(e.key);
      changed = index !== -1;
      if (changed) {
        expandedKeys = expandedKeys.concat();
        expandedKeys.splice(index, 1);
      }
    }
    if (changed) {
      var trigger = e.trigger;
      var mode = this.props.mode;
      if (trigger) {
        if (trigger === 'mouseenter') {
          if (mode === 'inline') {
            changed = false;
          } else if (this.props.openSubMenuOnMouseEnter || e.item.props.level !== 1) {
            changed = true;
          } else if (e.item.props.level === 1) {
            changed = !!this.lastExpandedSubMenu();
          } else {
            changed = true;
          }
        } else if (trigger === 'mouseleave') {
          if (mode === 'inline') {
            changed = false;
          } else if (this.props.openSubMenuOnMouseEnter) {
            changed = true;
          } else {
            changed = false;
          }
        }
      }
      if (!('expandedKeys' in this.props)) {
        if (changed) {
          this.setState({ expandedKeys: expandedKeys });
        }
      }
      if (changed) {
        this.props.onExpandedChange((0, _objectAssign2['default'])({ expandedKeys: expandedKeys }, e));
      }
    }
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
    var key = (0, _util.getKeyFromChildrenIndex)(c, i);
    var state = this.state;
    var extraProps = {
      expandedKeys: state.expandedKeys,
      expanded: state.expandedKeys.indexOf(key) !== -1,
      selectedKeys: state.selectedKeys,
      selected: state.selectedKeys.indexOf(key) !== -1
    };
    return this.renderCommonMenuItem(c, i, extraProps);
  },

  render: function render() {
    var props = (0, _objectAssign2['default'])({}, this.props);
    props.className += ' ' + props.prefixCls + '-root';
    return this.renderRoot(props);
  },

  isInlineMode: function isInlineMode() {
    return this.props.mode === 'inline';
  },

  lastExpandedSubMenu: function lastExpandedSubMenu() {
    var _this = this;

    var lastOpen = [];
    if (this.state.expandedKeys.length) {
      lastOpen = this.instanceArray.filter(function (c) {
        return _this.state.expandedKeys.indexOf(c.props.eventKey) !== -1;
      });
    }
    return lastOpen[0];
  }
});

exports['default'] = Menu;
module.exports = exports['default'];