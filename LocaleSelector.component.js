import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

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
        props = _objectWithoutProperties(_ref, ['inputRef']);

    return React.createElement('div', _extends({ ref: inputRef }, props));
};

var Control = function Control(_ref2) {
    var selectProps = _ref2.selectProps,
        innerRef = _ref2.innerRef,
        innerProps = _ref2.innerProps,
        children = _ref2.children;
    return React.createElement(TextField, _extends({
        fullWidth: true,
        InputProps: {
            inputComponent: inputComponent,
            inputProps: _extends({
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
    return React.createElement(
        MenuItem,
        _extends({
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
    return React.createElement(
        Typography,
        _extends({
            color: 'textSecondary',
            className: selectProps.classes.placeholder
        }, innerProps),
        children
    );
};

var ValueContainer = function ValueContainer(_ref5) {
    var selectProps = _ref5.selectProps,
        children = _ref5.children;
    return React.createElement(
        'div',
        { className: selectProps.classes.valueContainer },
        children
    );
};

var Menu = function Menu(_ref6) {
    var selectProps = _ref6.selectProps,
        innerProps = _ref6.innerProps,
        children = _ref6.children;
    return React.createElement(
        Paper,
        _extends({ square: true, className: selectProps.classes.paper }, innerProps),
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

export var LocaleSelector = function (_React$Component) {
    _inherits(LocaleSelector, _React$Component);

    function LocaleSelector(props, context) {
        _classCallCheck(this, LocaleSelector);

        var _this = _possibleConstructorReturn(this, (LocaleSelector.__proto__ || _Object$getPrototypeOf(LocaleSelector)).call(this, props, context));

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

    _createClass(LocaleSelector, [{
        key: 'render',
        value: function render() {
            var classes = this.props.classes;


            return React.createElement(
                'div',
                { className: classes.root },
                React.createElement(Select, {
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
}(React.Component);

LocaleSelector.propTypes = {
    classes: PropTypes.object.isRequired,
    locales: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        locale: PropTypes.string.isRequired
    })).isRequired,
    onChange: PropTypes.func.isRequired,
    currentLocale: PropTypes.string
};

LocaleSelector.defaultProps = {
    currentLocale: ''
};

LocaleSelector.contextTypes = {
    d2: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(LocaleSelector);