'use strict';

module.exports = function () {
    var couter = 0;

    return {
        generate: function () {
            return ++couter;
        }
    };
};