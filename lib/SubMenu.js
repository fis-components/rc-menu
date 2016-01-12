'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _SubPopupMenu = require('./SubPopupMenu');

var _SubPopupMenu2 = _interopRequireDefault(_SubPopupMenu);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcUtil = require('rc-util');

var SubMenu = _react2['default'].createClass({
  displayName: 'SubMenu',

  propTypes: {
    title: _react2['default'].PropTypes.node,
    onClick: _react2['default'].PropTypes.func,
    onOpenedChange: _react2['default'].PropTypes.func,
    rootPrefixCls: _react2['default'].PropTypes.string,
    eventKey: _react2['default'].PropTypes.string,
    multiple: _react2['default'].PropTypes.bool,
    active: _react2['default'].PropTypes.bool,
    opened: _react2['default'].PropTypes.bool,
    onSelect: _react2['default'].PropTypes.func,
    closeSubMenuOnMouseLeave: _react2['default'].PropTypes.bool,
    onDeselect: _react2['default'].PropTypes.func,
    onDestroy: _react2['default'].PropTypes.func,
    onItemHover: _react2['default'].PropTypes.func
  },

  mixins: [require('./SubMenuStateMixin')],

  getInitialState: function getInitialState() {
    this.isSubMenu = 1;
    return {
      defaultActiveFirst: false
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onMouseEnter: function onMouseEnter() {},
      title: ''
    };
  },

  componentWillUnmount: function componentWillUnmount() {
    var props = this.props;
    if (props.onDestroy) {
      props.onDestroy(props.eventKey);
    }
  },

  onDestroy: function onDestroy(key) {
    this.props.onDestroy(key);
  },

  onKeyDown: function onKeyDown(e) {
    var keyCode = e.keyCode;
    var menu = this.menuInstance;

    if (keyCode === _rcUtil.KeyCode.ENTER) {
      this.onClick(e);
      this.setState({
        defaultActiveFirst: true
      });
      return true;
    }

    if (keyCode === _rcUtil.KeyCode.RIGHT) {
      if (this.props.opened) {
        menu.onKeyDown(e);
      } else {
        this.triggerOpenedChange(true);
        this.setState({
          defaultActiveFirst: true
        });
      }
      return true;
    }
    if (keyCode === _rcUtil.KeyCode.LEFT) {
      var handled = undefined;
      if (this.props.opened) {
        handled = menu.onKeyDown(e);
      } else {
        return undefined;
      }
      if (!handled) {
        this.triggerOpenedChange(false);
        handled = true;
      }
      return handled;
    }

    if (this.props.opened && (keyCode === _rcUtil.KeyCode.UP || keyCode === _rcUtil.KeyCode.DOWN)) {
      return menu.onKeyDown(e);
    }
  },

  onSubTreeMouseEnter: function onSubTreeMouseEnter() {
    if (this.leaveTimer) {
      clearTimeout(this.leaveTimer);
      this.leaveTimer = null;
    }
  },

  onOpenedChange: function onOpenedChange(e) {
    this.props.onOpenedChange(e);
  },

  onMouseEnter: function onMouseEnter() {
    if (this.leaveTimer) {
      clearTimeout(this.leaveTimer);
      this.leaveTimer = null;
    }
    var props = this.props;
    props.onItemHover({
      key: this.props.eventKey,
      item: this,
      hover: true,
      trigger: 'mouseenter'
    });
    if (props.openSubMenuOnMouseEnter) {
      this.triggerOpenedChange(true);
    }
    this.setState({
      defaultActiveFirst: false
    });
  },

  onMouseLeave: function onMouseLeave() {
    var _this = this;

    // prevent popmenu and submenu gap
    this.leaveTimer = setTimeout(function () {
      // leave whole sub tree
      // still active
      if (_this.isMounted() && _this.props.active) {
        _this.props.onItemHover({
          key: _this.props.eventKey,
          item: _this,
          hover: false,
          trigger: 'mouseleave'
        });
      }
      if (_this.isMounted() && _this.props.opened) {
        if (_this.props.closeSubMenuOnMouseLeave) {
          _this.triggerOpenedChange(false);
        }
      }
    }, 100);
  },

  onClick: function onClick() {
    this.triggerOpenedChange(!this.props.opened, 'click');
    this.setState({
      defaultActiveFirst: false
    });
  },

  onSubMenuClick: function onSubMenuClick(info) {
    this.props.onClick(info);
  },

  onSelect: function onSelect(info) {
    this.props.onSelect(info);
  },

  onDeselect: function onDeselect(info) {
    this.props.onDeselect(info);
  },

  getPrefixCls: function getPrefixCls() {
    return this.props.rootPrefixCls + '-submenu';
  },

  getActiveClassName: function getActiveClassName() {
    return this.getPrefixCls() + '-active';
  },

  getDisabledClassName: function getDisabledClassName() {
    return this.getPrefixCls() + '-disabled';
  },

  getOpenedClassName: function getOpenedClassName() {
    return this.props.rootPrefixCls + '-submenu-opened';
  },

  renderChildren: function renderChildren(children) {
    var props = this.props;
    var baseProps = {
      mode: props.mode === 'horizontal' ? 'vertical' : props.mode,
      visible: this.props.opened,
      level: props.level + 1,
      inlineIndent: props.inlineIndent,
      focusable: false,
      onClick: this.onSubMenuClick,
      onSelect: this.onSelect,
      onDeselect: this.onDeselect,
      onDestroy: this.onDestroy,
      selectedKeys: props.selectedKeys,
      openedKeys: props.openedKeys,
      onOpenedChange: this.onOpenedChange,
      closeSubMenuOnMouseLeave: props.closeSubMenuOnMouseLeave,
      defaultActiveFirst: this.state.defaultActiveFirst,
      multiple: props.multiple,
      prefixCls: props.rootPrefixCls,
      id: this._menuId,
      ref: this.saveMenuInstance
    };
    return _react2['default'].createElement(
      _SubPopupMenu2['default'],
      baseProps,
      children
    );
  },

  render: function render() {
    var _classes;

    this.haveOpened = this.haveOpened || this.props.opened;
    var props = this.props;
    var prefixCls = this.getPrefixCls();
    var classes = (_classes = {}, _defineProperty(_classes, props.className, !!props.className), _defineProperty(_classes, prefixCls + '-' + props.mode, 1), _classes);

    classes[this.getOpenedClassName()] = this.props.opened;
    classes[this.getActiveClassName()] = props.active;
    classes[this.getDisabledClassName()] = props.disabled;
    this._menuId = this._menuId || (0, _rcUtil.guid)();
    classes[prefixCls] = true;
    classes[prefixCls + '-' + props.mode] = 1;
    var clickEvents = {};
    var mouseEvents = {};
    var titleMouseEvents = {};
    if (!props.disabled) {
      clickEvents = {
        onClick: this.onClick
      };
      mouseEvents = {
        onMouseLeave: this.onMouseLeave,
        onMouseEnter: this.onSubTreeMouseEnter
      };
      // only works in title, not outer li
      titleMouseEvents = {
        onMouseEnter: this.onMouseEnter
      };
    }
    var style = {};
    if (props.mode === 'inline') {
      style.paddingLeft = props.inlineIndent * props.level;
    }
    return _react2['default'].createElement(
      'li',
      _extends({ className: (0, _rcUtil.classSet)(classes) }, mouseEvents),
      _react2['default'].createElement(
        'div',
        _extends({
          style: style,
          className: prefixCls + '-title'
        }, titleMouseEvents, clickEvents, {
          'aria-opened': props.opened,
          'aria-owns': this._menuId,
          'aria-haspopup': 'true'
        }),
        props.title
      ),
      this.renderChildren(props.children)
    );
  },

  saveMenuInstance: function saveMenuInstance(c) {
    this.menuInstance = c;
  },

  triggerOpenedChange: function triggerOpenedChange(opened, type) {
    this.onOpenedChange({
      key: this.props.eventKey,
      item: this,
      trigger: type,
      opened: opened
    });
  }
});

exports['default'] = SubMenu;
module.exports = exports['default'];