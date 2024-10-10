// Random quote generator
const quotes = [
    "A winner is a dreamer who never gives up.",
    "What counts in life is not the mere fact that we have lived. It is what difference we have made to the lives of others.",
    "I learned that courage was not the absence of fear, but the triumph over it."
];

function displayRandomQuote() {
    const quoteElement = document.getElementById('random-quote');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
}

window.onload = displayRandomQuote;
