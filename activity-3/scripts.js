console.log("=== Activity 3: Dynamic Greeting Card ===");

// DOM Selection Demonstrations
const greetingMessage = document.getElementById("greeting-message");
const greetingImage = document.getElementById("greeting-image");
const nameInput = document.getElementById("nameInput");
const cardContainer = document.querySelector(".card-container");
const allButtons = document.querySelectorAll("button");

console.log("=== DOM SELECTION DEMONSTRATIONS ===");
console.log("Selected greeting message element:", greetingMessage);
console.log("Selected greeting image element:", greetingImage);
console.log("Selected name input element:", nameInput);
console.log("Selected card container:", cardContainer);
console.log("First button found:", allButtons[0]);
console.log(`Found ${allButtons.length} buttons:`, allButtons);

// Greeting card data
const greetings = {
  birthday: {
    message: "🎉 Happy Birthday! 🎂",
    image: "images/card1.jpg",
    alt: "Birthday celebration greeting"
  },
  holiday: {
    message: "🎄 Happy Holidays! ⭐",
    image: "images/card2.jpg",
    alt: "Holiday celebration greeting"
  },
  thankYou: {
    message: "🙏 Thank You! 💝",
    image: "images/card3.jpg",
    alt: "Thank you greeting"
  },
  welcome: {
    message: "👋 Welcome! 🌟",
    image: "images/card1.jpg",
    alt: "Welcome greeting"
  }
};

// Log content & attribute modifications
console.log("\n=== CONTENT MODIFICATION DEMONSTRATIONS ===");
console.log("Original message textContent:", greetingMessage.textContent);
console.log("Original image alt attribute:", greetingImage.alt);

console.log("\n=== ATTRIBUTE MODIFICATION DEMONSTRATIONS ===");
console.log("Current image src:", greetingImage.src);
console.log("Image has 'src' attribute:", greetingImage.hasAttribute("src"));

// Update greeting function
function updateGreeting(type) {
  const greeting = greetings[type];
  if (!greeting) return;

  greetingMessage.textContent = greeting.message;
  greetingImage.src = greeting.image;
  greetingImage.alt = greeting.alt;
  console.log(`Updated greeting to: ${type}`);
}

// Functions for HTML buttons
function showBirthday() { updateGreeting("birthday"); }
function showHoliday() { updateGreeting("holiday"); }
function showThankYou() { updateGreeting("thankYou"); }
function showRandom() {
  const types = ["birthday", "holiday", "thankYou"];
  const randomType = types[Math.floor(Math.random() * types.length)];
  updateGreeting(randomType);
  console.log(`Random greeting selected: ${randomType}`);
}

// Personalize greeting
function personalizeGreeting() {
  const name = nameInput.value.trim();
  if (!name) return alert("Please enter a name to personalize!");
  
  const currentType = Object.keys(greetings).find(
    key => greetings[key].message === greetingMessage.textContent.split("<br>")[0]
  ) || "welcome";

  greetingMessage.innerHTML = `${greetings[currentType].message}<br><br>Dear ${name}! 💖`;
  nameInput.value = "";
}

// Page load demo
document.getElementById("output").innerHTML = `
  <h3>DOM Manipulation Demo Loaded!</h3>
  <p>✅ Successfully selected and ready to manipulate DOM elements</p>
  <p>Check the console for detailed demonstrations of DOM operations</p>
`;

console.log("\n=== GREETING CARD FUNCTIONS ===");
console.log("Dynamic Greeting Card application loaded successfully!");
