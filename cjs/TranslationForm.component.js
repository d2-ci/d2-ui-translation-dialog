'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _DialogActions = require('@material-ui/core/DialogActions');

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _DialogContent = require('@material-ui/core/DialogContent');

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _camelCaseToUnderscores = require('d2-utilizr/lib/camelCaseToUnderscores');

var _camelCaseToUnderscores2 = _interopRequireDefault(_camelCaseToUnderscores);

var _Observable = require('rxjs/Observable');

var _Store = require('@dhis2/d2-ui-core/build/es/store/Store');

var _Store2 = _interopRequireDefault(_Store);

var _CircularProgress = require('@material-ui/core/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _LocaleSelector = require('./LocaleSelector.component');

var _LocaleSelector2 = _interopRequireDefault(_LocaleSelector);

var _translationForm = require('./translationForm.actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTranslationFormData(model) {
    var translationStore = _Store2.default.create();

    (0, _translationForm.getTranslationsForModel)(model).subscribe(function (translations) {
        translationStore.setState(translations);
    });

    return _Observable.Observable.combineLatest((0, _translationForm.getLocales)(), translationStore, function () {
        for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
            data[_key] = arguments[_key];
        }

        return _assign2.default.apply(Object, [{
            objectToTranslate: model,
            setTranslations: function setTranslations(translations) {
                translationStore.setState({
                    translations: translations
                });
            }
        }].concat(data));
    });
}

var LoadingDataElement = function LoadingDataElement() {
    return _react2.default.createElement(
        'div',
        { style: { textAlign: 'center', minHeight: 350 } },
        _react2.default.createElement(_CircularProgress2.default, null)
    );
};

var TranslationForm = function (_Component) {
    (0, _inherits3.default)(TranslationForm, _Component);

    function TranslationForm(props, context) {
        (0, _classCallCheck3.default)(this, TranslationForm);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TranslationForm.__proto__ || (0, _getPrototypeOf2.default)(TranslationForm)).call(this, props, context));

        _this.state = {
            loading: true,
            translations: {},
            translationValues: {},
            currentSelectedLocale: ''
        };

        _this.setCurrentLocale = function (locale) {
            _this.setState({
                currentSelectedLocale: locale
            });
        };

        _this.setValue = function (property, event) {
            var newTranslations = [].concat(_this.props.translations);
            var translation = newTranslations.find(function (t) {
                return t.locale === _this.state.currentSelectedLocale && t.property.toLowerCase() === (0, _camelCaseToUnderscores2.default)(property);
            });

            if (translation) {
                if (event.target.value) {
                    translation.value = event.target.value;
                } else {
                    // Remove translation from the array
                    newTranslations = newTranslations.filter(function (t) {
                        return t !== translation;
                    });
                }
            } else {
                translation = {
                    property: (0, _camelCaseToUnderscores2.default)(property).toUpperCase(),
                    locale: _this.state.currentSelectedLocale,
                    value: event.target.value
                };

                newTranslations.push(translation);
            }

            _this.props.setTranslations(newTranslations);
        };

        _this.saveTranslations = function () {
            (0, _translationForm.saveTranslations)(_this.props.objectToTranslate, _this.props.translations).subscribe(_this.props.onTranslationSaved, _this.props.onTranslationError);
        };

        var i18n = _this.context.d2.i18n;
        _this.getTranslation = i18n.getTranslation.bind(i18n);
        return _this;
    }

    (0, _createClass3.default)(TranslationForm, [{
        key: 'getTranslationValueFor',
        value: function getTranslationValueFor(fieldName) {
            var _this2 = this;

            var translation = this.props.translations.find(function (t) {
                return t.locale === _this2.state.currentSelectedLocale && t.property.toLowerCase() === (0, _camelCaseToUnderscores2.default)(fieldName);
            });

            return translation ? translation.value : '';
        }
    }, {
        key: 'renderFieldsToTranslate',
        value: function renderFieldsToTranslate() {
            var _this3 = this;

            return this.props.fieldsToTranslate.filter(function (fieldName) {
                return fieldName;
            }).map(function (fieldName) {
                var labelPlaceholder = _this3.getTranslation((0, _camelCaseToUnderscores2.default)(fieldName));
                var val = _this3.getTranslationValueFor(fieldName);

                return _react2.default.createElement(
                    'div',
                    { key: fieldName },
                    _react2.default.createElement(_TextField2.default, {
                        placeholder: labelPlaceholder,
                        label: labelPlaceholder,
                        value: val,
                        InputLabelProps: {
                            shrink: true
                        },
                        fullWidth: true,
                        onChange: _this3.setValue.bind(_this3, fieldName),
                        margin: 'normal'
                    }),
                    _react2.default.createElement(
                        'div',
                        { style: { color: 'rgba(0,0,0,0.6)' } },
                        _this3.props.objectToTranslate[fieldName]
                    )
                );
            });
        }
    }, {
        key: 'renderActionButtons',
        value: function renderActionButtons() {
            return _react2.default.createElement(
                _DialogActions2.default,
                null,
                _react2.default.createElement(
                    _Button2.default,
                    {
                        variant: 'contained',
                        onClick: this.props.onCancel
                    },
                    this.getTranslation('cancel')
                ),
                _react2.default.createElement(
                    _Button2.default,
                    {
                        variant: 'contained',
                        color: 'primary',
                        onClick: this.saveTranslations
                    },
                    this.getTranslation('save')
                )
            );
        }
    }, {
        key: 'renderHelpText',
        value: function renderHelpText() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'p',
                    null,
                    this.getTranslation('select_a_locale_to_enter_translations_for_that_language')
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.props.locales && !this.props.translations) {
                return _react2.default.createElement(LoadingDataElement, null);
            }

            return _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement(
                    _DialogContent2.default,
                    null,
                    _react2.default.createElement(
                        'div',
                        { style: { minHeight: 350 } },
                        _react2.default.createElement(_LocaleSelector2.default, {
                            classes: {},
                            currentLocale: this.state.currentSelectedLocale,
                            locales: this.props.locales,
                            onChange: this.setCurrentLocale
                        }),
                        this.state.currentSelectedLocale ? this.renderFieldsToTranslate() : this.renderHelpText()
                    )
                ),
                this.state.currentSelectedLocale && this.renderActionButtons()
            );
        }
    }]);
    return TranslationForm;
}(_react.Component);

