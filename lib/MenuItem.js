'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcUtil = require('rc-util');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var MenuItem = (function (_React$Component) {
  _inherits(MenuItem, _React$Component);

  function MenuItem(props) {
    var _this = this;

    _classCallCheck(this, MenuItem);

    _get(Object.getPrototypeOf(MenuItem.prototype), 'constructor', this).call(this, props);
    ['onKeyDown', 'onMouseLeave', 'onMouseEnter', 'onClick'].forEach(function (m) {
      _this[m] = _this[m].bind(_this);
    });
  }

  _createClass(MenuItem, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var props = this.props;
      if (props.onDestroy) {
        props.onDestroy(props.eventKey);
      }
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      var keyCode = e.keyCode;
      if (keyCode === _rcUtil.KeyCode.ENTER) {
        this.onClick(e);
        return true;
      }
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave() {
      var eventKey = this.props.eventKey;
      this.props.onItemHover({
        key: eventKey,
        item: this,
        hover: false,
        trigger: 'mouseleave'
      });
    }
  }, {
    key: 'onMouseEnter',
    value: function onMouseEnter() {
      var props = this.props;
      var eventKey = props.eventKey;
      props.onItemHover({
        key: eventKey,
        item: this,
        hover: true,
        trigger: 'mouseenter'
      });
    }
  }, {
    key: 'onClick',
    value: function onClick(e) {
      var props = this.props;
      var eventKey = props.eventKey;
      var info = {
        key: eventKey,
        keyPath: [eventKey],
        item: this,
        domEvent: e
      };
      props.onClick(info);
      if (props.multiple) {
        if (props.selected) {
          props.onDeselect(info);
        } else {
          props.onSelect(info);
        }
      } else if (!props.selected) {
        props.onSelect(info);
      }
    }
  }, {
    key: 'getPrefixCls',
    value: function getPrefixCls() {
      return this.props.rootPrefixCls + '-item';
    }
  }, {
    key: 'getActiveClassName',
    value: function getActiveClassName() {
      return this.getPrefixCls() + '-active';
    }
  }, {
    key: 'getSelectedClassName',
    value: function getSelectedClassName() {
      return this.getPrefixCls() + '-selected';
    }
  }, {
    key: 'getDisabledClassName',
    value: function getDisabledClassName() {
      return this.getPrefixCls() + '-disabled';
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var classes = {};
      classes[this.getActiveClassName()] = !props.disabled && props.active;
      classes[this.getSelectedClassName()] = props.selected;
      classes[this.getDisabledClassName()] = props.disabled;
      classes[this.getPrefixCls()] = true;
      classes[props.className] = !!props.className;
      var attrs = {
        title: props.title,
        className: (0, _classnames2['default'])(classes),
        role: 'menuitem',
        'aria-selected': props.selected,
        'aria-disabled': props.disabled
      };
      var mouseEvent = {};
      if (!props.disabled) {
        mouseEvent = {
          onClick: this.onClick,
          onMouseLeave: this.onMouseLeave,
          onMouseEnter: this.onMouseEnter
        };
      }
      var style = {};
      if (props.mode === 'inline') {
        style.paddingLeft = props.inlineIndent * props.level;
      }
      return _react2['default'].createElement(
        'li',
        _extends({ style: style
        }, attrs, mouseEvent),
        props.children
      );
    }
  }]);

  return MenuItem;
})(_react2['default'].Component);

MenuItem.propTypes = {
  rootPrefixCls: _react2['default'].PropTypes.string,
  eventKey: _react2['default'].PropTypes.string,
  active: _react2['default'].PropTypes.bool,
  selected: _react2['default'].PropTypes.bool,
  disabled: _react2['default'].PropTypes.bool,
  title: _react2['default'].PropTypes.string,
  onSelect: _react2['default'].PropTypes.func,
  onClick: _react2['default'].PropTypes.func,
  onDeselect: _react2['default'].PropTypes.func,
  onItemHover: _react2['default'].PropTypes.func,
  onDestroy: _react2['default'].PropTypes.func
};

MenuItem.defaultProps = {
  onSelect: function onSelect() {},
  onMouseEnter: function onMouseEnter() {}
};

exports['default'] = MenuItem;
module.exports = exports['default'];