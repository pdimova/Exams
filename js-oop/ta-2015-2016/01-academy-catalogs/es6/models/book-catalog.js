'use strict';

const validator = require('./validator');

const Catalog = require('./catalog');
const Book = require('./book');

class BookCatalog extends Catalog {
    constructor(name) {
        super(name);
    }

    add(...items) {

        if (Array.isArray(items[0])) {
            items = items[0];
        }

        items.forEach(item => validator.validateBook(item, Book));

        return super.add(items);
    }

    getGenres() {
        let distinct = {};

        this.items.forEach(item => distinct[item.genre.toLowerCase()] = 1);

        return Object.keys(distinct);
    }
}

module.exports = BookCatalog;