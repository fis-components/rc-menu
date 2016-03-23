'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcUtil = require('rc-util');

var _domScrollIntoView = require('dom-scroll-into-view');

var _domScrollIntoView2 = _interopRequireDefault(_domScrollIntoView);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function noop() {}

var now = Date.now();

function getChildIndexInChildren(child, children) {
  var index = -1;
  _react2['default'].Children.forEach(children, function (c, i) {
    if (c === child) {
      index = i;
    }
  });
  return index;
}

function getKeyFromChildren(child, children) {
  return child.key || 'rcMenuItem_' + now + '_' + getChildIndexInChildren(child, children);
}

function getKeyFromChildrenIndex(child, index) {
  return child.key || 'rcMenuItem_' + now + '_' + index;
}

function getActiveKey(props) {
  var activeKey = props.activeKey;
  var children = props.children;
  if (activeKey) {
    var found = undefined;
    _react2['default'].Children.forEach(children, function (c, i) {
      if (!c.props.disabled && activeKey === getKeyFromChildrenIndex(c, i)) {
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
        activeKey = getKeyFromChildrenIndex(c, i);
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

var Menu = (function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu(props) {
    var _this = this;

    _classCallCheck(this, Menu);

    _get(Object.getPrototypeOf(Menu.prototype), 'constructor', this).call(this, props);
    var selectedKeys = props.defaultSelectedKeys;
    if ('selectedKeys' in props) {
      selectedKeys = props.selectedKeys;
    }
    this.state = {
      activeKey: getActiveKey(props),
      selectedKeys: selectedKeys || []
    };
    ['onItemHover', 'onDeselect', 'onSelect', 'onKeyDown', 'onDestroy', 'renderMenuItem'].forEach(function (m) {
      _this[m] = _this[m].bind(_this);
    });
  }

  _createClass(Menu, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = {};
      if ('activeKey' in nextProps) {
        props.activeKey = getActiveKey(nextProps);
      }
      if ('selectedKeys' in nextProps) {
        props.selectedKeys = nextProps.selectedKeys || [];
      }
      this.setState(props);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.visible || nextProps.visible;
    }

    // all keyboard events callbacks run from here at first
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      var _this2 = this;

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
          (0, _domScrollIntoView2['default'])(_react2['default'].findDOMNode(activeItem), _react2['default'].findDOMNode(_this2), {
            onlyScrollIfNeeded: true
          });
        });
        return 1;
      }
    }
  }, {
    key: 'onItemHover',
    value: function onItemHover(key) {
      this.setState({
        activeKey: key
      });
    }
  }, {
    key: 'onSelect',
    value: function onSelect(selectInfo) {
      var props = this.props;
      // root menu
      if (!props.sub) {
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
      } else {
        props.onSelect(selectInfo);
      }
    }
  }, {
    key: 'onDeselect',
    value: function onDeselect(selectInfo) {
      var props = this.props;
      if (!props.sub) {
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
      } else {
        props.onDeselect(selectInfo);
      }
    }
  }, {
    key: 'onDestroy',
    value: function onDestroy(key) {
      var state = this.state;
      var props = this.props;
      var selectedKeys = state.selectedKeys;
      var index = selectedKeys.indexOf(key);
      if (!props.sub) {
        if (!('selectedKeys' in props) && index !== -1) {
          selectedKeys.splice(index, 1);
        }
      } else {
        props.onDestroy(key);
      }
    }
  }, {
    key: 'renderMenuItem',
    value: function renderMenuItem(child) {
      var state = this.state;
      var props = this.props;
      var key = getKeyFromChildren(child, props.children);
      var childProps = child.props;
      var mode = props.mode;
      var openSubMenuOnHover = props.openSubMenuOnHover;
      var closeSubMenuOnDeactive = props.closeSubMenuOnDeactive;
      if (mode === 'inline') {
        openSubMenuOnHover = false;
        closeSubMenuOnDeactive = false;
      }
      return _react2['default'].cloneElement(child, {
        mode: props.mode,
        level: props.level,
        inlineIndent: props.inlineIndent,
        openSubMenuOnHover: openSubMenuOnHover,
        closeSubMenuOnDeactive: closeSubMenuOnDeactive,
        renderMenuItem: this.renderMenuItem,
        rootPrefixCls: props.prefixCls,
        ref: (0, _rcUtil.createChainedFunction)(child.ref, saveRef.bind(this, key)),
        eventKey: key,
        onHover: this.onItemHover,
        active: !childProps.disabled && key === state.activeKey,
        multiple: props.multiple,
        selectedKeys: state.selectedKeys,
        selected: state.selectedKeys.indexOf(key) !== -1,
        onClick: props.onClick,
        onDeselect: (0, _rcUtil.createChainedFunction)(childProps.onDeselect, this.onDeselect),
        onDestroy: 'selectedKeys' in props ? noop : this.onDestroy,
        onSelect: (0, _rcUtil.createChainedFunction)(childProps.onSelect, this.onSelect)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _classes;

      var props = this.props;
      this.instanceArray = [];
      var classes = (_classes = {}, _defineProperty(_classes, props.prefixCls, 1), _defineProperty(_classes, props.prefixCls + '-sub', !!props.sub), _defineProperty(_classes, props.prefixCls + '-root', !props.sub), _defineProperty(_classes, props.prefixCls + '-' + props.mode, 1), _defineProperty(_classes, props.className, !!props.className), _classes);
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
    }
  }, {
    key: 'step',
    value: function step(direction) {
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
  }]);

  return Menu;
})(_react2['default'].Component);

Menu.propTypes = {
  focusable: _react2['default'].PropTypes.bool,
  multiple: _react2['default'].PropTypes.bool,
  onSelect: _react2['default'].PropTypes.func,
  style: _react2['default'].PropTypes.object,
  onDeselect: _react2['default'].PropTypes.func,
  defaultActiveFirst: _react2['default'].PropTypes.bool,
  visible: _react2['default'].PropTypes.bool,
  openSubMenuOnHover: _react2['default'].PropTypes.bool,
  closeSubMenuOnDeactive: _react2['default'].PropTypes.bool,
  activeKey: _react2['default'].PropTypes.string,
  selectedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
  defaultSelectedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string)
};

Menu.defaultProps = {
  prefixCls: 'rc-menu',
  mode: 'vertical',
  level: 1,
  inlineIndent: 24,
  visible: true,
  focusable: true,
  openSubMenuOnHover: true,
  closeSubMenuOnDeactive: true,
  style: {},
  onSelect: noop,
  onClick: noop,
  onDeselect: noop
};

exports['default'] = Menu;
module.exports = exports['default'];