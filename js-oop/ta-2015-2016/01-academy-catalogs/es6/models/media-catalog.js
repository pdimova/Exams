'use strict';

const validator = require('./validator');

const Catalog = require('./catalog');
const Media = require('./media');

class MediaCatalog extends Catalog {
    constructor(name) {
        super(name);
    }

    add(...items) {
        if (Array.isArray(items[0])) {
            items = items[0];
        }

        items.forEach(item => validator.validateMedia(item, Media));

        return super.add(items);
    }

    getTop(count) {
        if (typeof count !== 'number') {
            throw new Error('Count is not a number');
        }

        if (count < 1) {
            throw new Error('Count is less than 1');
        }

        return this.items
            .slice(0)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, count)
            .map(item => ({ id: item.id, name: item.name }));
    }

    getSortedByDuration() {
        return this.items
            .slice(0)
            .sort((a, b) => (a.duration === b.duration) ? (a.id - b.id) : (b.duration - a.duration));
    }
}

module.exports = MediaCatalog;