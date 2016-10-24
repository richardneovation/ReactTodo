// function add(a, b) {
//   return a + b;
// }
//
// console.log(add(3,1));
//
// var toAdd = [9, 5, 9];
//
// console.log(add(...toAdd));

// var groupA = ['Jen', 'Cory'];
// var groupB = ['Vikram'];
// var final = [3, ...groupA];
//
// console.log(final);


function greet(name, age) {
  console.log(`Hi ${name}, you are ${age}`);
}

var person = ['Andrew', 25];
var personTwo = ['Jen', 29];

greet(...person);
greet(...personTwo);

var names = ['Mike', 'Ben'];
var final = ['Andrew'];

[...final, ...names].forEach((name) => {
  console.log(`Hi ${name}`);
});
