
let daysNames = ["S","M","T","W","T","F","S"];

let presentDate = new Date();

let today = new Date();

let selectedDay = new Date();


function writeSelectedMonth(){
    let month = document.getElementById("monthName");
    month.innerHTML=months[today.getMonth()+1].name;
}

function displayWeek(day){
    let week= document.getElementById("week");
    let dayOfTheWeek = document.createElement("div");
    dayOfTheWeek.classList.add("weekDayName");
    let dayName = document.createElement("h3");
    dayName.innerHTML=day;
    dayOfTheWeek.appendChild(dayName);
    week.appendChild(dayOfTheWeek);
}

function drawDates(){
  let firstDayOfTheMonth = getFirstDayOfTheMonth(selectedDay.getMonth(), selectedDay.getFullYear());

  if(firstDayOfTheMonth>0) drawBlankSpace(firstDayOfTheMonth);

  for(let i=1; i<=months[selectedDay.getMonth()].days; i++)
    displayDates(i);
  
  document.getElementById(presentDate.getDate()).classList.add("today");
  document.getElementById(presentDate.getDate()).classList.add("highLigth");

  if(thereIsBlankSpace(firstDayOfTheMonth)){
    let spacesToFullFill = 7-(months[selectedDay.getMonth()].days+firstDayOfTheMonth)%7;
    drawBlankSpace(spacesToFullFill); 
  }      
}

function getFirstDayOfTheMonth(month, year){
  let date = new Date();
  date.setMonth(month)
  date.setFullYear(year)
  date.setDate(1);  
  date = date.getDay();
  return date;
}

function displayDates(dateNumber){
    let datesContainer= document.getElementById("datesContainer");
    let date = document.createElement("div");
    date.addEventListener("click",highLigthDate);
    date.addEventListener("dblclick", displayAppointmentMenu);
    date.classList.add("date");
    date.id=dateNumber; 
    date.innerHTML=dateNumber;
    datesContainer.appendChild(date);   
}

function thereIsBlankSpace(firstDay){
  let thereIs= months[selectedDay.getMonth()].days%7 + firstDay>1
    return thereIs
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

function highLigthDate(daySelected){
  let highlightDate = document.getElementsByClassName("highLigth");
  highlightDate = document.getElementById(highlightDate[0].id);
  highlightDate.classList.remove("highLigth");
  let day = daySelected.target.id;
  colorCellHighLigthDate(day);
}

function colorCellHighLigthDate(dayToHighLigth){
    let day = document.getElementById(dayToHighLigth);
    day.classList.add("highLigth");
    selectedDay.setDate(parseInt(day.id));
}

function displayAppointmentMenu(){
  if(selectedDay.getDate()<presentDate.getDate()) {
    alert("You can not create an appointment in the past");
    return;
  }
  hideCalendar();
  showAppointment();
  if(appointments[selectedDay.getDate()]){
    loadAppointment(selectedDay.getDate());
  } else {
    setDefaultAppointmentDate();
  }
}

function loadAppointment(day){
  let appointmentForm = document.getElementById("appointment-form");
  appointmentForm[0].value = appointments[day].name;
  appointmentForm[1].value = appointments[day].email;
  appointmentForm[2].value = generateStringDate(appointments[day].start) + generateStringHour(appointments[day].start);
  appointmentForm[3].value = generateStringDate(appointments[day].end) + generateStringHour(appointments[day].end);
  appointmentForm[4].value = appointments[day].description;
}

function setDefaultAppointmentDate(){
  document.getElementById("start").value=generateStringDate(selectedDay)+"T08:00";
  document.getElementById("end").value=generateStringDate(selectedDay)+"T09:00";
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
              email:"",
              start: "",
              end: "",
              description: ""
  };
   
  data.name=document.getElementById("appointmentName").value;
  data.email=document.getElementById("email").value;
  data.start= new Date(document.getElementById("start").value);
  data.end= new Date(document.getElementById("end").value);
  data.description=document.getElementById("description").value;
  appointments[data.start.getDate()]=data;
  showAppoinmentInCalendar(data);  
  clearForm();
  closeAppointment();
}

function showAppoinmentInCalendar(appointment){
  let calendarDay = document.getElementById(appointment.start.getDate());
  let calendarAppoinment = document.createElement('div');
  calendarAppoinment.classList.add('appoinmentVisual');
  calendarAppoinment.innerHTML=appointment.name;
  calendarDay.appendChild(calendarAppoinment);
}


function clearForm(){
  document.getElementById("appointment-form").reset();
}

function generateStringDate(dateToStringify){
  let day = formatDate(dateToStringify.getDate());
  let month = formatDate(dateToStringify.getMonth()+1);
  let date = dateToStringify.getFullYear()+"-"+month+"-"+day;
  return date;
}

function generateStringHour(time){
  let hour = "T";
  hour += formatDate(time.getHours());
  hour += ":";
  hour += formatDate(time.getMinutes());
  return hour;
}

function formatDate(date){
  if(date<10) return date = "0"+date;
  return date;
}

writeSelectedMonth();
daysNames.forEach( (day) => displayWeek(day));
drawDates();


