import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import camelCaseToUnderscores from 'd2-utilizr/lib/camelCaseToUnderscores';
import { Observable } from 'rxjs/Observable';
import Store from '@dhis2/d2-ui-core/build/es/store/Store';
import CircularProgress from '@material-ui/core/CircularProgress';
import LocaleSelector from './LocaleSelector.component';
import { getLocales, getTranslationsForModel, saveTranslations } from './translationForm.actions';

function getTranslationFormData(model) {
    var translationStore = Store.create();

    getTranslationsForModel(model).subscribe(function (translations) {
        translationStore.setState(translations);
    });

    return Observable.combineLatest(getLocales(), translationStore, function () {
        for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
            data[_key] = arguments[_key];
        }

        return _Object$assign.apply(Object, [{
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
    return React.createElement(
        'div',
        { style: { textAlign: 'center', minHeight: 350 } },
        React.createElement(CircularProgress, null)
    );
};

var TranslationForm = function (_Component) {
    _inherits(TranslationForm, _Component);

    function TranslationForm(props, context) {
        _classCallCheck(this, TranslationForm);

        var _this = _possibleConstructorReturn(this, (TranslationForm.__proto__ || _Object$getPrototypeOf(TranslationForm)).call(this, props, context));

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
                return t.locale === _this.state.currentSelectedLocale && t.property.toLowerCase() === camelCaseToUnderscores(property);
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
                    property: camelCaseToUnderscores(property).toUpperCase(),
                    locale: _this.state.currentSelectedLocale,
                    value: event.target.value
                };

                newTranslations.push(translation);
            }

            _this.props.setTranslations(newTranslations);
        };

        _this.saveTranslations = function () {
            saveTranslations(_this.props.objectToTranslate, _this.props.translations).subscribe(_this.props.onTranslationSaved, _this.props.onTranslationError);
        };

        var i18n = _this.context.d2.i18n;
        _this.getTranslation = i18n.getTranslation.bind(i18n);
        return _this;
    }

    _createClass(TranslationForm, [{
        key: 'getTranslationValueFor',
        value: function getTranslationValueFor(fieldName) {
            var _this2 = this;

            var translation = this.props.translations.find(function (t) {
                return t.locale === _this2.state.currentSelectedLocale && t.property.toLowerCase() === camelCaseToUnderscores(fieldName);
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
                var labelPlaceholder = _this3.getTranslation(camelCaseToUnderscores(fieldName));
                var val = _this3.getTranslationValueFor(fieldName);

                return React.createElement(
                    'div',
                    { key: fieldName },
                    React.createElement(TextField, {
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
                    React.createElement(
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
            return React.createElement(
                DialogActions,
                null,
                React.createElement(
                    Button,
                    {
                        variant: 'contained',
                        onClick: this.props.onCancel
                    },
                    this.getTranslation('cancel')
                ),
                React.createElement(
                    Button,
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
            return React.createElement(
                'div',
                null,
                React.createElement(
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
                return React.createElement(LoadingDataElement, null);
            }

            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    DialogContent,
                    null,
                    React.createElement(
                        'div',
                        { style: { minHeight: 350 } },
                        React.createElement(LocaleSelector, {
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
}(Component);

TranslationForm.propTypes = {
    onTranslationSaved: PropTypes.func.isRequired,
    onTranslationError: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    objectToTranslate: PropTypes.shape({
        id: PropTypes.string.isRequired
    }),
    locales: PropTypes.array,
    translations: PropTypes.array,
    setTranslations: PropTypes.func,
    fieldsToTranslate: PropTypes.arrayOf(PropTypes.string)
};

TranslationForm.defaultProps = {
    fieldsToTranslate: ['name', 'shortName', 'description'],
    locales: []
};

TranslationForm.contextTypes = {
    d2: PropTypes.object
};

var WithObservableState = function (_Component2) {
    _inherits(WithObservableState, _Component2);

    function WithObservableState() {
        _classCallCheck(this, WithObservableState);

        return _possibleConstructorReturn(this, (WithObservableState.__proto__ || _Object$getPrototypeOf(WithObservableState)).apply(this, arguments));
    }

    _createClass(WithObservableState, [{
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
            return React.cloneElement(React.Children.only(this.props.children), _extends({}, this.state));
        }
    }]);

    return WithObservableState;
}(Component);

var TranslationFormWithData = function TranslationFormWithData(_ref) {
    var model = _ref.model,
        props = _objectWithoutProperties(_ref, ['model']);

    return React.createElement(
        WithObservableState,
        { stateSource$: getTranslationFormData(model) },
        React.createElement(TranslationForm, props)
    );
};

export default TranslationFormWithData;