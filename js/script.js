
let taskForm = document.getElementById("taskForm");
let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

taskForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");

    li.className = "list-group-item d-flex justify-content-between align-items-center";

    let span = document.createElement("span");
    span.innerText = taskName;
    let completeButton = document.createElement("button");
    completeButton.innerText = "Complete";
    completeButton.className = "btn btn-success btn-sm me-2";

    completeButton.addEventListener("click", function () {
        span.classList.toggle("text-decoration-line-through");
    });

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "btn btn-danger btn-sm";

    deleteButton.addEventListener("click", function () {
        li.remove();
    });

    let buttonDiv = document.createElement("div");

    buttonDiv.appendChild(completeButton);
    buttonDiv.appendChild(deleteButton);

  
    li.appendChild(span);
    li.appendChild(buttonDiv);

    taskList.appendChild(li);


    taskInput.value = "";
});
