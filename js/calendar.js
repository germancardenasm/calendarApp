let daysNames = ["S","M","T","W","T","F","S"];
let presentDate = new Date();
let selectedDay = new Date();


function showSelectedMonthName(){
    let month = document.getElementById("monthName");
    month.innerHTML=months[presentDate.getMonth()].name;
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

  if(firstDayOfTheMonth>0) 
    drawBlankSpace(firstDayOfTheMonth);

  for(let i=1; i<=months[selectedDay.getMonth()].days; i++)
    createDateDiv(i);
  
  document.getElementById(presentDate.getDate()).classList.add("today", "highLigth");

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

function createDateDiv(dateNumber){
    let datesContainer= document.getElementById("datesContainer");
    let date = document.createElement("div");
    date.addEventListener("click",highLigthDate);
    date.addEventListener("dblclick", displayAppointmentMenu);
    date.classList.add("date");
    date.id=dateNumber; 
    date.innerHTML=" "+dateNumber;
    datesContainer.appendChild(date);   
}

function thereIsBlankSpace(firstDay){
  let thereIs= months[selectedDay.getMonth()].days%7 + firstDay>1
    return thereIs
}

function drawBlankSpace(qtyOfSpacesToFullFill){
    for(let i=0; i<qtyOfSpacesToFullFill; i++)
    { 
      this.createBlankSpaceDiv();
    }
}

function createBlankSpaceDiv(){
  let datesContainer= document.getElementById("datesContainer")
  let date = document.createElement("div");
  date.classList.add("fullFillSpace");
  datesContainer.appendChild(date);
}

function highLigthDate(daySelected){
  let day = daySelected.target.id;;
  //if click is done over an appointment div, highligth date div and no the appointment div
  if(daySelected.target.id.length>2)
     day = daySelected.target.id.slice(11,daySelected.target.id.length )

  let highlightDate = document.getElementsByClassName("highLigth");
  highlightDate = document.getElementById(highlightDate[0].id);
  highlightDate.classList.remove("highLigth");
  colorBackgroundOfCell(day);
}

function colorBackgroundOfCell(divToHighLigth){
    let day = document.getElementById(divToHighLigth);
    day.classList.add("highLigth");
    selectedDay.setDate(parseInt(day.id));
}

function displayAppointmentMenu(){
  if(selectedDay.getDate()<presentDate.getDate()) {
    alert("You can not create an appointment in the past");
    return;
  }
  hideElement("calendar");
  showElement("appointmentMenu");
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
  appointmentForm[2].value = stringifyDate(appointments[day].start);
  appointmentForm[3].value = stringifyDate(appointments[day].end);
  appointmentForm[4].value = appointments[day].description;
  hideElement("submit");
  disableForm(true);
}

function stringifyDate(day){
  return generateStringDate(day) + generateStringHour(day);
}

function disableForm(order){
  let form = document.getElementById("appointment-form");
  let elements = form.elements;
  for (var i = 0, len = elements.length; i < len; ++i) {
      elements[i].readOnly = order;
      if(order == true)
       elements[i].classList.add("disableField");
      else
       elements[i].classList.remove("disableField");
  }
}

function setDefaultAppointmentDate(){
  document.getElementById("start").value=generateStringDate(selectedDay)+"T08:00";
  document.getElementById("end").value=generateStringDate(selectedDay)+"T09:00";
}

function showElement(element){
  let calendar = document.getElementById(element);
  calendar.classList.remove("invisible");
}

function hideElement(element){
  let calendar = document.getElementById(element);
  calendar.classList.add("invisible");
}

function closeAppointment(){
  let submitButton = document.getElementById("submit");
  hideElement("appointmentMenu");
  clearForm();
  disableForm(false);
  showElement("submit");
  showElement("calendar");
}

function editAppointment(){
  disableForm(false);
  showElement("submit");
}

function eraseAppointment(){
  let   date = document.getElementById("start").value.slice(8,10);
  delete appointments[Number(date)];
  let appointmentToErase = document.getElementById("appointment"+Number(date));
  appointmentToErase.remove();
  clearForm();
  closeAppointment();
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
  if(calendarDay.children.length)
  {
    document.getElementById("appointment"+appointment.start.getDate()).innerHTML=appointment.name;
  }else{
    let calendarAppoinment = document.createElement('div');
    calendarAppoinment.classList.add('appoinmentVisual');
    calendarAppoinment.id= "appointment"+appointment.start.getDate();
    calendarAppoinment.innerHTML=appointment.name;
    calendarDay.appendChild(calendarAppoinment);
  }
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

showSelectedMonthName();
daysNames.forEach( (day) => displayWeek(day));
drawDates();


