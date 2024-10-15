const sum = require("./sum");
const multiplication = require("./multiplication");
const substraction = require("./substraction");
const division = require("./division");

let sumA = 3;
let sumB = 5;
let sumResult = sum(sumA, sumB);
console.log(sumResult);

let mulA = 5;
let mulB = 4;
let mulResult = multiplication(mulA, mulB);
console.log(mulResult);

let subA = 20;
let subB = 10;
let subResult = substraction(subA, subB);
console.log(subResult);

let divA = 100;
let divB = 10;
let divResult = division(divA, divB);
console.log(divResult);
