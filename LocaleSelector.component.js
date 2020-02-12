'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LocaleSelector = undefined;

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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _styles = require('@material-ui/core/styles');

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        root: {
            flexGrow: 1,
            height: 60
        },
        input: {
            display: 'flex',
            padding: 0
        },
        valueContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            flex: 1,
            alignItems: 'center'
        },
        placeholder: {
            position: 'absolute',
            left: 2,
            fontSize: 16
        },
        paper: {
            position: 'absolute',
            zIndex: 1,
            marginTop: theme.spacing.unit,
            left: 0,
            right: 0
        }
    };
};

var inputComponent = function inputComponent(_ref) {
    var inputRef = _ref.inputRef,
        props = (0, _objectWithoutProperties3.default)(_ref, ['inputRef']);
    return _react2.default.createElement('div', (0, _extends3.default)({ ref: inputRef }, props));
};

var Control = function Control(_ref2) {
    var selectProps = _ref2.selectProps,
        innerRef = _ref2.innerRef,
        innerProps = _ref2.innerProps,
        children = _ref2.children;
    return _react2.default.createElement(_TextField2.default, (0, _extends3.default)({
        fullWidth: true,
        InputProps: {
            inputComponent: inputComponent,
            inputProps: (0, _extends3.default)({
                className: selectProps.classes.input,
                inputRef: innerRef,
                children: children
            }, innerProps)
        }
    }, selectProps.textFieldProps));
};

var Option = function Option(_ref3) {
    var innerRef = _ref3.innerRef,
        isFocused = _ref3.isFocused,
        innerProps = _ref3.innerProps,
        children = _ref3.children;
    return _react2.default.createElement(
        _MenuItem2.default,
        (0, _extends3.default)({
            buttonRef: innerRef,
            selected: isFocused,
            component: 'div'
        }, innerProps),
        children
    );
};

var Placeholder = function Placeholder(_ref4) {
    var selectProps = _ref4.selectProps,
        innerProps = _ref4.innerProps,
        children = _ref4.children;
    return _react2.default.createElement(
        _Typography2.default,
        (0, _extends3.default)({
            color: 'textSecondary',
            className: selectProps.classes.placeholder
        }, innerProps),
        children
    );
};

var ValueContainer = function ValueContainer(_ref5) {
    var selectProps = _ref5.selectProps,
        children = _ref5.children;
    return _react2.default.createElement(
        'div',
        { className: selectProps.classes.valueContainer },
        children
    );
};

var Menu = function Menu(_ref6) {
    var selectProps = _ref6.selectProps,
        innerProps = _ref6.innerProps,
        children = _ref6.children;
    return _react2.default.createElement(
        _Paper2.default,
        (0, _extends3.default)({ square: true, className: selectProps.classes.paper }, innerProps),
        children
    );
};

var components = {
    Control: Control,
    Menu: Menu,
    Option: Option,
    Placeholder: Placeholder,
    ValueContainer: ValueContainer
};

var LocaleSelector = exports.LocaleSelector = function (_React$Component) {
    (0, _inherits3.default)(LocaleSelector, _React$Component);

    function LocaleSelector(props, context) {
        (0, _classCallCheck3.default)(this, LocaleSelector);

        var _this = (0, _possibleConstructorReturn3.default)(this, (LocaleSelector.__proto__ || (0, _getPrototypeOf2.default)(LocaleSelector)).call(this, props, context));

        _this.mappedItem = function (item) {
            return {
                value: item.locale,
                label: item.name
            };
        };

        _this.onLocaleChange = function (locale) {
            _this.props.onChange(locale.value);
        };

        _this.getSuggestions = function () {
            return _this.props.locales.map(function (s) {
                return _this.mappedItem(s);
            });
        };

        _this.getCurrentValue = function () {
            var item = _this.props.locales.find(function (s) {
                return s.locale === _this.props.currentLocale;
            });
            return item ? _this.mappedItem(item) : null;
        };

        var i18n = _this.context.d2.i18n;
        _this.getTranslation = i18n.getTranslation.bind(i18n);
        return _this;
    }

    (0, _createClass3.default)(LocaleSelector, [{
        key: 'render',
        value: function render() {
            var classes = this.props.classes;


            return _react2.default.createElement(
                'div',
                { className: classes.root },
                _react2.default.createElement(_reactSelect2.default, {
                    classes: classes,
                    options: this.getSuggestions(),
                    components: components,
                    value: this.getCurrentValue(),
                    onChange: this.onLocaleChange,
                    placeholder: this.getTranslation('select_locale')
                })
            );
        }
    }]);
    return LocaleSelector;
}(_react2.default.Component);

LocaleSelector.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    locales: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        name: _propTypes2.default.string.isRequired,
        locale: _propTypes2.default.string.isRequired
    })).isRequired,
    onChange: _propTypes2.default.func.isRequired,
    currentLocale: _propTypes2.default.string
};

LocaleSelector.defaultProps = {
    currentLocale: ''
};

LocaleSelector.contextTypes = {
    d2: _propTypes2.default.object
};

exports.default = (0, _styles.withStyles)(styles, { withTheme: true })(LocaleSelector);