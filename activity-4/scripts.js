console.log("=== Activity 4: Interactive To-Do List (Part 1) ===");

// -----------------------------
// Part A: Element Creation
// -----------------------------
console.log("\n=== ELEMENT CREATION DEMONSTRATIONS ===");

let demoDiv = document.createElement("div");
let demoSpan = document.createElement("span");
let demoButton = document.createElement("button");

console.log("Created div element:", demoDiv.outerHTML);
console.log("Created span element:", demoSpan.outerHTML);
console.log("Created button element:", demoButton.outerHTML);

demoDiv.id = "demo-div";
demoDiv.textContent = "This is a demo div";

console.log("Div after setting properties:", demoDiv.outerHTML);
console.log("Div textContent:", demoDiv.textContent);
console.log("Div id:", demoDiv.id);

// -----------------------------
// Part B: Styling
// -----------------------------
console.log("\n=== ELEMENT STYLING DEMONSTRATIONS ===");

demoDiv.style.backgroundColor = "lightblue";
demoDiv.style.padding = "5px";
console.log("Applied direct styles to demo div");

demoDiv.classList.add("demo-class", "highlighted");
console.log("Added classes. ClassList:", demoDiv.classList);

console.log("Has 'demo-class':", demoDiv.classList.contains("demo-class"));

demoDiv.classList.remove("highlighted");
console.log("After removing 'highlighted':", demoDiv.classList);

demoDiv.classList.toggle("active");
console.log("After toggling 'active':", demoDiv.classList);

// -----------------------------
// Part C: Appending
// -----------------------------
console.log("\n=== ELEMENT APPENDING DEMONSTRATIONS ===");
const outputDiv = document.getElementById("output");

console.log("Output div before appending:", outputDiv.children.length, "children");

outputDiv.appendChild(demoDiv);
outputDiv.appendChild(demoSpan);
outputDiv.appendChild(demoButton);

console.log("Output div after appending:", outputDiv.children.length, "children");

// -----------------------------
// Part D & E: To-do List
// -----------------------------
console.log("\n=== TO-DO LIST FUNCTIONALITY ===");

const addTaskBtn = document.getElementById("add-task-btn");
const taskInput = document.getElementById("task-input");
const todoList = document.getElementById("todo-list");
const stats = document.getElementById("stats");
const taskCount = document.getElementById("task-count");

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");

  // Task text
  const taskText = document.createElement("span");
  taskText.textContent = text;

  // Status label
  const status = document.createElement("span");
  status.textContent = "Pending";
  status.style.marginLeft = "10px";
  status.style.color = "darkorange";
  status.style.fontSize = "12px";

  li.appendChild(taskText);
  li.appendChild(status);
  li.classList.add("pending");

  // Toggle completion on click
  li.addEventListener("click", () => {
    if (li.classList.contains("done")) {
      li.classList.remove("done");
      li.classList.add("pending");
      status.textContent = "Pending";
      status.style.color = "darkorange";
    } else {
      li.classList.remove("pending");
      li.classList.add("done");
      status.textContent = "Done";
      status.style.color = "green";
    }
    updateStats();
  });

  todoList.appendChild(li);
  taskInput.value = "";
  updateStats();
}

addTaskBtn.onclick = addTask;

function updateStats() {
  const total = todoList.children.length;
  const done = todoList.querySelectorAll(".done").length;
  const pending = total - done;

  taskCount.textContent = total;
  stats.textContent = `Total: ${total} | Completed: ${done} | Pending: ${pending}`;
}

console.log("To-Do List application initialized successfully!");
console.log("Try adding some tasks and clicking them to mark as complete!");
