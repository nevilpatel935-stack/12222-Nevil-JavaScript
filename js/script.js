
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let taskForm = document.querySelector("#taskForm");
let title = document.querySelector("#title");
let description = document.querySelector("#description");
let dueDate = document.querySelector("#dueDate");
let priority = document.querySelector("#priority");
let taskList = document.querySelector("#taskList");
let searchInput = document.querySelector("#searchInput");
let priorityFilter = document.querySelector("#priorityFilter");

// Display Tasks
function displayTasks() {
    taskList.innerHTML = "";

    let search = searchInput.value.toLowerCase();
    let filter = priorityFilter.value;

    let filteredTasks = tasks.filter(function (task) {
        return (
            (task.title.toLowerCase().includes(search) ||
                task.description.toLowerCase().includes(search)) &&
            (filter === "all" || task.priority === filter)
        );
    });

    filteredTasks.sort(function (a, b) {
        return a.dueDate.localeCompare(b.dueDate);
    });

    filteredTasks.forEach(function (task) {
        let row = document.createElement("tr");

        row.innerHTML = `
    <td>${task.title}</td>
    <td>${task.description}</td>
    <td>${task.dueDate}</td>
    <td class="priority-${task.priority}">
        ${task.priority}
    </td>
    <td>
        <div class="action-buttons">
            <button class="btn btn-warning btn-sm"
                    onclick="editTask(${task.id})">
                Edit
            </button>

            <button class="btn btn-danger btn-sm"
                    onclick="deleteTask(${task.id})">
                Delete
            </button>
        </div>
    </td>
`;

        taskList.appendChild(row);
    });

    console.log("Tasks Displayed:", filteredTasks);
}

// Add Task
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let task = {
        id: Date.now(),
        title: title.value,
        description: description.value,
        dueDate: dueDate.value,
        priority: priority.value
    };

    if (!task.title || !task.description || !task.dueDate) {
        alert("Please fill all fields");
        return;
    }

    tasks.push(task);

    saveTasks();
    displayTasks();
    taskForm.reset();

    console.log("Task Added:", task);
});

// Save Tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Tasks Saved");
}

// Delete Task
function deleteTask(id) {
    if (confirm("Delete this task?")) {
        tasks = tasks.filter(function (task) {
            return task.id !== id;
        });

        saveTasks();
        displayTasks();

        console.log("Task Deleted:", id);
    }
}

// Edit Task
function editTask(id) {
    let task = tasks.find(function (task) {
        return task.id === id;
    });

    title.value = task.title;
    description.value = task.description;
    dueDate.value = task.dueDate;
    priority.value = task.priority;

    deleteTask(id);

    console.log("Task Selected for Editing:", task);
}

// Search Tasks
searchInput.addEventListener("input", displayTasks);

// Filter by Priority
priorityFilter.addEventListener("change", displayTasks);

// Load Tasks
displayTasks();

console.log("Task Management System Started");
