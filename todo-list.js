if (document.readyState === "loading")
{
    document.addEventListener("DOMContentLoaded", ready)
}
else
{
    ready();
}


function ready()
{
    let button = document.querySelector(".todo-list-add-btn");
    button.addEventListener("click", renderListItemForm);
}


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

    // Get the item-list and append the "li" element to it.
    let itemList = document.querySelector(".my-list");
    itemList.appendChild(itemForm);

    // Add an event listener to the form's submit button that'll call appendListItem(event).
    itemList.querySelector(".todo-list-submit-btn").addEventListener("click", appendListItem);
}


function appendListItem(event)
{
    // Get the form and its inputs.
    let itemForm = event.target.parentElement,
    taskName = itemForm.querySelector(".task-input").value,
    taskDate = itemForm.querySelector("#date").value,
    taskStartTime = itemForm.querySelector("#time").value;

    // Get the date's month & day.
    let month = convertMonthNumberToMonthName(taskDate.substring(5,7));
    let day = convertDayNumberToAdjective(taskDate.substring(8));

    // Convert the time to 12-hour, AM/PM format.
    
}


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


function convertDayNumberToAdjective(day_num)
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