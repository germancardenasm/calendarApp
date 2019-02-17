
let daysNames = ["S","M","T","W","T","F","S"];


let selectedDate = { 
    day: 1,
    month: 1,
    year: 2019
} 

function getPresentDate(){
    let date = new Date();
    selectedDate.day= date.getDate();
    selectedDate.month= date.getMonth()+1;
}

function writeSelectedMonth(){
    let month = document.getElementById("monthName");
    month.innerHTML=months[selectedDate.month].name;
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
    date.addEventListener("dblclick", displayAppointmentMenu)
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
    for(let i=1; i<=months[selectedDate.month].days; i++)
      this.displayDates(i);
    
    if(thereIsBlankSpace())
      drawBlankSpace()       
}

function thereIsBlankSpace(){
    return months[selectedDate.month].days%7>1
}

function drawBlankSpace(){
    let qtyOfSpacesToFullFill = 7-months[selectedDate.month].days;
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
    selectedDate.day=parseInt(day.id);
}

function displayAppointmentMenu(){
  setDefaultAppointmentDate();
  hideCalendar();
  showAppointment();
}

function setDefaultAppointmentDate(){
  document.getElementById("start").value=generateStringDate()+"T08:00";
  document.getElementById("end").value=generateStringDate()+"T10:00";
}

function showCalendar(){
  let calendar = document.getElementById("calendar");
  calendar.classList.remove("invisible");
}

function hideCalendar(){
  let calendar = document.getElementById("calendar");
  calendar.classList.add("invisible");
}

function showAppointment(){
  let appointmentMenu = document.getElementById("appointmentMenu");
  appointmentMenu.classList.remove("invisible"); 
}

function hideAppointment(){
  let appointmentMenu = document.getElementById("appointmentMenu");
  appointmentMenu.classList.add("invisible");
}

function closeAppointment(){
  hideAppointment();
  showCalendar();
}

function generateStringDate(){
  let day = formatDate(selectedDate.day);
  let month = formatDate(selectedDate.month);
  let date = selectedDate.year+"-"+month+"-"+day;
  return date;
}

function formatDate(date){
  if(date<10) return date = "0"+date;
  return date;
}

getPresentDate();
writeSelectedMonth();
daysNames.forEach( (day) => displayWeek(day));
drawDates();
highLigthDate(selectedDate.day);


