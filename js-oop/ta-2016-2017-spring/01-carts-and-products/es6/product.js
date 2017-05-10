'use strict';

class Product {
    constructor(productType, name, price) {
        this.productType = productType;
        this.name = name;
        this.price = price;
    }

    get productType() {
        return this._productType;
    }

    set productType(value) {
        if (typeof value !== 'string') {
            throw new Error('Not a string');
        }

        this._productType = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if (typeof value !== 'string') {
            throw new Error('Not a string');
        }

        this._name = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        if (typeof value !== 'number') {
            throw new Error('Not a number');
        }

        this._price = value;
    }
}

module.exports = Product;