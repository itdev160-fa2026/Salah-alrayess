console.log("=== Activity 6: Interactive To-Do List (Part 2) ===");

// =============================
// Global Variables and State
// =============================
let tasks = [];
let taskIdCounter = 0;
let currentFilter = "all";

// =============================
// Part D: Core Functionality
// =============================
function addTask(taskText, priority = "medium") {
  if (!taskText.trim()) {
    alert("Please enter a task!");
    return;
  }

  const newTask = {
    id: taskIdCounter++,
    text: taskText.trim(),
    completed: false,
    priority,
    timestamp: new Date(),
  };

  tasks.push(newTask);
  renderTasks();
  updateTaskStats();
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = `task-item ${task.completed ? "completed" : ""}`;

  const priorityBar = document.createElement("div");
  priorityBar.className = `task-priority priority-${task.priority}`;

  const textSpan = document.createElement("span");
  textSpan.textContent = task.text;
  textSpan.addEventListener("dblclick", () => editTask(task.id));

  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("task-actions");

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = task.completed ? "Undo" : "Done";
  toggleBtn.classList.add("task-btn", "toggle-btn");
  toggleBtn.addEventListener("click", () => toggleTaskCompletion(task.id));

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("task-btn", "delete-btn");
  deleteBtn.addEventListener("click", () => deleteTask(task.id));

  actionsDiv.append(toggleBtn, deleteBtn);
  li.append(priorityBar, textSpan, actionsDiv);
  return li;
}

// =============================
// Part E: Task State Management
// =============================
function toggleTaskCompletion(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) task.completed = !task.completed;
  renderTasks();
  updateTaskStats();
}

function deleteTask(taskId) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks = tasks.filter(t => t.id !== taskId);
    renderTasks();
    updateTaskStats();
  }
}

function updateTaskStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  document.getElementById("task-count").textContent = total;
  document.getElementById("stats").textContent = `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;
}

function renderTasks() {
  const todoList = document.getElementById("todo-list");
  const emptyState = document.getElementById("emptyState");
  todoList.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "pending") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
    filteredTasks.forEach(task => todoList.appendChild(createTaskElement(task)));
  }
}

// =============================
// Event Listeners & Init
// =============================
document.getElementById("add-task-btn").addEventListener("click", () => {
  const taskText = document.getElementById("task-input").value;
  const priority = document.getElementById("prioritySelect").value;
  addTask(taskText, priority);
  document.getElementById("task-input").value = "";
});

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

document.getElementById("markAllDoneBtn").addEventListener("click", () => {
  tasks.forEach(t => (t.completed = true));
  renderTasks();
  updateTaskStats();
});

document.getElementById("deleteCompletedBtn").addEventListener("click", () => {
  if (confirm("Delete all completed tasks?")) {
    tasks = tasks.filter(t => !t.completed);
    renderTasks();
    updateTaskStats();
  }
});

document.getElementById("clearAllBtn").addEventListener("click", () => {
  if (confirm("Clear all tasks?")) {
    tasks = [];
    renderTasks();
    updateTaskStats();
  }
});

function editTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;
  const newText = prompt("Edit task:", task.text);
  if (newText !== null) {
    task.text = newText.trim() || task.text;
    renderTasks();
  }
}

// Initial render
renderTasks();
updateTaskStats();
