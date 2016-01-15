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
    closeSubMenuOnDeactive: _react2['default'].PropTypes.bool,
    deactiveSubMenuOnMouseLeave: _react2['default'].PropTypes.bool,
    openSubMenuOnMouseEnter: _react2['default'].PropTypes.bool,
    title: _react2['default'].PropTypes.node,
    onClick: _react2['default'].PropTypes.func,
    parent: _react2['default'].PropTypes.object,
    rootPrefixCls: _react2['default'].PropTypes.string,
    multiple: _react2['default'].PropTypes.bool,
    onSelect: _react2['default'].PropTypes.func,
    onDeselect: _react2['default'].PropTypes.func,
    onDestroy: _react2['default'].PropTypes.func,
    onHover: _react2['default'].PropTypes.func
  },

  mixins: [require('./SubMenuStateMixin')],

  getInitialState: function getInitialState() {
    return {
      defaultActiveFirst: false
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if ('open' in nextProps) {
      this.setOpenState(nextProps.open);
    }
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
      if (this.state.open) {
        menu.onKeyDown(e);
      } else {
        this.setOpenState(true);
        this.setState({
          defaultActiveFirst: true
        });
      }
      return true;
    }
    if (keyCode === _rcUtil.KeyCode.LEFT) {
      var handled = undefined;
      if (this.state.open) {
        handled = menu.onKeyDown(e);
      } else {
        return undefined;
      }
      if (!handled) {
        this.setOpenState(false);
        handled = true;
      }
      return handled;
    }

    if (this.state.open && (keyCode === _rcUtil.KeyCode.UP || keyCode === _rcUtil.KeyCode.DOWN)) {
      return menu.onKeyDown(e);
    }
  },

  onSubTreeMouseEnter: function onSubTreeMouseEnter() {
    if (this.props.parent.leaveTimer) {
      clearTimeout(this.props.parent.leaveTimer);
      this.props.parent.leaveTimer = null;
    }
  },

  onMouseEnter: function onMouseEnter() {
    if (this.props.parent.leaveTimer) {
      clearTimeout(this.props.parent.leaveTimer);
      this.props.parent.leaveTimer = null;
    }
    var props = this.props;
    props.onHover(props.eventKey);
    if (props.openSubMenuOnMouseEnter) {
      this.setOpenState(true);
      this.setState({
        defaultActiveFirst: false
      });
    }
  },

  onMouseLeave: function onMouseLeave() {
    var _this = this;

    this.props.parent.leaveTimer = setTimeout(function () {
      _this.props.parent.leaveTimer = null;
      if (_this.props.deactiveSubMenuOnMouseLeave) {
        _this.props.onHover(null);
      }
    }, 100);
  },

  onClick: function onClick() {
    if (!this.props.openSubMenuOnMouseEnter) {
      this.setOpenState(!this.state.open);
      this.setState({
        defaultActiveFirst: false
      });
    }
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

  renderChildren: function renderChildren(children) {
    var props = this.props;
    var baseProps = {
      mode: props.mode === 'horizontal' ? 'vertical' : props.mode,
      visible: this.state.open,
      level: props.level + 1,
      inlineIndent: props.inlineIndent,
      focusable: false,
      onClick: this.onSubMenuClick,
      closeSubMenuOnDeactive: props.closeSubMenuOnDeactive,
      deactiveSubMenuOnMouseLeave: props.deactiveSubMenuOnMouseLeave,
      openSubMenuOnMouseEnter: props.openSubMenuOnMouseEnter,
      onSelect: this.onSelect,
      onDeselect: this.onDeselect,
      onDestroy: this.onDestroy,
      selectedKeys: props.selectedKeys,
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

    this.haveOpened = this.haveOpened || this.state.open;
    var props = this.props;
    var prefixCls = this.getPrefixCls();
    var classes = (_classes = {}, _defineProperty(_classes, props.className, !!props.className), _defineProperty(_classes, prefixCls + '-' + props.mode, 1), _classes);

    classes[this.getOpenClassName()] = this.state.open;
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
          'aria-expanded': props.active,
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
  }
});

exports['default'] = SubMenu;
module.exports = exports['default'];