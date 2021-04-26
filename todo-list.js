if (document.readyState === "loading")
{
    document.addEventListener("DOMContentLoaded", ready)
}
else
{
    ready();
}

/*
    Function ready() simply adds an event listener to the to-do list's Add button to
    call renderListItemForm() when clicked.
    Precondition: todo-list.html is fully rendered.
    Postcondition: The Add button calls renderListItemForm() when clicked.
*/
function ready()
{
    let button = document.querySelector(".todo-list-add-btn");
    button.addEventListener("click", renderListItemForm);
}

/*
    Function renderListItemForm() renders a form which the user completes to add a task to the list.
    call renderListItemForm() when clicked.
    Precondition: The Add button was clicked.
    Postcondition: A form is rendered in the task's container.
*/
function renderListItemForm()
{
    // Create an "li" element and append the form to it.
    let itemForm = document.createElement("li");
    itemForm.innerHTML = `
    <div class="task-form-wrapper">
        <div class="form-wrapper">
            <label class="task-label">
                Task:
                <input type="text" class="task-input" placeholder="Title..." required>
            </label>

            <label class="task-label">
                Date:
                <input type="date" id="date" min="2021-01-01" max="2021-12-31" required>
            </label>

            <label class="task-label">
                Start Time:
                <input type="time" id="time" required>
            </label>
        </div>

        <button class="btn todo-list-submit-btn">Submit</button>
    </div>`

    // Append the "li" element to the list.
    document.querySelector(".my-list").appendChild(itemForm);

    // Add an event listener to the form's submit button that'll call appendListItem(event).
    itemForm.querySelector(".todo-list-submit-btn").addEventListener("click", appendListItem);
}

/*
    Function appendListItem(event) appends a task consisting of a form's info to the list.
    Precondition: A form's Submit button was clicked.
    Postcondition: A task is appended to the list.
*/
function appendListItem(event)
{
    // Get the form and its inputs.
    let newItem = event.target.closest("li"),
    taskName = newItem.querySelector(".task-input").value,
    taskDate = newItem.querySelector("#date").value,
    taskStartTime = newItem.querySelector("#time").value;

    // Get the date's month & day.
    let month = convertMonthNumberToMonthName(taskDate.substring(5,7));
    let day = convertDayNumberToDayAdjective(taskDate.substring(8));

    // Convert the time to 12-hour, AM/PM format.
    let modifiedTaskTime = modifyTaskTime(taskStartTime);
    
    // Remove the list item's form and render its info.
    newItem.innerHTML = `
    <div class="task-content-wrapper">
        <div class="task-details-wrapper">
            <span class="task-title">${taskName}</span>
            <span class="task-date">${month} ${day}</span>
            <span class="task-timeframe">${modifiedTaskTime}</span>
        </div>

        <button class="btn todo-list-edit-btn">Edit</button>
    </div>`

    // Append a delete button to the list item.
    appendDeleteButton(newItem);

    /* Add an event listener to the new item's Edit button that'll call editListItem(event),
       and add an event listener to the delete button that'll call deleteListItem(event).
    */
    newItem.querySelector(".todo-list-edit-btn").addEventListener("click", editListItem);
    newItem.querySelector(".delete-btn").addEventListener("click", deleteListItem);
}

/*
    Function editListItem(event) renders a form consisting of an existing task's info.
    Precondition: An existing task's Edit button was clicked.
    Postcondition: A form consisting of an existing task's info is rendered.
*/
function editListItem(event)
{
    // Get the Edit button's respective list item and its info.
    let listItem = event.target.closest("li"),
    taskTitle = listItem.querySelector(".task-title").innerText,
    taskDate = listItem.querySelector(".task-date").innerText,
    taskTimeframe = listItem.querySelector(".task-timeframe").innerText;

    // Render the list item as a form.
    listItem.innerHTML = `
    <div class="task-form-wrapper">
        <div class="form-wrapper">
            <label class="task-label">
                Task:
                <input type="text" class="task-input" placeholder="Title..." required>
            </label>

            <label class="task-label">
                Date:
                <input type="date" id="date" min="2021-01-01" max="2021-12-31" required>
            </label>

            <label class="task-label">
                Start Time:
                <input type="time" id="time" required>
            </label>
        </div>

        <button class="btn todo-list-submit-btn">Submit</button>
    </div>`

    // Initialize the text field w/the task's title.
    listItem.querySelector(".task-input").value = taskTitle;

    // Initialize the date field w/the task's date.
    let monthNumber = convertMonthNameToMonthNumber(taskDate.substring(0, taskDate.indexOf(" ")));
    let dayNum = convertDayAdjectiveToDayNumber(taskDate.substring(taskDate.indexOf(" ") + 1));
    listItem.querySelector("#date").value = "2021-" + monthNumber + "-" + dayNum;

    // Initialize the time field w/the task's time.
    let hour = taskTimeframe.substring(0, taskTimeframe.indexOf(":"));
    let meridian = taskTimeframe.substring(taskTimeframe.indexOf(" ") + 1);
    let convertedHour = convertHourTo24HourFormat(hour, meridian);
    let minutes = taskTimeframe.substring(taskTimeframe.indexOf(":") + 1, taskTimeframe.indexOf(" "));
    listItem.querySelector("#time").value = convertedHour + ":" + minutes;

    // Add an event listener to the form's submit button that'll call appendListItem(event).
    listItem.querySelector(".todo-list-submit-btn").addEventListener("click", appendListItem);
}

