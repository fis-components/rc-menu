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
    closeSubMenuOnMouseLeave: _react2['default'].PropTypes.bool,
    selectedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
    defaultSelectedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
    defaultOpenedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
    openedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
    mode: _react2['default'].PropTypes.string,
    onClick: _react2['default'].PropTypes.func,
    onOpenedChange: _react2['default'].PropTypes.func,
    onSelect: _react2['default'].PropTypes.func,
    onDeselect: _react2['default'].PropTypes.func,
    onDestroy: _react2['default'].PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      openSubMenuOnMouseEnter: true,
      closeSubMenuOnMouseLeave: true,
      onOpenedChange: _util.noop,
      onClick: _util.noop,
      onSelect: _util.noop,
      onOpen: _util.noop,
      onClose: _util.noop,
      onDeselect: _util.noop,
      defaultSelectedKeys: [],
      defaultOpenedKeys: []
    };
  },

  mixins: [_MenuMixin2['default']],

  getInitialState: function getInitialState() {
    var props = this.props;
    var selectedKeys = props.defaultSelectedKeys;
    var openedKeys = props.defaultOpenedKeys;
    if ('selectedKeys' in props) {
      selectedKeys = props.selectedKeys || [];
    }
    if ('openedKeys' in props) {
      openedKeys = props.openedKeys || [];
    }
    return {
      selectedKeys: selectedKeys, openedKeys: openedKeys
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var props = {};
    if ('selectedKeys' in nextProps) {
      props.selectedKeys = nextProps.selectedKeys;
    }
    if ('openedKeys' in nextProps) {
      props.openedKeys = nextProps.openedKeys;
    }
    this.setState(props);
  },

  onDestroy: function onDestroy(key) {
    var state = this.state;
    var props = this.props;
    var selectedKeys = state.selectedKeys;
    var openedKeys = state.openedKeys;
    var index = selectedKeys.indexOf(key);
    if (!('selectedKeys' in props) && index !== -1) {
      selectedKeys.splice(index, 1);
    }
    index = openedKeys.indexOf(key);
    if (!('openedKeys' in props) && index !== -1) {
      openedKeys.splice(index, 1);
    }
  },

  onItemHover: function onItemHover(e) {
    var _this = this;

    var item = e.item;

    // special for top sub menu
    if (this.props.mode !== 'inline' && !this.props.closeSubMenuOnMouseLeave && item.isSubMenu) {
      (function () {
        var activeKey = _this.state.activeKey;
        var activeItem = _this.instanceArray.filter(function (c) {
          return c.props.eventKey === activeKey;
        })[0];
        if (activeItem && activeItem.props.opened) {
          _this.onOpenedChange({
            key: item.props.eventKey,
            item: e.item,
            opened: true
          });
        }
      })();
    }

    this.onCommonItemHover(e);
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
        if (!('openedKeys' in this.props)) {
          this.setState({ openedKeys: [] });
        }
        this.props.onOpenedChange({ openedKeys: [] });
      }
    }
    props.onClick(e);
  },

  onOpenedChange: function onOpenedChange(e) {
    var openedKeys = this.state.openedKeys;
    var props = this.props;
    var changed = true;
    if (e.opened) {
      changed = openedKeys.indexOf(e.key) === -1;
      if (changed) {
        openedKeys = openedKeys.concat(e.key);
      }
    } else {
      var index = openedKeys.indexOf(e.key);
      changed = index !== -1;
      if (changed) {
        openedKeys = openedKeys.concat();
        openedKeys.splice(index, 1);
      }
    }
    if (changed) {
      // hack: batch does not update state
      this.state.openedKeys = openedKeys;
      if (!('openedKeys' in this.props)) {
        this.setState({ openedKeys: openedKeys });
      }
      var info = (0, _objectAssign2['default'])({ openedKeys: openedKeys }, e);
      if (e.opened) {
        props.onOpen(info);
      } else {
        props.onClose(info);
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
      openedKeys: state.openedKeys,
      opened: state.openedKeys.indexOf(key) !== -1,
      selectedKeys: state.selectedKeys,
      selected: state.selectedKeys.indexOf(key) !== -1,
      openSubMenuOnMouseEnter: this.props.openSubMenuOnMouseEnter
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

  lastOpenedSubMenu: function lastOpenedSubMenu() {
    var _this2 = this;

    var lastOpen = [];
    if (this.state.openedKeys.length) {
      lastOpen = this.instanceArray.filter(function (c) {
        return _this2.state.openedKeys.indexOf(c.props.eventKey) !== -1;
      });
    }
    return lastOpen[0];
  }
});

exports['default'] = Menu;
module.exports = exports['default'];