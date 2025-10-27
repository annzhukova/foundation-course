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

let contacts = [
  {
    firstName: "Akira",
    lastName: "Laine",
    number: "0543236543",
    likes: ["Pizza", "Coding", "Brownie Points"],
  },
  {
    firstName: "Harry",
    lastName: "Potter",
    number: "0994372684",
    likes: ["Hogwarts", "Magic", "Hagrid"],
  },
  {
    firstName: "Sherlock",
    lastName: "Holmes",
    number: "0487345643",
    likes: ["Intriguing Cases", "Violin"],
  },
  {
    firstName: "Kristian",
    lastName: "Vos",
    number: "unknown",
    likes: ["JavaScript", "Gaming", "Foxes"],
  },
];

function lookUpProfile(name, prop) {
  let flag = false;
  for (let i=0; i<contacts.length; i++) {
    console.log(contacts[i]['firstName']);
    if (contacts[i]['firstName'] === name) {
      flag = true;
      console.log(contacts[i][prop]);
      if (!contacts[i][prop]) {
        console.log("No such property");
      }
      return contacts[i][prop];
    }
    
  }
  if (!flag) {
    console.log("No such contact");
  }  
}
console.log(lookUpProfile("Bob", "potato"));
