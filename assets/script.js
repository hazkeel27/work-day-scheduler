//variable for the current-day p tag & work-day-hours div which contains the time-blocks
var currentDayTag = $('#currentDay');
var workDayHoursDiv = $('#work-day-hours');

//render current day on the top of the webpage
function renderCurrentDay() {
  var today = dayjs();
  var todayDate = today.format('D');

  //if/else statment is used to add the suffixes st, nd, rd, and th after the days of the month
  //as well as assign text content to the current day p tag
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

  //variable's vallue is used to determine what colour to be assigned to a time-block
  var loopPassedPresent = false;

  //loop through the hourList array
  for (var i = 0; i < hoursList.length; i++)
  {
    //all time-blocks from 9-5 are created using jquery
    var hourDiv = $('<div></div>');
    var hourString = $('<div></div>');
    var textarea = $('<textarea></textarea>');
    var saveButton = $('<button></button>');
    var idiomaticSaveIcon = $('<i></i>');

    //removes the AM/PM from the array indexes
    var hourDivId = parseInt(hoursList[i].slice(0, -2));

    //for dayjs purposes
    var currentHour = dayjs();

    //gets current hour
    currentHour = parseInt(currentHour.format('h'));

    //gets the saved description of textarea from local storage
    var textareaDescription = localStorage.getItem('hour-' + hourDivId);

    //time-block creation
    idiomaticSaveIcon.addClass('fas fa-save');
    idiomaticSaveIcon.attr('aria-hidden', 'true');

    //time-block creation
    saveButton.addClass('btn saveBtn col-2 col-md-1');
    saveButton.attr('aria-label', 'save');

    //time-block creation
    textarea.addClass('col-8 col-md-10 description');
    textarea.attr('rows', '3');
    
    //assigns saved textarea description in local storage to textarea on page reload
    if (textareaDescription != null) {
      textarea.text(textareaDescription);
    }

    //time-block creation
    hourString.addClass('col-2 col-md-1 hour text-center py-3');
    hourString.text(`${hoursList[i]}`);

    //time-block creation
    hourDiv.attr('id', 'hour-' + hourDivId);

    //if the current index value is the same as current hour then present class is assigned to time-block
    if (hourDivId == currentHour) {
      hourDiv.addClass('row time-block present');
      //once loop passes the current hour, the variable loopPassedPresent is true
      loopPassedPresent = true;
    }
    else {
      // until the loop hasn't passed current hour, time-blocks are assigned the past class
      if (loopPassedPresent === false) {
        hourDiv.addClass('row time-block past');
      }
      //once loop passes the current hour and loopPassedPresent is true, all time-blocks after are assigned the future class
      else if (loopPassedPresent === true) {
        hourDiv.addClass('row time-block future');
      }
    }

    //time-block creation
    hourDiv.append(hourString);
    hourDiv.append(textarea);
    saveButton.append(idiomaticSaveIcon);
    hourDiv.append(saveButton);
    workDayHoursDiv.append(hourDiv);
  }
}

//function saves the textarea description to local storage
function saveToLocalStorage() {
  var saveBtn = $('.saveBtn');

  //when a save button is clicked
  saveBtn.on('click', function() {
    
    //id of the time-block whose save button is clicked is assigned to timeBlockId variable
    var timeBlockId = $(this).parent().attr('id');

    //textarea text content of the time-block is assigned to textarea variable
    var textarea = $(this).parent().find('.description').val();

    //key is the time-block's id and value is textarea description
    localStorage.setItem(timeBlockId, textarea);
  });
}

$(function () {
  //functions are created for clean code practices
  renderTimeBlocks();
  renderCurrentDay();
  saveToLocalStorage();
});
