const utils = require('./models/utils');


let iterator = utils.getIdGenerator();
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);



let iterator2 = utils.getIdGenerator();
console.log(iterator2.next().value);
console.log(iterator2.next().value);
console.log(iterator2.next().value);
console.log(iterator2.next().value);



function name(...params) {

    console.log(params);
}
name(undefined)



// function* idGenerator() {
//     let id = 0;

//     while (true) {
//         yield ++id;
//     }
// }

// let iterator = idGenerator();

// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
