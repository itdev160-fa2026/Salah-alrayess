console.log("=== Activity 6: Function Demonstrations ===");

// Function Declaration
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("Salah"));

// Function Expression
const add = function (a, b) {
  return a + b;
};
console.log("Addition (Function Expression):", add(3, 5));

// Arrow Function
const multiply = (a, b) => a * b;
console.log("Multiply (Arrow):", multiply(4, 6));

// Parameters vs Arguments
function describeTask(task, priority) {
  return `Task: ${task} | Priority: ${priority}`;
}
console.log(describeTask("Finish project", "High"));

// Local vs Global Scope
let globalVar = "Global variable";
function scopeDemo() {
  let localVar = "Local variable";
  console.log("Inside function:", localVar);
  console.log("Inside function (access global):", globalVar);
}
scopeDemo();
console.log("Outside function (access global):", globalVar);

// Return Values
function square(n) {
  return n * n;
}
console.log("Square of 5:", square(5));
