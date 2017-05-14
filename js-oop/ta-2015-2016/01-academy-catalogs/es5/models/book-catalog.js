'use strict';

var validator = new (require('./validator'));
var Catalog = require('./catalog');

function BookCatalog(name) {
    Catalog.call(this, name);
}

BookCatalog.prototype = Object.create(Catalog.prototype);
BookCatalog.prototype.constructor = BookCatalog;

BookCatalog.prototype.add = function (books) {
    var booksToAdd = Array.isArray(books) ? books.slice(0) : [].slice.call(arguments, 0);

    booksToAdd.forEach(function (book) {
        validator.validateBook(book);
    });

    return Catalog.prototype.add.apply(this, booksToAdd);
};

BookCatalog.prototype.getGenres = function () {
    var distinct = {};

    this.items
        .forEach(function (item) {
            distinct[item.genre.toLowerCase()] = 1;
        });

    return Object.keys(distinct);
};

BookCatalog.prototype.find = function (options) {
    return Catalog.prototype.find.call(this, options);
};

module.exports = BookCatalog;