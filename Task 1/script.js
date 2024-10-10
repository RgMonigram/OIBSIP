const displayInput = document.getElementById('display-input');
const displayResult = document.getElementById('display-result');
let currentInput = ''; // Track the current input (initially empty)
let operator = ''; // Track the selected operator

// Function to update the input display (left-aligned)
function updateInputDisplay() {
    displayInput.textContent = currentInput || '0'; // Shows the current equation e.g. "2+5", default to '0'
}

// Function to update the result display (right-aligned)
function updateResultDisplay(result) {
    displayResult.textContent = result; // Displays the final result e.g. "7"
}

// Event listeners for number buttons
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        currentInput += e.target.textContent;
        updateInputDisplay();
    });
});

// Event listeners for operator buttons
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (currentInput === '') return; // Prevent operator from being the first input
        
        currentInput += e.target.textContent;
        operator = e.target.textContent; // Store operator for future use
        updateInputDisplay();
    });
});

// Event listener for the equals button
document.getElementById('equals').addEventListener('click', () => {
    if (!operator || currentInput === '') return; // Prevent calculation if operator or input is empty
    
    try {
        const result = eval(currentInput);
        updateResultDisplay(result); // Display result on the right side
    } catch (error) {
        updateResultDisplay('Error'); // Display error in case of invalid input
    }
});

// Event listener for the clear button (reset everything)
document.getElementById('clear').addEventListener('click', () => {
    currentInput = ''; // Clear current input
    operator = ''; // Clear operator
    updateInputDisplay();
    updateResultDisplay(''); // Clear result
});

// Event listener for the delete button (delete last character)
document.getElementById('delete').addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1); // Remove last character
    updateInputDisplay();
});

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Allow numeric keys, decimal point, and operators
    if ((key >= '0' && key <= '9') || key === '.') {
        currentInput += key;
        updateInputDisplay();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        if (currentInput === '') return; // Prevent operator as the first input
        currentInput += key;
        operator = key;
        updateInputDisplay();
    } else if (key === 'Enter') {
        // Handle the equals operation
        document.getElementById('equals').click();
    } else if (key === 'Backspace') {
        // Handle the delete operation
        document.getElementById('delete').click();
    } else if (key === 'Escape') {
        // Handle clear operation
        document.getElementById('clear').click();
    }
});
