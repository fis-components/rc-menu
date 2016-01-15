'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rcUtil = require('rc-util');

var _rcUtil2 = _interopRequireDefault(_rcUtil);

exports['default'] = {
  getInitialState: function getInitialState() {
    return {
      open: this.props.open || false
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.state.open && this.props.mode !== 'inline') {
      this.bindRootCloseHandlers();
    }
  },

  getOpenClassName: function getOpenClassName() {
    return this.props.openClassName || this.props.rootPrefixCls + '-submenu-open';
  },

  setOpenState: function setOpenState(newState, onStateChangeComplete) {
    if (this.state.open !== newState) {
      if (this.props.mode !== 'inline') {
        if (newState) {
          this.bindRootCloseHandlers();
        } else {
          this.unbindRootCloseHandlers();
        }
      }
      this.setState({
        open: newState
      }, onStateChangeComplete);
    }
  },

  handleDocumentKeyUp: function handleDocumentKeyUp(e) {
    if (e.keyCode === _rcUtil.KeyCode.ESC) {
      this.props.onHover(null);
    }
  },

  handleDocumentClick: function handleDocumentClick(e) {
    // If the click originated from within this component
    // don't do anything.
    if (_rcUtil2['default'].Dom.contains(React.findDOMNode(this), e.target)) {
      return;
    }
    this.props.onHover(null);
  },

  bindRootCloseHandlers: function bindRootCloseHandlers() {
    if (!this._onDocumentClickListener) {
      this._onDocumentClickListener = _rcUtil2['default'].Dom.addEventListener(document, 'click', this.handleDocumentClick);
      this._onDocumentKeyupListener = _rcUtil2['default'].Dom.addEventListener(document, 'keyup', this.handleDocumentKeyUp);
    }
  },

  unbindRootCloseHandlers: function unbindRootCloseHandlers() {
    if (this._onDocumentClickListener) {
      this._onDocumentClickListener.remove();
      this._onDocumentClickListener = null;
    }

    if (this._onDocumentKeyupListener) {
      this._onDocumentKeyupListener.remove();
      this._onDocumentKeyupListener = null;
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.unbindRootCloseHandlers();
  }
};
module.exports = exports['default'];