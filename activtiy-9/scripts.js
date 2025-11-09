// === Activity 9: Contact Form Validation ===

// Console Header
console.log("=== Activity 9: Contact Form Validation ===\n");

// Access the form
const form = document.getElementById("contactForm");

// === FORM ACCESS DEMONSTRATIONS ===
console.log("=== FORM ACCESS DEMONSTRATIONS ===");
console.log("Contact form:", form);
console.log("Form elements collection:", form.elements);
console.log("Form elements count:", form.elements.length);

console.log("\nDifferent ways to access form elements:");
console.log("By ID:", document.getElementById("name"));
console.log("By name (form.elements):", form.elements["name"]);
console.log("By index:", form.elements[0]);

console.log("\nAll form elements:");
for (let i = 0; i < form.elements.length; i++) {
    const el = form.elements[i];
    console.log(`${i}: ${el.tagName} - name: "${el.name}", type: "${el.type}"`);
}

// === FORM EVENT HANDLING ===
console.log("\n=== FORM EVENT HANDLING ===");
console.log("Setting up validation event listeners...");

// Event Listeners
form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("\nForm submit event triggered");
    handleFormSubmit();
});

form.addEventListener("input", (event) => {
    validateField(event.target);
    console.log(`Input event: ${event.target.name} = "${event.target.value}"`);
});

form.addEventListener("blur", (event) => {
    validateField(event.target);
}, true);

console.log("Contact Form Validation application initialized successfully!");
console.log("Try filling out the form and see real-time validation in action!\n");

// === VALIDATION FUNCTIONS ===
function validateName(value) {
    return value.trim() !== "";
}

function validateEmail(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
}

function validateSubject(value) {
    return value !== "";
}

function validateMessage(value) {
    return value.trim().length >= 10;
}

// === REAL-TIME VALIDATION FEEDBACK ===
function validateField(input) {
    const errorMsg = input.nextElementSibling;
    if (!errorMsg || !errorMsg.classList.contains("error-message")) return;

    let valid = false;

    switch (input.name) {
        case "name":
            valid = validateName(input.value);
            errorMsg.textContent = valid ? "" : "Name is required.";
            break;
        case "email":
            valid = validateEmail(input.value);
            errorMsg.textContent = valid ? "" : "Enter a valid email address.";
            break;
        case "subject":
            valid = validateSubject(input.value);
            errorMsg.textContent = valid ? "" : "Please select a subject.";
            break;
        case "message":
            valid = validateMessage(input.value);
            errorMsg.textContent = valid ? "" : "Message must be at least 10 characters.";
            break;
    }

    input.classList.toggle("valid", valid);
    input.classList.toggle("invalid", !valid);
    updateSubmitButtonState();
}

function updateSubmitButtonState() {
    const allValid = [...form.elements].every((el) => {
        if (el.tagName === "BUTTON") return true;
        if (el.type === "submit" || el.type === "button") return true;
        return el.classList.contains("valid");
    });
    document.getElementById("submitBtn").disabled = !allValid;
}

// === FORM SUBMISSION HANDLING ===
function handleFormSubmit() {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value;
    const message = form.message.value.trim();

    const valid =
        validateName(name) &&
        validateEmail(email) &&
        validateSubject(subject) &&
        validateMessage(message);

    if (!valid) {
        document.getElementById("formStatus").textContent = "Please fix the errors before submitting.";
        console.warn("Form validation failed. Submission blocked.");
        return;
    }

    document.getElementById("formStatus").textContent = "Form submitted successfully!";
    console.log("\nForm submission successful!");
    console.log("Form Data:", { name, email, subject, message });

    form.reset();
    [...form.elements].forEach((el) => el.classList.remove("valid", "invalid"));
    updateSubmitButtonState();
}
