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
                Start Time:
                <input type="time" id="start-time" required>
            </label>

            <label class="task-label">
                End Time:
                <input type="time" id="end-time" required>
            </label>
        </div>

        <button class="btn todo-list-submit-btn">Submit</button>
    </div>`

    // Get the item-list and append the "li" element to it.
    let itemList = document.querySelector(".my-list");
    itemList.appendChild(itemForm);

    // 
}


function appendListItem()
{
    //
}