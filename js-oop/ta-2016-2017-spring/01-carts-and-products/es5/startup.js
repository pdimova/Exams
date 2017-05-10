/* eslint-disable no-console */

'use strict';

var Product = require('./product');
var ShoppingCart = require('./shopping-cart');

var cart = new ShoppingCart();

var product1 = new Product('Sweets', 'Shokolad Milka', 2);

cart.add(product1);
console.log(cart.showCost());

var product2 = new Product('Groceries', 'Salad', 0.5);
cart.add(product2);
cart.add(product2);
console.log(cart.showCost());

console.log(cart.showProductTypes());

console.log(cart.getInfo());
console.log(cart.products);

//cart.remove({ name: 'salad', productType: 'Groceries', price: 0.5 });

cart.remove({ name: 'Salad', productType: 'Groceries', price: 0.5 });

console.log(cart.getInfo());
console.log(cart.products);
