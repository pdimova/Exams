'use strict';

const validator = require('./validator');

const Item = require('./item');

class Book extends Item {
    constructor(name, isbn, genre, description) {
        super(name, description);
        this.isbn = isbn;
        this.genre = genre;
    }

    get isbn() {
        return this._isbn;
    }
    set isbn(value) {
        validator.validateISBN(value);

        this._isbn = value;
    }

    get genre() {
        return this._genre;
    }
    set genre(value) {
        validator.validateGenre(value);

        this._genre = value;
    }
}

module.exports = Book;