/*
    Function appendDeleteButton(listItem) appends a delete button to a task after its respective form's been
    completed.
    Precondition: A task's form's Submit button was clicked.
    Postcondition: A delete button is appended to a task.
*/
function appendDeleteButton(listItem)
{
    // Create a span element.
    let span = document.createElement("span");

    // Create a text node w/a 'x' symbol.
    let deleteSymbol = document.createTextNode("\u00D7"); // Multiplication/delete symbol

    // Append the delete symbol to the span element.
    span.classList.add("delete-btn");
    span.appendChild(deleteSymbol);

    // Append the span element to the list item.
    listItem.querySelector(".task-content-wrapper").appendChild(span);
}

/*
    Function deleteListItem(event) removes a task from the list after its respective delete button's clicked.
    Precondition: A task's delete button was clicked.
    Postcondition: The task is removed from the list.
*/
function deleteListItem(event)
{
    // Get the list and the delete button's grandparent (the "li" element it's nested in).
    let list = document.querySelector(".my-list");
    let listItem = event.target.closest("li");

    // Remove the item from the list.
    list.removeChild(listItem);
}

/*
    Function convertMonthNumberToMonthName(month_num) takes a month's number from a form's date input and returns
    its corresponding name.
    Precondition: A form's Submit button was clicked.
    Postcondition: A month's name is returned.
*/
function convertMonthNumberToMonthName(month_num)
{
    // Create a variable that'll store the month's name.
    let month_name = "";

    // Convert the month's number to its corresponding name.
    switch (month_num)
    {
        case "01":
            month_name = "January";
            break;
        case "02":
            month_name = "February";
            break;
        case "03":
            month_name = "March";
            break;
        case "04":
            month_name = "April";
            break;
        case "05":
            month_name = "May";
            break;
        case "06":
            month_name = "June";
            break;
        case "07":
            month_name = "July";
            break;
        case "08":
            month_name = "August";
            break;
        case "09":
            month_name = "September";
            break;
        case "10":
            month_name = "October";
            break;
        case "11":
            month_name = "November";
            break;
        case "12":
            month_name = "December";
            break;
    }

    // Return the month's name.
    return month_name;
}

/*
    Function convertDayNumberToDayAdjective(day_num) takes a day's number from a form's date input and returns
    its corresponding adjective.
    Precondition: A form's Submit button was clicked.
    Postcondition: A day's corresponding adjective is returned.
*/
function convertDayNumberToDayAdjective(day_num)
{
    // Create a variable that'll store the day's adjective.
    let day_adj = "";

    // Convert the day's number to its corresponding adjective.
    switch (day_num)
    {
        case "01":
            day_adj = "1st";
            break;
        case "02":
            day_adj = "2nd";
            break;
        case "03":
            day_adj = "3rd";
            break;
        case "04":
            day_adj = "4th";
            break;
        case "05":
            day_adj = "5th";
            break;
        case "06":
            day_adj = "6th";
            break;
        case "07":
            day_adj = "7th";
            break;
        case "08":
            day_adj = "8th";
            break;
        case "09":
            day_adj = "9th";
            break;
        case "10":
            day_adj = "10th";
            break;
        case "11":
            day_adj = "11th";
            break;
        case "12":
            day_adj = "12th";
            break;
        case "13":
            day_adj = "13th";
            break;
        case "14":
            day_adj = "14th";
            break;
        case "15":
            day_adj = "15th";
            break;
        case "16":
            day_adj = "16th";
            break;
        case "17":
            day_adj = "17th";
            break;
        case "18":
            day_adj = "18th";
            break;
        case "19":
            day_adj = "19th";
            break;
        case "20":
            day_adj = "20th";
            break;
        case "21":
            day_adj = "21st";
            break;
        case "22":
            day_adj = "22nd";
            break;
        case "23":
            day_adj = "23rd";
            break;
        case "24":
            day_adj = "24th";
            break;
        case "25":
            day_adj = "25th";
            break;
        case "26":
            day_adj = "26th";
            break;
        case "27":
            day_adj = "27th";
            break;
        case "28":
            day_adj = "28th";
            break;
        case "29":
            day_adj = "29th";
            break;
        case "30":
            day_adj = "30th";
            break;
        case "31":
            day_adj = "31st";
            break;
    }

    // Return the month's name.
    return day_adj;
}

