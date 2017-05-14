'use strict';

var idGenerator = require('../id-generator')();
var validator = new (require('./validator'));

function Item(description, name) {
    var _id, _description, _name;

    Object.defineProperty(this, 'id', {
        enumerable: true,
        configurable: false,
        get: function () {
            return _id;
        }
    });

    Object.defineProperty(this, 'description', {
        enumerable: true,
        configurable: false,
        get: function () {
            return _description;
        },
        set: function (value) {
            validator.validateDescription(value);

            _description = value;
        }
    });

    Object.defineProperty(this, 'name', {
        get: function () {
            return _name;
        },
        set: function (value) {
            validator.validateName(value);

            _name = value;
        }
    });

    _id = idGenerator.generate();
    this.description = description;
    this.name = name;
}

module.exports = Item;