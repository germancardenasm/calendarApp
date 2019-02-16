
let daysNames = ["S","M","T","W","T","F","S"];


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
    date.addEventListener("click",selectDate);
    date.classList.add("date");
    date.id=numOfDate; 
    date.innerHTML=numOfDate;
    datesContainer.appendChild(date);   
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

function selectDate(selectedDate){
  let highlightDate = document.getElementsByClassName("highLigth");
  highlightDate = document.getElementById(highlightDate[0].id);
  highlightDate.className="date";
  let day = selectedDate.target.id;
  highLigthDate(day);
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


