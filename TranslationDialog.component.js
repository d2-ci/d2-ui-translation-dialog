'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogTitle = require('@material-ui/core/DialogTitle');

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _TranslationForm = require('./TranslationForm.component');

var _TranslationForm2 = _interopRequireDefault(_TranslationForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TranslationDialog = function (_Component) {
    (0, _inherits3.default)(TranslationDialog, _Component);

    function TranslationDialog(props) {
        (0, _classCallCheck3.default)(this, TranslationDialog);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TranslationDialog.__proto__ || (0, _getPrototypeOf2.default)(TranslationDialog)).call(this, props));

        _this.closeDialog = function () {
            _this.props.onRequestClose();
        };

        _this.translationSaved = function (args) {
            _this.props.onTranslationSaved(args);
            _this.closeDialog();
        };

        _this.translationError = function (err) {
            _this.props.onTranslationError(err);
        };

        _this.muiDialogProps = function () {
            var pick = function pick(_ref) {
                var open = _ref.open,
                    onEnter = _ref.onEnter,
                    onExit = _ref.onExit,
                    onExited = _ref.onExited;
                return {
                    open: open,
                    onEnter: onEnter,
                    onExit: onExit,
                    onExited: onExited
                };
            };

            return pick(_this.props);
        };

        _this.i18n = props.d2.i18n;
        return _this;
    }

    (0, _createClass3.default)(TranslationDialog, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { d2: this.props.d2 };
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _Dialog2.default,
                (0, _extends3.default)({
                    onClose: this.closeDialog,
                    maxWidth: 'lg'
                }, this.muiDialogProps()),
                _react2.default.createElement(
                    _DialogTitle2.default,
                    { id: 'form-dialog-title' },
                    this.i18n.getTranslation('translation_dialog_title')
                ),
                _react2.default.createElement(_TranslationForm2.default, {
                    model: this.props.objectToTranslate,
                    onTranslationSaved: this.translationSaved,
                    onTranslationError: this.translationError,
                    onCancel: this.closeDialog,
                    fieldsToTranslate: this.props.fieldsToTranslate
                })
            );
        }
    }]);
    return TranslationDialog;
}(_react.Component);

TranslationDialog.defaultProps = {
    fieldsToTranslate: []
};

TranslationDialog.propTypes = {
    objectToTranslate: _propTypes2.default.shape({
        id: _propTypes2.default.string.isRequired
    }).isRequired,
    onTranslationSaved: _propTypes2.default.func.isRequired,
    onTranslationError: _propTypes2.default.func.isRequired,
    open: _propTypes2.default.bool.isRequired,
    onRequestClose: _propTypes2.default.func.isRequired,
    fieldsToTranslate: _propTypes2.default.array,
    d2: _propTypes2.default.object.isRequired
};

TranslationDialog.childContextTypes = {
    d2: _propTypes2.default.object
};

exports.default = TranslationDialog;