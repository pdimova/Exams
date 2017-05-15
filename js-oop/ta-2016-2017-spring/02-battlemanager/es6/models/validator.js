'use strict';

class Validator {
    constructor() {
        this._ERROR_MESSAGES = {
            INVALID_NAME_TYPE: 'Name must be string!',
            INVALID_NAME_LENGTH: 'Name must be between between 2 and 20 symbols long!',
            INVALID_NAME_SYMBOLS: 'Name can contain only latin symbols and whitespaces!',
            INVALID_MANA: 'Mana must be a positive integer number!',
            INVALID_COUNT: 'Count must be a positive integer number!',
            INVALID_EFFECT: 'Effect must be a function with 1 parameter!',
            INVALID_DAMAGE: 'Damage must be a positive number that is at most 100!',
            INVALID_HEALTH: 'Health must be a positive number that is at most 200!',
            INVALID_SPEED: 'Speed must be a positive number that is at most 100!',
            INVALID_SPELL_OBJECT: 'Passed objects must be Spell-like objects!',
            NOT_ENOUGH_MANA: 'Not enough mana!',
            TARGET_NOT_FOUND: 'Target not found!',
            INVALID_BATTLE_PARTICIPANT: 'Battle participants must be ArmyUnit-like!',
            INVALID_ALIGNMENT: 'Alignment must be good, neutral or evil!'
        };
    }

    static isString(text) {
        return typeof text === 'string';
    }
    static isValidLength(text, min, max) {
        return text.length >= min && text.length <= max;
    }
    static hasValidSymbols(text) {
        return !(/[^A-Za-z\s]/g.test(text));
    }
    static isNumber(value) {
        return typeof value === 'number';
    }
    static isInteger(value) {
        return Number.isInteger(value);
    }
    static isPositive(value) {
        return value > 0;
    }
    static isPositiveOrZero(value) {
        return value >= 0;
    }
    static isFunction(func) {
        return typeof func === 'function';
    }
    static hasOneParameter(func) {
        return func.length === 1;
    }
    static validateStringValue(text, ...possibleValues) {
        return possibleValues.includes(text);
    }
    static isValidValue(value, max) {
        return value <= max;
    }
}

module.exports = Validator;