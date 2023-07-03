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

    var hourDivId = parseInt(hoursList[i].slice(0, -2));

    var currentHour = dayjs();
    currentHour = parseInt(currentHour.add(7, 'hour').format('h'));

    var textareaDescription = localStorage.getItem('hour-' + hourDivId);

    idiomaticSaveIcon.addClass('fas fa-save');
    idiomaticSaveIcon.attr('aria-hidden', 'true');

    saveButton.addClass('btn saveBtn col-2 col-md-1');
    saveButton.attr('aria-label', 'save');

    textarea.addClass('col-8 col-md-10 description');
    textarea.attr('rows', '3');
    
    if (textareaDescription != null) {
      textarea.text(textareaDescription);
    }

    hourString.addClass('col-2 col-md-1 hour text-center py-3');
    hourString.text(`${hoursList[i]}`);

    hourDiv.attr('id', 'hour-' + hourDivId);

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

function saveToLocalStorage() {
  var saveBtn = $('.saveBtn');

  saveBtn.on('click', function() {
    var timeBlockId = $(this).parent().attr('id');

    var textarea = $(this).parent().find('.description').val();

    localStorage.setItem(timeBlockId, textarea);
  });
}

$(function () {
  renderTimeBlocks();
  renderCurrentDay();
  saveToLocalStorage();
});
