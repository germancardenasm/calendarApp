
let daysNames = ["S","M","T","W","T","F","S"];

let presentDate = new Date();

let selectedDay = { 
    date: 1,
    day: 1,
    month: 1,
    year: 2019
} 

function getPresentDate(){
    let date = new Date();
    selectedDay.date= date.getDate();
    selectedDay.month= date.getMonth()+1;
    selectedDay.year = date.getFullYear();
    selectedDay.day = date.getDay();
}

function writeSelectedMonth(){
    let month = document.getElementById("monthName");
    month.innerHTML=months[selectedDay.month].name;
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

function drawDates(){
  let firstDay = getFirstDay();
  if(firstDay>0) drawBlankSpace(firstDay);

  for(let i=1; i<=months[selectedDay.month].days; i++)
    displayDates(i);
  
  document.getElementById(presentDate.getDate()).classList.add("today");

  if(thereIsBlankSpace(firstDay)){
    let spacesToFullFill = 7-(months[selectedDay.month].days+firstDay)%7;
    drawBlankSpace(spacesToFullFill); 
  }      
}

function getFirstDay(){
  let date = new Date();
  date.setDate(1);
  date = date.getDay();
  return date;
}

function displayDates(numOfDate){
    let datesContainer= document.getElementById("datesContainer");
    let date = document.createElement("div");
    date.addEventListener("click",selectDate);
    date.addEventListener("dblclick", displayAppointmentMenu);
    date.classList.add("date");
    date.id=numOfDate; 
    date.innerHTML=numOfDate;
    datesContainer.appendChild(date);   
}

function thereIsBlankSpace(firstDay){
  let theriIs= months[selectedDay.month].days%7 + firstDay>1
    return theriIs
}

function drawBlankSpace(qtyOfSpacesToFullFill){
    for(let i=0; i<qtyOfSpacesToFullFill; i++)
    { 
      this.fullFillView();
    }
}

function fullFillView(){
  let datesContainer= document.getElementById("datesContainer")
  let date = document.createElement("div");
  date.classList.add("fullFillSpace");
  datesContainer.appendChild(date);
}

function selectDate(selectedDay){
  let highlightDate = document.getElementsByClassName("highLigth");
  highlightDate = document.getElementById(highlightDate[0].id);
  highlightDate.classList.remove("highLigth");
  let day = selectedDay.target.id;
  highLigthDate(day);
}

function highLigthDate(dayToHighLigth){
    let day = document.getElementById(dayToHighLigth);
    day.classList.add("highLigth");
    selectedDay.date=parseInt(day.id);
}

function displayAppointmentMenu(){
  if(selectedDay.date<presentDate.getDate()) {
    alert("You can not create an appointment in the past");
    return;
  }
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

function saveAppointment(event){
  event.preventDefault();
  let data = { 
              name: "",
              start: "",
              end: "",
              description: ""
  };
   
  data.name=document.getElementById("appointmentName").value;
  data.start=document.getElementById("start").value;
  data.end=document.getElementById("end").value;
  data.description=document.getElementById("description").value;
  appointments.push(data);
  console.log(data);
}

function generateStringDate(){
  let day = formatDate(selectedDay.date);
  let month = formatDate(selectedDay.month);
  let date = selectedDay.year+"-"+month+"-"+day;
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
highLigthDate(selectedDay.date);


