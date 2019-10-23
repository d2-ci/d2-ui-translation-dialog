'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Translate = {
    contextTypes: {
        d2: _propTypes2.default.object.isRequired
    },

    getTranslation: function getTranslation(key) {
        return this.context.d2.i18n.getTranslation(key);
    }
};

exports.default = Translate;