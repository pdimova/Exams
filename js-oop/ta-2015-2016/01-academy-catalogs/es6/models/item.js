'use strict';

const validator = require('./validator');
const utils = require('./utils');
const itemIdGenerator = utils.getIdGenerator();

class Item {
    constructor(name, description) {
        this._id = itemIdGenerator.next().value;
        this.name = name;
        this.description = description;
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

    get description() {
        return this._description;
    }
    set description(value) {
        validator.validateDescription(value);

        this._description = value;
    }
}

module.exports = Item;