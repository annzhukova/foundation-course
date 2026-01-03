let gradies = [50, 89, 75, 84, 99];
let sum = 0;
//using a normal array indexing
for (let i = 0; i < gradies.length;i++) {
    sum += gradies[i];
}
console.log(sum);
let result = sum / 5;
console.log(result);

sum = 0;

//using for ... of loop
for (let item of gradies)
{
    sum += item;
}
console.log(sum);

const countries = ["Germany", "France", "Italy", "USA", "Canada"];
//every second element
//for (let i = 0; i < gradies.length;i+=2)
let country1 ='';
let country2 = [];
//for API
//[country1,  , ...country2] = countries;
/*countries.forEach(value, index) =>{
    console.log("This is", value);
}*/

const numbers = [1, 3, 21, 23, 12];
//const firstLargeNumber = numbers.find(num => num > 20);
const firstLargeNumber = numbers.find(num => num === 5);

//console.log(firstLargeNumber);

