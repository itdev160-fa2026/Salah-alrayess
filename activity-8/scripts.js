// scripts.js

const quoteBtn = document.getElementById("new-quote");
const loadingEl = document.getElementById("loading");
const quoteCard = document.getElementById("quote-card");
const errorEl = document.getElementById("error");

async function fetchQuote() {
  loadingEl.classList.remove("hidden");
  quoteCard.classList.add("hidden");
  errorEl.classList.add("hidden");

  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const data = await res.json();

    displayQuote(data.quote, data.author);
  } catch (err) {
    showError(err.message);
  } finally {
    loadingEl.classList.add("hidden");
  }
}

function displayQuote(quote, author) {
  quoteCard.innerHTML = `
    <p>"${quote}"</p>
    <span>- ${author}</span>
  `;
  quoteCard.classList.remove("hidden");
}

function showError(message) {
  errorEl.textContent = "⚠️ " + message;
  errorEl.classList.remove("hidden");
}

quoteBtn.addEventListener("click", fetchQuote);

// Fetch a quote when page first loads
fetchQuote();
