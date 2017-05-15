'use strict';

const validator = require('./validator');
const utils = require('./utils');
const catalogIdGenerator = utils.getIdGenerator();

const Item = require('./item');

class Catalog {
    constructor(name) {
        this._id = catalogIdGenerator.next().value;
        this.name = name;
        this._items = [];
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }
    set name(value) {
        validator.validateName(value);

        this._name = value;
    }

    get items() {
        return this._items;
    }

    add(...items) {
        if (Array.isArray(items[0])) {
            items = items[0];
        }

        if (items.length === 0) {
            throw new Error('Empty array to be added into the catalog');
        }

  
        items.forEach(item => validator.validateItem(item, Item));

        this.items.push(...items);

        return this;
    }

    find(options) {
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

        result = this.items.filter(item => Object.keys(searchOptions).every(option => item[option] === searchOptions[option]));

        return (!isIdOnly) ? result : (result.length) ? result[0] : null;
    }

    search(pattern) {
        validator.validatePattern(pattern);

        pattern = pattern.toLowerCase();
        return this.items.filter(item => item.name.toLowerCase().includes(pattern) || item.description.toLowerCase().includes(pattern));
    }

}

module.exports = Catalog;