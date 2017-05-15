'use strict';

const Commander = require('./commander');
const ArmyUnit = require('./army-unit');
const Spell = require('./spell');
const Validator = require('./validator');

class Battlemanager {
    constructor() {
        this._ERROR_MESSAGES = {
            INVALID_SPELL_OBJECT: 'Passed objects must be Spell-like objects!',
            NOT_ENOUGH_MANA: 'Not enough mana!',
            TARGET_NOT_FOUND: 'Target not found!',
            INVALID_BATTLE_PARTICIPANT: 'Battle participants must be ArmyUnit-like!',
        };

        this.commandersList = [];
    }

    getCommander(name, alignment, mana) {
        return new Commander(name, alignment, mana);
    }
    getArmyUnit(options) {
        const { name, alignment, damage, health, count, speed } = options;
        return new ArmyUnit(name, alignment, damage, health, count, speed);
    }
    getSpell(name, manaCost, effect) {
        return new Spell(name, manaCost, effect);
    }
    addCommanders(...commanders) {
        if (Array.isArray(commanders[0])) {
            commanders = commanders[0];
        }

        commanders.forEach(c => this.commandersList.push(c));

        return this;
    }
    addArmyUnitTo(commanderName, armyUnit) {
        let commander = this.commandersList.find(c => c.name === commanderName);
        commander.army.push(armyUnit);

        return this;
    }
    addSpellsTo(commanderName, ...spells) {
        if (Array.isArray(spells[0])) {
            spells = spells[0];
        }

        if (!(spells.every(s => this._isSpellAlike(s)))) {
            throw new Error(this._ERROR_MESSAGES.INVALID_SPELL_OBJECT);
        }

        let commander = this.commandersList.find(c => c.name === commanderName);
        commander.spellbook.push(...spells);

        return this;
    }
    findCommanders(query) {
        return this.commandersList.filter(c => {
            // 'in' can distinguish between properties that do not exists and the existing properties that are set to undefined
            if (!(query.name)) {
                return c.alignment === query.alignment;
            }

            if (!query.alignment) {
                return c.name === query.name;
            }

            return c.alignment === query.alignment && c.name === query.name;
        }).sort(c => c.name);
    }
    findArmyUnitById(id) {
        let armyUnit;
        this.commandersList.forEach(c => {
            if (c.army.findIndex(unit => unit.id === id) !== -1) {
                armyUnit = c.army.find(unit => unit.id === id);
            }
        });

        return armyUnit;
    }
    findArmyUnits(query) {
        let allArmyUnits = [];

        this.commandersList.forEach(c => {
            let armyUnits = c.army.slice(0); // clone

            if (query.id) {
                if (armyUnits.findIndex(unit => unit.id === query.id) !== -1) {
                    allArmyUnits.push(armyUnits.find(unit => unit.id === query.id));
                    return;
                }
            }

            if (query.name) {
                armyUnits = armyUnits.filter(unit => unit.name === query.name);
            }

            if (query.alignment) {
                armyUnits = armyUnits.filter(unit => unit.alignment === query.alignment);
            }

            allArmyUnits.push(...armyUnits);
        });

        return allArmyUnits.sort((a, b) => {
            if (a.speed === b.speed) {
                return a.name > b.name;
            }

            return a.speed < b.speed;
        });
    }
    spellcast(casterName, spellName, targetUnitId) {
        let commander = this.commandersList.find(c => c.name === casterName);

        if (!commander) {
            throw new Error(`Can't cast with non-existant commander ${casterName}!`);
        }

        let spell = commander.spellbook.find(s => s.name === spellName);

        if (!spell) {
            throw new Error(`${casterName} doesn't know ${spellName}`);
        }

        let targetArmyUnit = this.findArmyUnitById(targetUnitId);

        if (!targetArmyUnit) {
            throw new Error(this._ERROR_MESSAGES.TARGET_NOT_FOUND);
        }

        if (commander.mana < spell.manaCost) {
            throw new Error(this._ERROR_MESSAGES.NOT_ENOUGH_MANA);
        }

        spell.effect(targetArmyUnit);

        commander.mana -= spell.manaCost;

        return this;
    }
    battle(attacker, defender) {
        if (!this._isArmyUnitLike(attacker) || !this._isArmyUnitLike(defender)) {
            throw new Error(this._ERROR_MESSAGES.INVALID_BATTLE_PARTICIPANT);
        }

        let attackerTotalDamage = attacker.damage * attacker.count;
        let defenderTotalHeath = defender.health * defender.count;
        defenderTotalHeath -= attackerTotalDamage;


        defender.count = defenderTotalHeath > 0 ? Math.ceil(defenderTotalHeath / defender.health) : 0;

        return this;
    }
    _isArmyUnitLike(unit) {
        if (!('health' in unit) && ('damage' in unit) && ('count' in unit)) {
            return false;
        }

        if (!Validator.isNumber(unit.damage) || !Validator.isPositiveOrZero(unit.damage) || !Validator.isValidValue(unit.damage, 100)) {
            return false;
        }

        if (!Validator.isNumber(unit.health) || !Validator.isPositiveOrZero(unit.health) || !Validator.isValidValue(unit.health, 200)) {
            return false;
        }

        if (!Validator.isNumber(unit.count) || !Validator.isPositiveOrZero(unit.count) || !Validator.isInteger(unit.count)) {
            return false;
        }

        return true;
    }
    _isSpellAlike(spell) {
        if (!('name' in spell) && ('manaCost' in spell) && ('effect' in spell)) {
            return false;
        }

        if (!Validator.isString(spell.name) || !Validator.isValidLength(spell.name, 2, 20) || !Validator.hasValidSymbols(spell.name)) {
            return false;
        }

        if (!Validator.isNumber(spell.manaCost) || !Validator.isPositive(spell.manaCost)) { // Check if integer as well!
            return false;
        }

        if (!Validator.isFunction(spell.effect) || !Validator.hasOneParameter(spell.effect)) {
            return false;
        }

        return true;
    }
}

module.exports = Battlemanager;