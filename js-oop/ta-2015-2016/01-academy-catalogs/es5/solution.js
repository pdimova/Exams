'use strict';

var Book = require('./models/book');
var Media = require('./models/media');
var BookCatalog = require('./models/book-catalog');
var MediaCatalog = require('./models/media-catalog');

function solve() {
    return {
        getBook: function (name, isbn, genre, description) {
            return new Book(name, isbn, genre, description);
        },
        getMedia: function (name, rating, duration, description) {
            return new Media(name, rating, duration, description);
        },
        getBookCatalog: function (name) {
            return new BookCatalog(name);
        },
        getMediaCatalog: function (name) {
            return new MediaCatalog(name);
        }
    };
}

module.exports = solve;