'use strict';

var validator = new (require('./validator'));
var idGenerator = require('../id-generator')();

function Catalog(name) {
    var _id, _name, _items;

    Object.defineProperty(this, 'id', {
        enumerable: true,
        configurable: false,
        get: function () {
            return _id;
        }
    });

    Object.defineProperty(this, 'name', {
        enumerable: true,
        configurable: false,
        get: function () {
            return _name;
        },
        set: function (value) {
            validator.validateName(value);

            _name = value;
        }
    });

    Object.defineProperty(this, 'items', {
        enumerable: true,
        configurable: false,
        get: function () {
            return _items;
        }
    });

    _id = idGenerator.generate();
    _items = [];
    this.name = name;
}

Catalog.prototype.add = function (item) {
    if (typeof item === 'undefined') {
        throw new Error('No items to be added into the catalog');
    }

    if (item.length === 0) {
        throw new Error('Empty array to be added into the catalog');
    }

    var itemsArray = Array.isArray(item) ? item.slice(0) : [].slice.call(arguments, 0);

    // validate itemsArray
    [].forEach(function (it) {
        validator.validateItem(it);
    }, itemsArray);

    [].push.apply(this.items, itemsArray);

    return this;
};

Catalog.prototype.find = function (options) {
    if (!(typeof options === 'number' || typeof options === 'object')) {
        throw new Error('No options for searching');
    }

    var result, isIdOnly, searchOptions = {};

    if (typeof options === 'number') {
        searchOptions.id = options;
        isIdOnly = true;
    } else {
        searchOptions = options;
    }

    result = this.items
        .filter(function (item) {
            return Object.keys(searchOptions)
                .every(function (option) {
                    return item[option] === searchOptions[option];
                });
        });
    if (isIdOnly) {
        if (!result.length) {
            return null;
        }
        return result[0];
    }

    return result;
};

Catalog.prototype.search = function (pattern) {
    validator.validatePattern(pattern);

    pattern = pattern.toLowerCase();
    return this.items
        .filter(function (item) {
            return item.name.toLowerCase().indexOf(pattern) > -1 || item.description.toLowerCase().indexOf(pattern) > -1;
        });
};

module.exports = Catalog;