const daysElement = document.getElementById("days");
const hoursElement = document.querySelector("#hours");
const minutesElement = document.querySelector("#minutes");
const secondsElement = document.querySelector("#seconds");

const endDate = new Date(2026,0,1);

function countDown(){
    const currentDate = new Date();

    const totalSeconds = (endDate - currentDate)/1000;

    const secPerDay = 3600*24;
    let totalDays = Math.floor(totalSeconds / secPerDay);


    let totalHours = Math.floor((totalSeconds % secPerDay) / 3600);
  

    let totalMin = Math.floor(((totalSeconds % secPerDay) % 3600 )/60);
  
    let totalSec = Math.floor(((totalSeconds % secPerDay) % 3600 )%60);
    

    daysElement.innerHTML = totalDays;
    hoursElement.innerHTML = totalHours;
    minutesElement.innerHTML = totalMin;
    secondsElement.innerHTML = totalSec;

} 

setInterval(countDown, 1000);

