'use strict';

const validator = require('./validator');

const Item = require('./item');

class Media extends Item {
    constructor(name, rating, duration, description) {
        super(name, description);
        this.rating = rating;
        this.duration = duration;
    }

    get rating() {
        return this._rating;
    }
    set rating(value) {
        validator.validateRating(value);

        this._rating = value;
    }

    get duration() {
        return this._duration;
    }
    set duration(value) {
        validator.validateDuration(value);

        this._duration = value;
    }
}

module.exports = Media;