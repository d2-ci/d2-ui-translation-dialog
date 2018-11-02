'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.saveTranslations = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.getLocales = getLocales;
exports.getTranslationsForModel = getTranslationsForModel;

var _d = require('d2');

var _Observable = require('rxjs/Observable');

var _Action = require('@dhis2/d2-ui-core/build/es/action/Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLocales() {
    if (!getLocales.localePromise) {
        getLocales.localePromise = (0, _d.getInstance)().then(function (d2) {
            var api = d2.Api.getApi();

            return api.get('locales/db');
        }).then(function (locales) {
            return {
                locales: locales
            };
        });
    }

    return _Observable.Observable.fromPromise(getLocales.localePromise);
}

function getModelHref(model) {
    if (model.href) {
        return model.href;
    }

    return model.modelDefinition.apiEndpoint + '/' + model.id;
}

function getTranslationsForModel(model) {
    return _Observable.Observable.of(model).flatMap(function (m) {
        var modelDefinition = m.modelDefinition;

        if (!modelDefinition && !modelDefinition.name) {
            return _promise2.default.reject(new Error('Can not find modelDefinition for ' + m.id));
        }

        return (0, _d.getInstance)().then(function (d2) {
            var api = d2.Api.getApi();

            return api.get(getModelHref(m) + '/translations');
        });
    });
}

var saveTranslations = exports.saveTranslations = _Action2.default.create('saveTranslations');

saveTranslations.subscribe(function (_ref) {
    var _ref$data = (0, _slicedToArray3.default)(_ref.data, 2),
        model = _ref$data[0],
        translations = _ref$data[1],
        complete = _ref.complete,
        error = _ref.error;

    var translationHref = getModelHref(model) + '/translations';

    (0, _d.getInstance)().then(function (d2) {
        var api = d2.Api.getApi();

        api.update(translationHref, { translations: translations }, { dataType: 'text' }).then(function () {
            return complete(translations);
        }).catch(error);
    });
});