'use strict';

function* idGenerator() {
    const forever = true;
    let id = 0;

    while (forever) {
        yield ++id;
    }
}

let idIterator = idGenerator();

module.exports = {
    generate() {
        return idIterator.next().value;
    }
};