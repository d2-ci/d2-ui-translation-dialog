import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TranslationFormWithData from './TranslationForm.component';

var TranslationDialog = function (_Component) {
    _inherits(TranslationDialog, _Component);

    function TranslationDialog(props) {
        _classCallCheck(this, TranslationDialog);

        var _this = _possibleConstructorReturn(this, (TranslationDialog.__proto__ || _Object$getPrototypeOf(TranslationDialog)).call(this, props));

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

    _createClass(TranslationDialog, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { d2: this.props.d2 };
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                Dialog,
                _extends({
                    onClose: this.closeDialog,
                    maxWidth: 'lg'
                }, this.muiDialogProps()),
                React.createElement(
                    DialogTitle,
                    { id: 'form-dialog-title' },
                    this.i18n.getTranslation('translation_dialog_title')
                ),
                React.createElement(TranslationFormWithData, {
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
}(Component);

TranslationDialog.defaultProps = {
    fieldsToTranslate: []
};

TranslationDialog.propTypes = {
    objectToTranslate: PropTypes.shape({
        id: PropTypes.string.isRequired
    }).isRequired,
    onTranslationSaved: PropTypes.func.isRequired,
    onTranslationError: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    fieldsToTranslate: PropTypes.array,
    d2: PropTypes.object.isRequired
};

TranslationDialog.childContextTypes = {
    d2: PropTypes.object
};

export default TranslationDialog;