const colors = ["green", "red", "rgba(133,122,200)", "#d39b22ff", "grey", "#4fa5d7ff"];

const clickMeButton = document.querySelector(".btn1");
const rgbButton = document.querySelector(".btn2");
const hexButton = document.querySelector(".btn3");

const colorPanel = document.getElementById("colorPanel");
const colorCode = document.getElementById("colorCode");

//console.log(Math.random());

function randomColor(){
    console.log("First button got clicked");
    let colorIndex = Math.floor(Math.random()*colors.length);
    console.log(colorIndex);
    colorPanel.style.backgroundColor = colors[colorIndex];
    colorCode.innerText = colors[colorIndex];
}

function randomColorRgb(){
    let colorIndex1 = Math.floor(Math.random()*255);
    let colorIndex2 = Math.floor(Math.random()*255);
    let colorIndex3 = Math.floor(Math.random()*255);
    //console.log(colorIndex1 + "  " + colorIndex2 + " " + colorIndex3);
    let newText = "rgba("+colorIndex1 +", "+colorIndex2 +", "+colorIndex3+", " + Math.random() +")";
    colorPanel.style.backgroundColor = newText;
    colorCode.innerText = newText;
}  

function randomColorHex(){
    let hex = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"];
    let hexColor = "#";
   for (let i=0; i<6;i++) {
    hexColor += hex[Math.floor(Math.random()*hex.length)];
   }
   console.log(hexColor);
    //console.log(colorIndex1 + "  " + colorIndex2 + " " + colorIndex3);
    //let newText = "rgba("+colorIndex1 +", "+colorIndex2 +", "+colorIndex3+", " + Math.random() +")";
    colorPanel.style.backgroundColor = hexColor;
    colorCode.innerText = hexColor;
}  

clickMeButton.addEventListener('click', randomColor);
rgbButton.addEventListener('click', randomColorRgb);
hexButton.addEventListener('click', randomColorHex);
//use this format to change the colors rgba(133,122,200)
//rgb(r,g,b) 0 <=r <= 255 0 <=g <= 255 0 <=b <= 255

//hex 0<h 0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f 6 times randomise