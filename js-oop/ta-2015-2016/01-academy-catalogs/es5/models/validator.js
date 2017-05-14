'use strict';

function Validator() {
    Object.defineProperty(this, '_ERORR_MESSAGES', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: {
            DESCRIPTION_INVALID_TYPE: 'Description should be string',
            DESCRIPTION_EMPTY_STRING: 'Description should not be empty string',
            NAME_INVALID_TYPE: 'Name should be string',
            NAME_INVALID_LENGTH: 'Name should be string with length between 2 and 40 characters, inclusive',
            ISBN_INVALID_TYPE: 'ISBN shoul be a string',
            ISBN_INVALID_LENGTH: 'ISBN shoul be a string with length exactly 10 or 13',
            ISBN_INVALID_SYMBOLS: 'ISBN can contain only digits',
            GENRE_IVALID_TYPE: 'Genre should be string',
            GENRE_INVALID_LENGTH: 'Genre should be string with length between 2 and 20 characters, inclusive',
            DURATION_INVALID_TYPE: 'Duration should be number',
            DURATION_IVALID_VALUE: 'Duration should be number greater than 0',
            RATING_IVALID_TYPE: 'Rating should be number',
            RATING_IVALID_VALIE: 'Rating should be number between 1 and 5, inclusive',
            PATTERN_IVALID_TYPE: 'Pattern should be string',
            PATTERN_INVALID_LENGTH: 'Pattern should be at least 1 character',
            ITEM_INVALID_TYPE: 'Item is not an Item instance or not an Item-like object',
            BOOK_INVALID_TYPE: 'Item is not a Book instance or not a Book-like object',
            MEDIA_INVALID_TYPE: 'Item is not a Media instance or not a Media-like object'
        }
    });

    Object.defineProperty(this, '_CONSTS', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: {
            STRING_TYPE: 'string',
            EMPTY_STRING: 0,
            NON_DIGIT_REGEX: /[^\d]/g,
            MIN_NAME_LENGTH: 2,
            MAX_NAME_LENGTH: 40,
            ISBN_10_LENGTH: 10,
            ISBN_13_LENGTH: 13,
            MIN_GENRE_LENGTH: 2,
            MAX_GENRE_LENGTH: 20,
            MIN_RATING_VALUE: 1,
            MAX_RATING_VALUE: 5,
            MIN_PATTERN_LENGTH: 1,
            MAX_PATTERN_LENGTH: Infinity
        }
    });
}

Validator.prototype = {
    constructor: Validator,
    _isString: function (value) {
        return typeof value === this._CONSTS.STRING_TYPE;
    },
    _isEmptyString: function (value) {
        return value.length === this._CONSTS.EMPTY_STRING;
    },
    _isValidLength: function (value, min, max) {
        return value.length >= min && value.length <= max;
    },
    _isExactLength: function (value, len) {
        return value.length === len;
    },
    _containsDigitsOnly: function (value) {
        return !(this._CONSTS.NON_DIGIT_REGEX.test(value));
    },
    _isNumber: function (value) {
        return parseFloat(value) === value;
    },
    _isNumberInRange: function (value, min, max) {
        return value >= min && value <= max;
    },
    validateDescription: function (value) {
        if (!this._isString(value)) {
            throw new Error(this._ERORR_MESSAGES.DESCRIPTION_INVALID_TYPE);
        }

        if (this._isEmptyString(value)) {
            throw new Error(this._ERORR_MESSAGES.DESCRIPTION_EMPTY_STRING);
        }
    },
    validateName: function (value) {
        if (!this._isString(value)) {
            throw new Error(this._ERORR_MESSAGES.NAME_INVALID_TYPE);
        }

        if (!this._isValidLength(value, this._CONSTS.MIN_NAME_LENGTH, this._CONSTS.MAX_NAME_LENGTH)) {
            throw new Error(this._ERORR_MESSAGES.NAME_INVALID_LENGTH);
        }
    },
    validateISBN: function (value) {
        if (!this._isString(value)) {
            throw new Error(this._ERORR_MESSAGES.ISBN_INVALID_TYPE);
        }

        if (!(this._isExactLength(value, this._CONSTS.ISBN_10_LENGTH) || this._isExactLength(value, this._CONSTS.ISBN_13_LENGTH))) {
            throw new Error(this._ERORR_MESSAGES.ISBN_INVALID_LENGTH);
        }

        if (!this._containsDigitsOnly(value)) {
            throw new Error(this._ERORR_MESSAGES.ISBN_INVALID_SYMBOLS);
        }
    },
    validateGenre: function (value) {
        if (!this._isString(value)) {
            throw new Error(this._ERORR_MESSAGES.GENRE_IVALID_TYPE);
        }

        if (!this._isValidLength(value, this._CONSTS.MIN_GENRE_LENGTH, this._CONSTS.MAX_GENRE_LENGTH)) {
            throw new Error(this._ERORR_MESSAGES.GENRE_INVALID_LENGTH);
        }
    },
    validateDuration: function (value) {
        if (!this._isNumber(value)) {
            throw new Error(this._ERORR_MESSAGES.DURATION_INVALID_TYPE);
        }

        if (value <= 0) {
            throw new Error(this._ERORR_MESSAGES.DURATION_IVALID_VALUE);
        }
    },
    validateRating: function (value) {
        if (!this._isNumber(value)) {
            throw new Error(this._ERORR_MESSAGES.RATING_IVALID_TYPE);
        }

        if (!this._isNumberInRange(value, this._CONSTS.MIN_RATING_VALUE, this._CONSTS.MAX_RATING_VALUE)) {
            throw new Error(this._ERORR_MESSAGES.RATING_IVALID_VALIE);
        }
    },
    validateItem: function (value) {
        if (!(value.constructor.name === 'Item') || !('id' in value && 'description' in value && 'name' in value)) {
            throw new Error(this._ERORR_MESSAGES.ITEM_INVALID_TYPE);
        }
    },
    validatePattern: function (value) {
        if (!this._isString(value)) {
            throw new Error(this._ERORR_MESSAGES.PATTERN_IVALID_TYPE);
        }

        if (!this._isValidLength(value, this._CONSTS.MIN_PATTERN_LENGTH, this._CONSTS.MAX_PATTERN_LENGTH)) {
            throw new Error(this._ERORR_MESSAGES.PATTERN_INVALID_LENGTH);
        }
    },
    validateBook: function (value) {
        if (!(value.constructor.name === 'Book') || !('isbn' in value && 'genre' in value)) {
            throw new Error(this._ERORR_MESSAGES.BOOK_INVALID_TYPE);
        }
    },
    validateMedia: function (value) {
        if (!(value.constructor.name === 'Media') || !('duration' in value && 'rating' in value)) {
            throw new Error(this._ERORR_MESSAGES.MEDIA_INVALID_TYPE);
        }
    }
};

module.exports = Validator;