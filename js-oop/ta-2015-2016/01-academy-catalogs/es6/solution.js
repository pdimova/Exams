'use strict';

const Book = require('./models/book');
const Media = require('./models/media');
const BookCatalog = require('./models/book-catalog');
const MediaCatalog = require('./models/media-catalog');

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