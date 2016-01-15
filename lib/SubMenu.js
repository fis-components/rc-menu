'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcUtil = require('rc-util');

var SubMenu = _react2['default'].createClass({
  displayName: 'SubMenu',

  propTypes: {
    closeOnDeactive: _react2['default'].PropTypes.bool,
    closeSubMenuOnDeactive: _react2['default'].PropTypes.bool,
    openOnHover: _react2['default'].PropTypes.bool,
    openSubMenuOnHover: _react2['default'].PropTypes.bool,
    title: _react2['default'].PropTypes.node,
    onClick: _react2['default'].PropTypes.func,
    rootPrefixCls: _react2['default'].PropTypes.string,
    multiple: _react2['default'].PropTypes.bool,
    onSelect: _react2['default'].PropTypes.func,
    onDeselect: _react2['default'].PropTypes.func,
    onHover: _react2['default'].PropTypes.func
  },

  mixins: [require('./SubMenuStateMixin')],

  getInitialState: function getInitialState() {
    return {
      defaultActiveFirst: false
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!nextProps.active && this.isCloseOnDeactive()) {
      this.setOpenState(false);
    }
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onMouseEnter: function onMouseEnter() {},
      title: ''
    };
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

  onMouseEnter: function onMouseEnter() {
    var props = this.props;
    props.onHover(props.eventKey);
    var openOnHover = props.openOnHover;
    if (openOnHover === undefined) {
      openOnHover = props.openSubMenuOnHover;
    }
    if (openOnHover === undefined) {
      openOnHover = true;
    }
    if (openOnHover) {
      this.setOpenState(true);
      this.setState({
        defaultActiveFirst: false
      });
    }
  },

  onMouseLeave: function onMouseLeave() {
    if (!this.state.open) {
      this.props.onHover(null);
    }
  },

  onClick: function onClick() {
    if (this.isCloseOnDeactive()) {
      this.setOpenState(true);
    } else {
      this.setOpenState(!this.state.open);
    }
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

  renderChildren: function renderChildren(children) {
    var props = this.props;
    var childrenCount = _react2['default'].Children.count(children);
    var mode = props.mode;
    if (mode !== 'inline') {
      mode = undefined;
    }
    var baseProps = {
      sub: true,
      visible: this.state.open,
      level: props.level + 1,
      inlineIndent: props.inlineIndent,
      openSubMenuOnHover: props.openSubMenuOnHover,
      closeSubMenuOnDeactive: props.closeSubMenuOnDeactive,
      focusable: false,
      onClick: this.onSubMenuClick,
      onSelect: this.onSelect,
      onDeselect: this.onDeselect,
      selectedKeys: props.selectedKeys,
      defaultActiveFirst: this.state.defaultActiveFirst,
      multiple: props.multiple,
      prefixCls: props.rootPrefixCls,
      id: this._menuId,
      ref: this.saveMenuInstance
    };
    if (mode) {
      baseProps.mode = mode;
    }
    if (childrenCount === 1 && children.type === _Menu2['default']) {
      var menu = children;
      baseProps.ref = (0, _rcUtil.createChainedFunction)(menu.ref, this.saveMenuInstance);
      baseProps.onClick = (0, _rcUtil.createChainedFunction)(menu.props.onClick, this.onSubMenuClick);
      return _react2['default'].cloneElement(menu, baseProps);
    }
    return _react2['default'].createElement(
      _Menu2['default'],
      baseProps,
      children
    );
  },

  render: function render() {
    var _classes;

    this.haveOpened = this.haveOpened || this.state.opened;
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
        onMouseLeave: this.onMouseLeave
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
  },

  isCloseOnDeactive: function isCloseOnDeactive() {
    var closeOnDeactive = this.props.closeOnDeactive;
    if (closeOnDeactive === undefined) {
      closeOnDeactive = this.props.closeSubMenuOnDeactive;
    }
    if (closeOnDeactive === undefined) {
      closeOnDeactive = true;
    }
    return closeOnDeactive;
  }
});

exports['default'] = SubMenu;
module.exports = exports['default'];