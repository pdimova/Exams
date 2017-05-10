'use strict';

function Product(productType, name, price) {
    // Private fields
    var _productType, _name, _price;

    // Public properties
    Object.defineProperty(this, 'productType', {
        get: function () {
            return _productType;
        },
        set: function (value) {
            if (typeof value !== 'string') {
                throw new Error('Should be string');
            }
            _productType = value;
        }
    });

    Object.defineProperty(this, 'name', {
        get: function () {
            return _name;
        },
        set: function (value) {
            if (typeof value !== 'string') {
                throw new Error('Should be string');
            }
            _name = value;
        }
    });

    Object.defineProperty(this, 'price', {
        get: function () {
            return _price;
        },
        set: function (value) {
            if (typeof value !== 'number') {
                throw new Error('Should be string');
            }
            _price = value;
        }
    });

    this.productType = productType;
    this.name = name;
    this.price = price;
}

module.exports = Product;