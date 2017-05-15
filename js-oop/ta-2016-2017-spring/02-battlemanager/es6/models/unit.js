'use strict';

const Validator = require('./validator');

class Unit {
    constructor(name, alignment) {
        this._ERROR_MESSAGES = {
            INVALID_NAME_TYPE: 'Name must be string!',
            INVALID_NAME_LENGTH: 'Name must be between between 2 and 20 symbols long!',
            INVALID_NAME_SYMBOLS: 'Name can contain only latin symbols and whitespaces!',
            INVALID_ALIGNMENT: 'Alignment must be good, neutral or evil!'
        };

        this.name = name;
        this.alignment = alignment;
    }

    get name() {
        return this._name;
    }
    set name(value) {
        if (!Validator.isString(value)) {
            throw new Error(this._ERROR_MESSAGES.INVALID_NAME_TYPE);
        }

        if (!Validator.isValidLength(value, 2, 20)) {
            throw new Error(this._ERROR_MESSAGES.INVALID_NAME_LENGTH);
        }

        if (!Validator.hasValidSymbols(value)) {
            console.log(this.pesho);
            throw new Error(this._ERROR_MESSAGES.INVALID_NAME_SYMBOLS);
        }

        this._name = value;
    }
    get alignment() {
        return this._alignment;
    }
    set alignment(value) {
        if (!Validator.validateStringValue(value, ...['good', 'neutral', 'evil'])) {
            throw new Error(this._ERROR_MESSAGES.INVALID_ALIGNMENT);
        }

        this._alignment = value;
    }
}

module.exports = Unit;