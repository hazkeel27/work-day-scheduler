// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var currentDayTag = $('#currentDay');
var workDayHoursDiv = $('#work-day-hours');

//render current day on the top of the webpage
function renderCurrentDay() {
  var today = dayjs();
  var todayDate = today.format('D');

  if (todayDate == '1' || todayDate == '21' || todayDate == '31') {
    currentDayTag.text(today.format('dddd, MMMM D') + 'st');
  }
  else if (todayDate == '2' || todayDate == '22') {
    currentDayTag.text(today.format('dddd, MMMM D') + 'nd');
  }
  else if (todayDate == '3' || todayDate == '23') {
    currentDayTag.text(today.format('dddd, MMMM D') + 'rd');
  }
  else {
    currentDayTag.text(today.format('dddd, MMMM D') + 'th');
  }
}

//render 9 to 5 time-blocks on webpage
function renderTimeBlocks() {
  var hoursList = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM']
  var loopPassedPresent = false;
  for (var i = 0; i < hoursList.length; i++)
  {
    var hourDiv = $('<div></div>');
    var hourString = $('<div></div>');
    var textarea = $('<textarea></textarea>');
    var saveButton = $('<button></button>');
    var idiomaticSaveIcon = $('<i></i>');

    idiomaticSaveIcon.addClass('fas fa-save');
    idiomaticSaveIcon.attr('aria-hidden', 'true');

    saveButton.addClass('btn saveBtn col-2 col-md-1');
    saveButton.attr('aria-label', 'save');

    textarea.addClass('col-8 col-md-10 description');
    textarea.attr('rows', '3');

    hourString.addClass('col-2 col-md-1 hour text-center py-3');
    hourString.text(`${hoursList[i]}`);

    var hourDivId = parseInt(hoursList[i].slice(0, -2));
    hourDiv.attr('id', 'hour-' + hourDivId);

    var currentHour = dayjs();
    currentHour = parseInt(currentHour.subtract(10, 'hour').format('h'));

    if (hourDivId == currentHour) {
      hourDiv.addClass('row time-block present');
      loopPassedPresent = true;
    }
    else {
      if (loopPassedPresent === false) {
        hourDiv.addClass('row time-block past');
      }
      else if (loopPassedPresent === true) {
        hourDiv.addClass('row time-block future');
      }
    }
    hourDiv.append(hourString);
    hourDiv.append(textarea);
    saveButton.append(idiomaticSaveIcon);
    hourDiv.append(saveButton);

    workDayHoursDiv.append(hourDiv);
  }
}

$(function () {




  renderTimeBlocks();
  renderCurrentDay();
  

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?




  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

});
