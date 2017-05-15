'use strict';

const Validator = require('./validator');
const Unit = require('./unit');

class Commander extends Unit {
    constructor(name, alignment, mana /*, spellbook, army*/) {
        super(name, alignment);
        this._ERROR_MESSAGES = {
            INVALID_MANA: 'Mana must be a positive integer number!',
        };

        this.mana = mana;
        this.spellbook = [];
        this.army = [];
    }

    get mana() {
        return this._mana;
    }
    set mana(value) {
        if (!Validator.isNumber(value) || !Validator.isPositive(value)) { // Check if integer as well!
            throw new Error(this._ERROR_MESSAGES.INVALID_MANA);
        }

        this._mana = value;
    }
    get spellbook() {
        return this._spellbook;
    }
    set spellbook(value) {
        this._spellbook = value;
    }
    get army() {
        return this._army;
    }
    set army(value) {
        this._army = value;
    }
}

module.exports = Commander;