'use strict';

const idGenerator = require('../id-generator');
const Validator = require('./validator');
const Unit = require('./unit');

class ArmyUnit extends Unit {
    constructor(name, alignment, damage, health, count, speed) {
        super(name, alignment);
        this._ERROR_MESSAGES = {
            INVALID_COUNT: 'Count must be a positive integer number!',
            INVALID_DAMAGE: 'Damage must be a positive number that is at most 100!',
            INVALID_HEALTH: 'Health must be a positive number that is at most 200!',
            INVALID_SPEED: 'Speed must be a positive number that is at most 100!',
        };

        this._id = idGenerator.generate();
        this.damage = damage;
        this.health = health;
        this.count = count;
        this.speed = speed;
    }

    get id() {
        return this._id;
    }
    get damage() {
        return this._damage;
    }
    set damage(value) {
        if (!Validator.isNumber(value) || !Validator.isPositiveOrZero(value) || !Validator.isValidValue(value, 100)) {
            throw new Error(this._ERROR_MESSAGES.INVALID_DAMAGE);
        }

        this._damage = value;
    }
    get health() {
        return this._health;
    }
    set health(value) {
        if (!Validator.isNumber(value) || !Validator.isPositiveOrZero(value) || !Validator.isValidValue(value, 200)) {
            throw new Error(this._ERROR_MESSAGES.INVALID_HEALTH);
        }

        this._health = value;
    }
    get count() {
        return this._count;
    }
    set count(value) {
        if (!Validator.isNumber(value) || !Validator.isPositiveOrZero(value) || !Validator.isInteger(value)) {
            throw new Error(this._ERROR_MESSAGES.INVALID_COUNT);
        }

        this._count = value;
    }
    get speed() {
        return this._speed;
    }
    set speed(value) {
        if (!Validator.isNumber(value) || !Validator.isPositive(value) || !Validator.isValidValue(value, 100)) {
            throw new Error(this._ERROR_MESSAGES.INVALID_SPEED);
        }

        this._speed = value;
    }
}

module.exports = ArmyUnit;