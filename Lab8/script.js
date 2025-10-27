//Create calculator
/*const grate = prompt("Enter the grate:");

// Grate 100 - 90 A, 89 - 80 B
if (grate <= 100 && grate >=90) {
    console.log("A");
} else if (grate <= 89 && grate >=80){
    console.log("B");
} else if (grate <=79 && grate >=60){
    console.log("C");
} else if (grate<=59 && grate>=50) {
    console.log("D");
} else {
    console.log("E");
}*/

let gradies = [50, 89, 75, 84, 99];
let sum = 0;

for (let i = 0; i<5;i++) {
    sum += gradies[i];
}
console.log(sum);
let result = sum / 5;
console.log(result);

