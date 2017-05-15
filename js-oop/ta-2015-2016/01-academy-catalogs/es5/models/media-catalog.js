'use strict';

var validator = new (require('./validator'));
var Catalog = require('./catalog');

function MediaCatalog(name) {
    Catalog.call(this, name);
}

MediaCatalog.prototype = Object.create(Catalog.prototype);
MediaCatalog.prototype.constructor = MediaCatalog;

MediaCatalog.prototype.add = function (medias) {
    var mediaToAdd = Array.isArray(medias) ? medias.slice(0) : [].slice.call(arguments, 0);

    mediaToAdd.forEach(function (media) {
        validator.validateMedia(media);
    });

    return Catalog.prototype.add.call(this, mediaToAdd);
};

MediaCatalog.prototype.getTop = function (count) {
    if (typeof count !== 'number') {
        throw new Error('Count is not a number');
    }

    if (count < 1) {
        throw new Error('Count is less than 1');
    }

    return this.items
        .slice(0)
        .sort(function (a, b) {
            return b.rating - a.rating;
        })
        .slice(0, count)
        .map(function (item) {
            return {
                id: item.id,
                name: item.name
            };
        });
};

MediaCatalog.prototype.getSortedByDuration = function () {
    return this.items
        .slice(0)
        .sort(function (a, b) {
            if (a.duration === b.duration) {
                return a.id - b.id;
            }

            return b.duration - a.duration;
        });
};

module.exports = MediaCatalog;