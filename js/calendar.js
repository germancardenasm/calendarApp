
let daysNames = ["S","M","T","W","T","F","S"];
let months = {
    "1": {
      "name": "January",
      "short": "Jan",
      "number": 1,
      "days": 31
    },
    "2": {
      "name": "February",
      "short": "Feb",
      "number": 2,
      "days": 28
    },
    "3": {
      "name": "March",
      "short": "Mar",
      "number": 3,
      "days": 31
    },
    "4": {
      "name": "April",
      "short": "Apr",
      "number": 4,
      "days": 30
    },
    "5": {
      "name": "May",
      "short": "May",
      "number": 5,
      "days": 31
    },
    "6": {
      "name": "June",
      "short": "Jun",
      "number": 6,
      "days": 30
    },
    "7": {
      "name": "July",
      "short": "Jul",
      "number": 7,
      "days": 31
    },
    "8": {
      "name": "August",
      "short": "Aug",
      "number": 8,
      "days": 31
    },
    "9": {
      "name": "September",
      "short": "Sep",
      "number": 9,
      "days": 30
    },
    "10": {
      "name": "October",
      "short": "Oct",
      "number": 10,
      "days": 31
    },
    "11": {
      "name": "November",
      "short": "Nov",
      "number": 11,
      "days": 30
    },
    "12": {
      "name": "December",
      "short": "Dec",
      "number": 12,
      "days": 31
    }
  }

let presentDate = { 
    day: 0,
    monthNumber: 0,
} 

function getPresentDate(){
    let date = new Date();
    presentDate.day=date.getDate();
    presentDate.monthNumber=date.getMonth()+1;
}

function writeSelectedMonth(monthName){
    let month = document.getElementById("monthName");
    month.innerHTML=months[presentDate.monthNumber].name;
}

function displayWeek(day){
    let week= document.getElementById("week")
    let dayOfTheWeek = document.createElement("div");
    dayOfTheWeek.classList.add("weekDayName");
    let dayName = document.createElement("h3");
    dayName.innerHTML=day;
    dayOfTheWeek.appendChild(dayName);
    week.appendChild(dayOfTheWeek);
}

function displayDates(numOfDate){
    let datesContainer= document.getElementById("datesContainer")
    let date = document.createElement("div");
    date.classList.add("date");
    date.id=numOfDate; 
    let dateNumber= document.createElement("div");
    dateNumber.innerHTML=numOfDate;
    date.appendChild(dateNumber);
    datesContainer.appendChild(date);
    dateNumber.classList.add("dateNumber");
}

function fullFillView(){
    let datesContainer= document.getElementById("datesContainer")
    let date = document.createElement("div");
    date.classList.add("fullFillSpace");
    datesContainer.appendChild(date);
}

function drawDates(){
    for(let i=1; i<=months[presentDate.monthNumber].days; i++)
      this.displayDates(i);
    
    if(thereIsBlankSpace())
      drawBlankSpace()       
}

function thereIsBlankSpace(){
    return months[presentDate.monthNumber].days%7>1
}

function drawBlankSpace(){
    let qtyOfSpacesToFullFill = 7-months[presentDate.monthNumber].days;
    for(let i=0; i<qtyOfSpacesToFullFill; i++)
    { 
      this.fullFillView();
    }
}

function highLigthDate(dayToHighLigth){
    let day = document.getElementById(dayToHighLigth);
    day.classList.add("highLigth");
}

getPresentDate();
writeSelectedMonth("January");
daysNames.forEach( (day) => displayWeek(day));
drawDates();
highLigthDate(presentDate.day);


