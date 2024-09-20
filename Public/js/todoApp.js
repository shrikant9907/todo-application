// Get input box and list container elements
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a new task
function addTask() {
    if (inputBox.value === '') {
        alert('Please, first enter your task');
    } else {
        // Create a new list item and add it to the list container
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

// Add event listener to input box for Enter key press
inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});


listContainer.onclick = function(e) {
    if (e.target.tagName === "LI") {
        // Toggle checked class on list item click
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        // Remove list item on span click
        e.target.parentElement.remove();
        saveData();
    }
};

// Function to save task data to local storage
function saveData() {
    const taskList = [];
    const listItems = listContainer.children;
    for (let i = 0; i < listItems.length; i++) {
        let task = listItems[i].textContent;
        task = task.replace("\u00d7", "");
        taskList.push(task);
    }
    localStorage.setItem("data", JSON.stringify(taskList));
}

// Function to show tasks from local storage
function showTask() {
    const storedData = localStorage.getItem("data");
    if (storedData) {
        const taskList = JSON.parse(storedData);
        listContainer.innerHTML = "";
        taskList.forEach((task) => {
            const li = document.createElement("li");
            li.textContent = task;
            listContainer.appendChild(li);
            const span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
        });
    }
}

window.onload = showTask;