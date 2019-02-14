
function displayWeek(day){

    let weekDays= document.getElementById("weekDays")
    let dayOfTheWeek = document.createElement("div");
    let dayName = document.createElement("p");
    dayName.classList.add("dayName");
    dayName.innerHTML=day;
    dayOfTheWeek.appendChild(dayName);
    weekDays.appendChild(dayOfTheWeek);
}

displayWeek("monday");