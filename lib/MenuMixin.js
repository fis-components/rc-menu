'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcUtil = require('rc-util');

var _domScrollIntoView = require('dom-scroll-into-view');

var _domScrollIntoView2 = _interopRequireDefault(_domScrollIntoView);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _util = require('./util');

function getActiveKey(props) {
  var activeKey = props.activeKey;
  var children = props.children;
  if (activeKey) {
    var found = undefined;
    _react2['default'].Children.forEach(children, function (c, i) {
      if (!c.props.disabled && activeKey === (0, _util.getKeyFromChildrenIndex)(c, i)) {
        found = true;
      }
    });
    if (found) {
      return activeKey;
    }
  }
  activeKey = null;
  if (props.defaultActiveFirst) {
    _react2['default'].Children.forEach(children, function (c, i) {
      if (!activeKey && !c.props.disabled) {
        activeKey = (0, _util.getKeyFromChildrenIndex)(c, i);
      }
    });
    return activeKey;
  }
  return activeKey;
}

function saveRef(name, c) {
  if (c) {
    this.instanceArray.push(c);
  }
}

var MenuMixin = {
  propTypes: {
    focusable: _react2['default'].PropTypes.bool,
    multiple: _react2['default'].PropTypes.bool,
    style: _react2['default'].PropTypes.object,
    defaultActiveFirst: _react2['default'].PropTypes.bool,
    visible: _react2['default'].PropTypes.bool,
    activeKey: _react2['default'].PropTypes.string,
    selectedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
    defaultSelectedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
    defaultOpenedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
    openedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string)
  },

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rc-menu',
      className: '',
      mode: 'vertical',
      level: 1,
      inlineIndent: 24,
      visible: true,
      focusable: true,
      style: {}
    };
  },

  getInitialState: function getInitialState() {
    var props = this.props;
    return {
      activeKey: getActiveKey(props)
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var props = {};
    if ('activeKey' in nextProps) {
      props.activeKey = getActiveKey(nextProps);
    }
    this.setState(props);
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
    return this.props.visible || nextProps.visible;
  },

  componentWillMount: function componentWillMount() {
    this.instanceArray = [];
  },

  // all keyboard events callbacks run from here at first
  onKeyDown: function onKeyDown(e) {
    var _this = this;

    var keyCode = e.keyCode;
    var handled = undefined;
    this.instanceArray.forEach(function (obj) {
      if (obj.props.active) {
        handled = obj.onKeyDown(e);
      }
    });
    if (handled) {
      return 1;
    }
    var activeItem = undefined;
    switch (keyCode) {
      case _rcUtil.KeyCode.UP:
        activeItem = this.step(-1);
        break;
      case _rcUtil.KeyCode.DOWN:
        activeItem = this.step(1);
        break;
      default:
    }
    if (activeItem) {
      e.preventDefault();
      this.setState({
        activeKey: activeItem.props.eventKey
      }, function () {
        (0, _domScrollIntoView2['default'])(_react2['default'].findDOMNode(activeItem), _react2['default'].findDOMNode(_this), {
          onlyScrollIfNeeded: true
        });
      });
      return 1;
    }
  },

  onCommonItemHover: function onCommonItemHover(e) {
    var mode = this.props.mode;
    var key = e.key;
    var hover = e.hover;
    var trigger = e.trigger;

    var activeKey = this.state.activeKey;
    if (!trigger || hover || this.props.closeSubMenuOnMouseLeave || !e.item.isSubMenu || mode === 'inline') {
      this.setState({
        activeKey: hover ? key : null
      });
    } else {}
    // keep active for sub menu for click active
    // empty

    // clear last opened status
    if (hover && mode !== 'inline') {
      var activeItem = this.instanceArray.filter(function (c) {
        return c.props.eventKey === activeKey;
      })[0];
      if (activeItem && activeItem.isSubMenu && activeItem.props.eventKey !== key) {
        this.onOpenedChange({
          item: activeItem,
          key: activeItem.props.eventKey,
          opened: false
        });
      }
    }
  },

  renderCommonMenuItem: function renderCommonMenuItem(child, i, extraProps) {
    var state = this.state;
    var props = this.props;
    var key = (0, _util.getKeyFromChildrenIndex)(child, i);
    var childProps = child.props;
    var newChildProps = (0, _objectAssign2['default'])({
      mode: props.mode,
      level: props.level,
      inlineIndent: props.inlineIndent,
      renderMenuItem: this.renderMenuItem,
      rootPrefixCls: props.prefixCls,
      ref: (0, _rcUtil.createChainedFunction)(child.ref, saveRef.bind(this, key)),
      eventKey: key,
      closeSubMenuOnMouseLeave: props.closeSubMenuOnMouseLeave,
      onItemHover: this.onItemHover,
      active: !childProps.disabled && key === state.activeKey,
      multiple: props.multiple,
      onClick: this.onClick,
      onOpenedChange: this.onOpenedChange,
      onDeselect: this.onDeselect,
      onDestroy: this.onDestroy,
      onSelect: this.onSelect
    }, extraProps);
    if (props.mode === 'inline') {
      newChildProps.closeSubMenuOnMouseLeave = newChildProps.openSubMenuOnMouseEnter = false;
    }
    return _react2['default'].cloneElement(child, newChildProps);
  },

  renderRoot: function renderRoot(props) {
    var _classes;

    this.instanceArray = [];
    var classes = (_classes = {}, _defineProperty(_classes, props.prefixCls, 1), _defineProperty(_classes, props.prefixCls + '-' + props.mode, 1), _defineProperty(_classes, props.className, !!props.className), _classes);
    var domProps = {
      className: (0, _rcUtil.classSet)(classes),
      role: 'menu',
      'aria-activedescendant': ''
    };
    if (props.id) {
      domProps.id = props.id;
    }
    if (props.focusable) {
      domProps.tabIndex = '0';
      domProps.onKeyDown = this.onKeyDown;
    }
    return _react2['default'].createElement(
      'ul',
      _extends({ style: props.style
      }, domProps),
      _react2['default'].Children.map(props.children, this.renderMenuItem)
    );
  },

  step: function step(direction) {
    var children = this.instanceArray;
    var activeKey = this.state.activeKey;
    var len = children.length;
    if (direction < 0) {
      children = children.concat().reverse();
    }
    // find current activeIndex
    var activeIndex = -1;
    children.every(function (c, ci) {
      if (c.props.eventKey === activeKey) {
        activeIndex = ci;
        return false;
      }
      return true;
    });
    var start = (activeIndex + 1) % len;
    var i = start;
    for (;;) {
      var child = children[i];
      if (child.props.disabled) {
        i = (i + 1 + len) % len;
        // complete a loop
        if (i === start) {
          return null;
        }
      } else {
        return child;
      }
    }
  }
};

exports['default'] = MenuMixin;
module.exports = exports['default'];