
let daysNames = ["Monday","Tuesday","Wensday","Thursday","Friday","Saturday","Sunday"];

function displayWeek(day){

    let weekDays= document.getElementById("weekDays")
    let dayOfTheWeek = document.createElement("div");
    let dayName = document.createElement("p");
    dayOfTheWeek.classList.add("dayName");
    dayName.innerHTML=day;
    dayOfTheWeek.appendChild(dayName);
    weekDays.appendChild(dayOfTheWeek);
}

daysNames.forEach( (day) => displayWeek(day) );