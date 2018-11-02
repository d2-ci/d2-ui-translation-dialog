import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _Promise from 'babel-runtime/core-js/promise';
import { getInstance } from 'd2';
import { Observable } from 'rxjs/Observable';
import Action from '@dhis2/d2-ui-core/build/action/Action';

export function getLocales() {
    if (!getLocales.localePromise) {
        getLocales.localePromise = getInstance().then(function (d2) {
            var api = d2.Api.getApi();

            return api.get('locales/db');
        }).then(function (locales) {
            return {
                locales: locales
            };
        });
    }

    return Observable.fromPromise(getLocales.localePromise);
}

function getModelHref(model) {
    if (model.href) {
        return model.href;
    }

    return model.modelDefinition.apiEndpoint + '/' + model.id;
}

export function getTranslationsForModel(model) {
    return Observable.of(model).flatMap(function (m) {
        var modelDefinition = m.modelDefinition;

        if (!modelDefinition && !modelDefinition.name) {
            return _Promise.reject(new Error('Can not find modelDefinition for ' + m.id));
        }

        return getInstance().then(function (d2) {
            var api = d2.Api.getApi();

            return api.get(getModelHref(m) + '/translations');
        });
    });
}

export var saveTranslations = Action.create('saveTranslations');

saveTranslations.subscribe(function (_ref) {
    var _ref$data = _slicedToArray(_ref.data, 2),
        model = _ref$data[0],
        translations = _ref$data[1],
        complete = _ref.complete,
        error = _ref.error;

    var translationHref = getModelHref(model) + '/translations';

    getInstance().then(function (d2) {
        var api = d2.Api.getApi();

        api.update(translationHref, { translations: translations }, { dataType: 'text' }).then(function () {
            return complete(translations);
        }).catch(error);
    });
});