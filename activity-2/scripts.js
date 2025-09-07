// Part A: Arithmetic Operators

console.log("=== Arithmetic Operators ===");
let a = 10, b = 3;

console.log("Addition (a + b):", a + b);
console.log("Subtraction (a - b):", a - b);
console.log("Multiplication (a * b):", a * b);
console.log("Division (a / b):", a / b);
console.log("Modulus (a % b):", a % b);

// Operator precedence example
console.log("Operator Precedence (a + b * 2):", a + b * 2);
console.log("Operator Precedence ((a + b) * 2):", (a + b) * 2);

// Extra precedence demo
console.log("2 + 3 * 4 =", 2 + 3 * 4, "(multiplication first)");
console.log("(2 + 3) * 4 =", (2 + 3) * 4, "(parentheses first)");


// Part B: Comparison Operators

console.log("\n=== Comparison Operators ===");
console.log("a == '10':", a == "10");   // true (loose equality)
console.log("a === '10':", a === "10"); // false (strict equality)
console.log("a != b:", a != b);
console.log("a !== '10':", a !== "10");
console.log("a > b:", a > b);
console.log("a < b:", a < b);
console.log("b <= 5:", b <= 5);


// Part C: Logical Operators

console.log("\n=== Logical Operators ===");
console.log("true && false:", true && false);
console.log("true || false:", true || false);
console.log("!true:", !true);

// Truth tables demonstration
console.log("Truth Table AND (&&):");
console.log("true && true:", true && true);
console.log("true && false:", true && false);
console.log("false && true:", false && true);
console.log("false && false:", false && false);


// Part D: Conditional Statements

console.log("\n=== Conditional Statements ===");
let number = 7;

if (number > 10) {
  console.log("Number is greater than 10");
} else if (number === 7) {
  console.log("Number is exactly 7");
} else {
  console.log("Number is less than or equal to 10 but not 7");
}

document.getElementById("output").innerHTML += "Checked number = " + number + "<br>";


// Part E: Switch Statement Demo

console.log("\n=== Switch Statement ===");
let day = "Monday";

switch(day) {
  case "Monday":
    console.log("It's Monday - start of the week!");
    break;
  case "Friday":
    console.log("Weekend is near!");
    break;
  case "Saturday":
  case "Sunday":
    console.log("It's the weekend!");
    break;
  default:
    console.log("Just another day.");
}


// Part F: Age Checker Application

function checkAge() {
  const input = document.getElementById("ageInput").value;
  const resultDiv = document.getElementById("result");
  resultDiv.className = ""; // reset styles

  const age = Number(input);

  if (isNaN(age)) {
    resultDiv.textContent = "Invalid age - please enter a number";
    resultDiv.classList.add("invalid");
  } else if (age < 0 || age > 150) {
    resultDiv.textContent = "Invalid age - please enter a realistic age";
    resultDiv.classList.add("invalid");
  } else if (age < 18) {
    resultDiv.textContent = "You are a minor";
    resultDiv.classList.add("minor");
  } else {
    resultDiv.textContent = "You are an adult";
    resultDiv.classList.add("adult");
  }
}
