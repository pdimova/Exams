'use strict';

const Product = require('./product');

class ShoppingCart {
    constructor() {
        this._products = [];
    }

    get products() {
        return this._products;
    }

    set products(value) {
        this._products = value;
    }

    add(product) {
        if (!(product instanceof Product) && !('productType' in product && 'name' in product && 'price' in product)) {
            throw new Error('Not a product or product-like');
        }

        this.products.push(product);

        return this;
    }

    remove(product) {
        if (!(product instanceof Product) && !('productType' in product && 'name' in product && 'price' in product)) {
            throw new Error('Not a product or product-like');
        }

        if (this.products.length === 0) {
            throw new Error('No products in the ShoppingCart');
        }

        //let productIndex = this.products.indexOf(product);
        let productIndex = this.products.findIndex(p => p.productType === product.productType && p.name === product.name && p.price === product.price);

        if (productIndex < 0) {
            throw new Error('Product not found');
        }

        this.products.splice(productIndex, 1);
    }

    showCost() {
        if (this.products.length === 0) {
            return 0;
        }

        let sum = 0;
        for (let product of this.products) {
            sum += product.price;
        }

        return sum;
    }

    showProductTypes() {
        if (this.products.length === 0) {
            return [];
        }

        let unique = {};
        for (let product of this.products) {
            if (!unique[product.productType]) {
                unique[product.productType] = true;
            }
        }

        return Object.keys(unique).sort();
    }

    getInfo() {
        if (this.products.length === 0) {
            return {
                'totalPrice': 0,
                'products': []
            };
        }

        let productsGroups = [];
        this.products.forEach(product => {
            let item = productsGroups.find(item => item.name === product.name);

            if (item === undefined) {
                productsGroups.push({
                    'name': product.name,
                    'totalPrice': product.price,
                    'quantity': 1
                });
            }
            else {
                item.totalPrice += product.price;
                item.quantity += 1;
            }

        });

        return {
            'totalPrice': this.showCost(),
            'products': productsGroups
        };
    }
}

module.exports = ShoppingCart;