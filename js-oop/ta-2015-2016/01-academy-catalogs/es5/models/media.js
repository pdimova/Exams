'use strict';

var Item = require('./item');
var validator = new (require('./validator'));

function Media(name, rating, duration, description) {
    var _duration, _rating;

    Item.call(this, description, name);

    Object.defineProperty(this, 'duration', {
        enumerable: true,
        configurable: false,
        get: function () {
            return _duration;
        },
        set: function (value) {
            validator.validateDuration(value);

            _duration = value;
        }
    });

    Object.defineProperty(this, 'rating', {
        enumerable: true,
        configurable: false,
        get: function () {
            return _rating;
        },
        set: function (value) {
            validator.validateRating(value);

            _rating = value;
        }
    });

    this.duration = duration;
    this.rating = rating;
}

Media.prototype = Object.create(Item.prototype);
Media.prototype.constructor = Media;

module.exports = Media;