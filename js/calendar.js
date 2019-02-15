
let daysNames = ["Monday","Tuesday","Wensday","Thursday","Friday","Saturday","Sunday"];
let maxDatOfTheMonth = 28; 

function displayWeek(day){
    let week= document.getElementById("week")
    let dayOfTheWeek = document.createElement("div");
    dayOfTheWeek.classList.add("weekDayName");
    let dayName = document.createElement("p");
    dayName.innerHTML=day;
    dayOfTheWeek.appendChild(dayName);
    week.appendChild(dayOfTheWeek);
}

function displayDates(numOfDate){
    let datesContainer= document.getElementById("datesContainer")
    let date = document.createElement("div");
    date.classList.add("date");
    let dateNumber= document.createElement("div");
    dateNumber.innerHTML=numOfDate;
    date.appendChild(dateNumber);
    datesContainer.appendChild(date);
    dateNumber.classList.add("dateNumber");
}

function drawDates(){
    for(let i=1; i<=maxDatOfTheMonth; i++)
    { 
        this.displayDates(i);
    }
}



daysNames.forEach( (day) => displayWeek(day));
drawDates();


