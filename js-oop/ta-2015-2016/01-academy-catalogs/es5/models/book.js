'use strict';

var validator = new (require('./validator'));
var Item = require('./item');

function Book(name, isbn, genre, description) {
    var _isbn, _genre;

    Item.call(this, description, name);

    Object.defineProperty(this, 'isbn', {
        enumerable: true,
        configurable: false,
        get: function () {
            return _isbn;
        },
        set: function (value) {
            validator.validateISBN(value);

            _isbn = value;
        }
    });

    Object.defineProperty(this, 'genre', {
        enumerable: true,
        configurable: false,
        get: function () {
            return _genre;
        },
        set: function (value) {
            validator.validateGenre(value);

            _genre = value;
        }
    });

    this.isbn = isbn;
    this.genre = genre;
}

Book.prototype = Object.create(Item.prototype);
Book.prototype.constructor = Book;

module.exports = Book;