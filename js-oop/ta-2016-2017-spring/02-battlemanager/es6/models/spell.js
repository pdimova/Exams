'use strict';

const Validator = require('./validator');

class Spell {
    constructor(name, manaCost, effect) {
        this._ERROR_MESSAGES = {
            INVALID_NAME_TYPE: 'Name must be string!',
            INVALID_NAME_LENGTH: 'Name must be between between 2 and 20 symbols long!',
            INVALID_NAME_SYMBOLS: 'Name can contain only latin symbols and whitespaces!',
            INVALID_MANA: 'Mana must be a positive integer number!',
            INVALID_COUNT: 'Count must be a positive integer number!',
            INVALID_EFFECT: 'Effect must be a function with 1 parameter!'
        };

        this.name = name;
        this.manaCost = manaCost;
        this.effect = effect;
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
            throw new Error(this._ERROR_MESSAGES.INVALID_NAME_SYMBOLS);
        }

        this._name = value;
    }
    get manaCost() {
        return this._manaCost;
    }
    set manaCost(value) {
        if (!Validator.isNumber(value) || !Validator.isPositive(value)) { // Check if integer as well!
            throw new Error(this._ERROR_MESSAGES.INVALID_MANA);
        }

        this._manaCost = value;
    }
    get effect() {
        return this._effect;
    }
    set effect(value) {
        if (!Validator.isFunction(value) || !Validator.hasOneParameter(value)) {
            throw new Error(this._ERROR_MESSAGES.INVALID_EFFECT);
        }

        this._effect = value;
    }
}

module.exports = Spell;