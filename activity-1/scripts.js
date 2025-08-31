// Part A: Console Hello World
console.log("Hello, World!");

// Part B: Webpage Hello World
document.getElementById("output").innerText = "Hello, World!";

// Part C: Variable Declarations
let studentName = "Salah Eddin alrayess"; 
const age = 23; 
let isStudent = true;
let emptyValue = null;
let notAssigned; 

// Part D: Console Output
console.log("=== Variable Values ===");
console.log("Student Name:", studentName);
console.log("Age:", age);
console.log("Is Student:", isStudent);
console.log("Empty Value:", emptyValue);
console.log("Not Assigned:", notAssigned);

console.log("=== Variable Types ===");
console.log("typeof studentName:", typeof studentName);
console.log("typeof age:", typeof age);
console.log("typeof isStudent:", typeof isStudent);
console.log("typeof emptyValue:", typeof emptyValue);
console.log("typeof notAssigned:", typeof notAssigned);

// Part E: Variable Reassignment
console.log("=== Variable Reassignment ===");
console.log("Original studentName:", studentName);

studentName = "Mohammad";
console.log("Updated studentName:", studentName);

try {
  age = 25; // error (const)
} catch (error) {
  console.log("Error when trying to reassign 'age':", error.message);
}
