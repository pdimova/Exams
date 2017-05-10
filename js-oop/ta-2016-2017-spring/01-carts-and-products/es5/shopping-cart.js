'use strict';

function ShoppingCart() {
    // Private fields
    var _products = [];

    // Public properties
    Object.defineProperty(this, 'products', {
        get: function () {
            return _products;
        }
    });
}

// Public methods
ShoppingCart.prototype.add = function (product) {
    if (product.constructor.name !== 'Product' && !('productType' in product && 'name' in product && 'price' in product)) {
        throw new Error('Object should be of type Product');
    }

    this.products.push(product);

    return this;
};

ShoppingCart.prototype.remove = function (product) {
    if (product.constructor.name !== 'Product' && !('productType' in product && 'name' in product && 'price' in product)) {
        throw new Error('Object should be of type Product');
    }

    if (!this.products.length) {
        throw new Error('No items in the shopping cart');
    }

    //var productIndex = this.products.indexOf(product); //  indexOf compare only references
    var productIndex = this.products.findIndex(function (p) {
        return p.productType === product.productType &&
            p.name === product.name &&
            p.price === product.price;
    });

    if (productIndex < 0) {
        throw new Error('No such product in the shopping cart');
    }

    this.products.splice(productIndex, 1);
};

ShoppingCart.prototype.showCost = function () {
    if (!this.products.length) {
        return 0;
    }


    return this.products.reduce(function (accum, currP) {
        return accum + currP.price;
    }, 0);

};

ShoppingCart.prototype.showProductTypes = function () {
    var distinct = [];

    if (!this.products.length) {
        return [];
    }

    this.products.forEach(function (product) {
        if (distinct.indexOf(product.productType) === -1) {
            distinct.push(product.productType);
        }
    });

    return distinct.sort();
};

ShoppingCart.prototype.getInfo = function () {
    var info = {
        products: [],
        totalPrice: this.showCost()
    };

    if (this.products.length) {
        this.products.forEach(function (product) {
            var productGroup = info.products.find(function (pg) {
                return pg.name === product.name;
            });

            if (productGroup) {
                productGroup.quantity++;
                productGroup.totalPrice += product.price;
            } else {
                info.products.push({
                    name: product.name,
                    totalPrice: product.price,
                    quantity: 1
                });
            }
        });
    }

    return info;
};

module.exports = ShoppingCart;