/*
    Function modifyTaskTime(taskStartTime) takes a value from a form's time input and returns
    its corresponding 12-hour, AM/PM format value.
    Precondition: A form's Submit button was clicked.
    Postcondition: A time input's corresponding 12-hour, AM/PM format value is returned.
*/
function modifyTaskTime(taskStartTime)
{
    // Get the time's hours and minutes.
    let timeSplit = taskStartTime.split(":"),
    hours = timeSplit[0],
    minutes = timeSplit[1],
    meridian = ""; // Either AM or PM

    // Convert the time to AM/PM format.
    if (hours === "00")
    {
        hours = 12;
        meridian = "AM";
    }
    else if (hours > "00" && hours < "12")
    {
        hours = hours.charAt(1);
        meridian = "AM";
    }
    else if (Number.parseInt(hours) === 12)
    {
        meridian = "PM";
    }
    else if (Number.parseInt(hours) > 12)
    {
        hours = Number.parseInt(hours) - 12;
        meridian = "PM";
    }

    // Return the modified time.
    return hours + ":" + minutes + " " + meridian;
}

/*
    Function convertMonthNameToMonthNumber(month_name) takes an existing task's month name and returns
    its corresponding number for a form's date input.
    Precondition: An existing task's Edit button was clicked.
    Postcondition: A month's corresponding number is returned.
*/
function convertMonthNameToMonthNumber(month_name)
{
    // Create a variable that'll store the month's name.
    let month_number = "";

    // Convert the month's number to its corresponding name.
    switch (month_name)
    {
        case "January":
            month_number = "01";
            break;
        case "February":
            month_number = "02";
            break;
        case "March":
            month_number = "03";
            break;
        case "April":
            month_number = "04";
            break;
        case "May":
            month_number = "05";
            break;
        case "June":
            month_number = "06";
            break;
        case "July":
            month_number = "07";
            break;
        case "August":
            month_number = "08";
            break;
        case "September":
            month_number = "09";
            break;
        case "October":
            month_number = "10";
            break;
        case "November":
            month_number = "11";
            break;
        case "December":
            month_number = "12";
            break;
    }

    // Return the month's name.
    return month_number;
}

/*
    Function convertDayAdjectiveToDayNumber(day_adj) takes an existing task's month day's adjective and returns
    its corresponding number for a form's date input.
    Precondition: An existing task's Edit button was clicked.
    Postcondition: A month day's corresponding number is returned.
*/
function convertDayAdjectiveToDayNumber(day_adj)
{
    // Create a variable that'll store the day's adjective.
    let day_num = "";

    // Convert the day's number to its corresponding adjective.
    switch (day_adj)
    {
        case "1st":
            day_num = "01";
            break;
        case "2nd":
            day_num = "02";
            break;
        case "3rd":
            day_num = "03";
            break;
        case "4th":
            day_num = "04";
            break;
        case "5th":
            day_num = "05";
            break;
        case "6th":
            day_num = "06";
            break;
        case "7th":
            day_num = "07";
            break;
        case "8th":
            day_num = "08";
            break;
        case "9th":
            day_num = "09";
            break;
        case "10th":
            day_num = "10";
            break;
        case "11th":
            day_num = "11";
            break;
        case "12th":
            day_num = "12";
            break;
        case "13th":
            day_num = "13";
            break;
        case "14th":
            day_num = "14";
            break;
        case "15th":
            day_num = "15";
            break;
        case "16th":
            day_num = "16";
            break;
        case "17th":
            day_num = "17";
            break;
        case "18th":
            day_num = "18";
            break;
        case "19th":
            day_num = "19";
            break;
        case "20th":
            day_num = "20";
            break;
        case "21st":
            day_adj = "21";
            break;
        case "22nd":
            day_num = "22";
            break;
        case "23rd":
            day_num = "23";
            break;
        case "24th":
            day_num = "24";
            break;
        case "25th":
            day_num = "25";
            break;
        case "26th":
            day_num = "26";
            break;
        case "27th":
            day_num = "27";
            break;
        case "28th":
            day_num = "28";
            break;
        case "29th":
            day_num = "29";
            break;
        case "30th":
            day_num = "30";
            break;
        case "31st":
            day_num = "31";
            break;
    }

    // Return the month's name.
    return day_num;
}

/*
    Function convertHourTo24HourFormat(hour, meridian) takes an existing task's time's hour and meridian and returns
    its corresponding hour in 24-hour format for a form's time input.
    Precondition: An existing task's Edit button was clicked.
    Postcondition: An hour in 24-hour format is returned.
*/
function convertHourTo24HourFormat(hour, meridian)
{
    // Create a variable that'll store the converted hour.
    let modified_hour = "";

    // Convert the task's hour to 24-hour format, if necessary.
    if (Number.parseInt(hour) < 12 && meridian === "AM")
    {
        modified_hour = "0" + hour;
    }
    else if (Number.parseInt(hour) === 12 && meridian === "AM")
    {
        modified_hour = "00";
    }
    else if (Number.parseInt(hour) < 12 && meridian === "PM")
    {
        modified_hour = Number.parseInt(hour) + 12;
    }
    else if (Number.parseInt(hour) === 12 && meridian === "PM")
    {
        modified_hour = "12";
    }

    // Return the modified hour.
    return modified_hour;
}