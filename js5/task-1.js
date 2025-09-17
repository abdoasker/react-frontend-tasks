// Task Class
class Task {
  constructor(description, dueDate) {
    this.description = description;
    this.dueDate = dueDate;
    this.isCompleted = false;
  }
}

let tasks = [];

// Load tasks from localStorage
function loadTasks() {
  let stored = localStorage.getItem("myTasks");
  if (stored) {
    let parsed = JSON.parse(stored);
    tasks = parsed.map(t => Object.assign(new Task(), t));
    renderTasks();
  }
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.textContent = `${task.description} (Due: ${task.dueDate})`;
    if (task.isCompleted) li.classList.add("completed");

    li.addEventListener("click", () => {
      tasks[index].isCompleted = !tasks[index].isCompleted;
      saveTasks();
      renderTasks();
    });

    list.appendChild(li);
  });
}

// Add new task
document.getElementById("add-task-btn").addEventListener("click", () => {
  const desc = document.getElementById("task-input").value;
  const date = document.getElementById("task-due-date").value;
  if (!desc || !date) return alert("Enter both task and date!");
  tasks.push(new Task(desc, date));
  saveTasks();
  renderTasks();
  document.getElementById("task-input").value = "";
  document.getElementById("task-due-date").value = "";
});

loadTasks();