TranslationForm.propTypes = {
    onTranslationSaved: _propTypes2.default.func.isRequired,
    onTranslationError: _propTypes2.default.func.isRequired,
    onCancel: _propTypes2.default.func,
    objectToTranslate: _propTypes2.default.shape({
        id: _propTypes2.default.string.isRequired
    }),
    locales: _propTypes2.default.array,
    translations: _propTypes2.default.array,
    setTranslations: _propTypes2.default.func,
    fieldsToTranslate: _propTypes2.default.arrayOf(_propTypes2.default.string)
};

TranslationForm.defaultProps = {
    fieldsToTranslate: ['name', 'shortName', 'description'],
    locales: []
};

TranslationForm.contextTypes = {
    d2: _propTypes2.default.object
};

var WithObservableState = function (_Component2) {
    (0, _inherits3.default)(WithObservableState, _Component2);

    function WithObservableState() {
        (0, _classCallCheck3.default)(this, WithObservableState);
        return (0, _possibleConstructorReturn3.default)(this, (WithObservableState.__proto__ || (0, _getPrototypeOf2.default)(WithObservableState)).apply(this, arguments));
    }

    (0, _createClass3.default)(WithObservableState, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this5 = this;

            this.disposable = this.props.stateSource$.subscribe(function (state) {
                return _this5.setState(state);
            }, function (error) {
                return log.error(error);
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.disposable && this.disposable.unsubscribe && this.disposable.unsubscribe();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.cloneElement(_react2.default.Children.only(this.props.children), (0, _extends3.default)({}, this.state));
        }
    }]);
    return WithObservableState;
}(_react.Component);

var TranslationFormWithData = function TranslationFormWithData(_ref) {
    var model = _ref.model,
        props = (0, _objectWithoutProperties3.default)(_ref, ['model']);
    return _react2.default.createElement(
        WithObservableState,
        { stateSource$: getTranslationFormData(model) },
        _react2.default.createElement(TranslationForm, props)
    );
};

exports.default = TranslationFormWithData;