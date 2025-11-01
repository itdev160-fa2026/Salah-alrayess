// demos.js

console.log("=== Part A: Asynchronous JavaScript Demonstrations ===");

// Synchronous vs Asynchronous Example
console.log("1. Synchronous code starts");
setTimeout(() => console.log("2. Asynchronous timeout finished"), 1000);
console.log("3. Synchronous code ends");

// Promise Example
const promiseExample = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Promise resolved after 1.5s"), 1500);
});
promiseExample.then(console.log);

// Async/Await Example
async function asyncDemo() {
  console.log("Async/Await demo started...");
  try {
    const result = await promiseExample;
    console.log("Async/Await received:", result);
  } catch (error) {
    console.error("Error in asyncDemo:", error);
  }
}
asyncDemo();

// Part B: Fetch API Demonstration
console.log("\n=== Part B: Fetch API Introduction ===");

fetch("https://dummyjson.com/quotes/random")
  .then(response => response.json())
  .then(data => console.log("Fetch (then/catch) quote:", data.quote))
  .catch(err => console.error("Fetch error (then/catch):", err));

(async () => {
  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();
    console.log("Fetch (async/await) quote:", data.quote);
  } catch (error) {
    console.error("Fetch error (async/await):", error);
  }
})();
