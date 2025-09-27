console.log("=== Activity 5: Simple Math Operations Widget ===");

/* ===============================
   PART A: EVENT HANDLING DEMOS
   =============================== */
console.log("=== EVENT HANDLING DEMONSTRATIONS ===");

const num1Input = document.getElementById("number1");
const num2Input = document.getElementById("number2");
const buttons = document.querySelectorAll("button.operation");
const resultDiv = document.getElementById("result");

console.log("Number1 input:", num1Input);
console.log("Number2 input:", num2Input);
console.log("Operation buttons:", buttons);
console.log("Result div:", resultDiv);

/* Event listener demonstration */
console.log("=== SETTING UP EVENT LISTENERS ===");

document.getElementById("addBtn").addEventListener("click", () => {
    calculate("add");
    console.log("Add button clicked via addEventListener");
});
document.getElementById("subtractBtn").addEventListener("click", () => {
    calculate("subtract");
    console.log("Subtract button clicked");
});
document.getElementById("multiplyBtn").addEventListener("click", () => {
    calculate("multiply");
    console.log("Multiply button clicked");
});
document.getElementById("divideBtn").addEventListener("click", () => {
    calculate("divide");
    console.log("Divide button clicked");
});
document.getElementById("clearBtn").addEventListener("click", () => {
    num1Input.value = "";
    num2Input.value = "";
    resultDiv.textContent = "Result will appear here";
    console.log("Inputs and result cleared!");
});

console.log("All event listeners attached successfully!");
console.log("Math Operations Widget initialized!");
console.log("Try entering numbers and clicking operation buttons!");

/* ===============================
   PART B: EVENT OBJECT EXPLORATION
   =============================== */
buttons.forEach(btn => {
    btn.addEventListener("mouseover", (event) => {
        console.log("Mouseover event:", event.type, "Target:", event.target.id);
    });
    btn.addEventListener("mouseout", (event) => {
        console.log("Mouseout event:", event.type, "Target:", event.target.id);
    });
});

/* ===============================
   PART C: INPUT VALIDATION & MATH
   =============================== */
function getNumbers() {
    const n1 = parseFloat(num1Input.value);
    const n2 = parseFloat(num2Input.value);

    if (isNaN(n1) || isNaN(n2)) {
        resultDiv.textContent = "⚠️ Please enter valid numbers.";
        return null;
    }
    return [n1, n2];
}

function calculate(operation) {
    const numbers = getNumbers();
    if (!numbers) return;

    let [n1, n2] = numbers;
    let result;

    switch (operation) {
        case "add": result = n1 + n2; break;
        case "subtract": result = n1 - n2; break;
        case "multiply": result = n1 * n2; break;
        case "divide":
            if (n2 === 0) {
                resultDiv.textContent = "❌ Cannot divide by zero!";
                return;
            }
            result = n1 / n2;
            break;
    }

    resultDiv.textContent = `Result: ${result}`;
}

/* ===============================
   PART D: UI INTERACTIONS
   =============================== */
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.add("active");
        setTimeout(() => btn.classList.remove("active"), 200);
    });
});
