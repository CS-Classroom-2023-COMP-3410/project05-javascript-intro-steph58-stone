let displayValue = '';
let memoryValue = 0;

const display = document.getElementById('calcDisplay');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');
const sqrtButton = document.getElementById('sqrt');
const percentButton = document.getElementById('percent');
const memoryRecallButton = document.getElementById('memory-recall');

function updateDisplay(value) {
    display.value = value;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        if (value === '=') {
            try {
                if (displayValue.includes('/0')) throw new Error('Division by Zero');
                displayValue = eval(displayValue).toString();
            } catch {
                displayValue = 'Error';
            }
        } else {
            displayValue += value;
        }

        updateDisplay(displayValue);
    });
});

clearButton.addEventListener('click', () => {
    displayValue = '';
    updateDisplay('');
});

sqrtButton.addEventListener('click', () => {
    try {
        // Parse the current display value into a number
        const value = parseFloat(displayValue);
        
        // Check if it's a valid number
        if (isNaN(value)) {
            displayValue = 'Error';
        } else if (value < 0) {
            // Square root of a negative number is invalid for real numbers
            displayValue = 'Error';
        } else {
            // Compute square root and update the display
            displayValue = Math.sqrt(value).toString();
        }
        updateDisplay(displayValue);
    } catch {
        displayValue = 'Error';
        updateDisplay(displayValue);
    }
});

percentButton.addEventListener('click', () => {
    try {
        // Parse the current display value into a number
        const value = parseFloat(displayValue);

        // Check if it's a valid number
        if (isNaN(value)) {
            displayValue = 'Error';
        } else {
            // Calculate the percentage (value / 100)
            displayValue = (value / 100).toString();
        }
        updateDisplay(displayValue);
    } catch {
        displayValue = 'Error';
        updateDisplay(displayValue);
    }
});

memoryRecallButton.addEventListener('click', () => {
    displayValue = memoryValue.toString();
    updateDisplay(displayValue);
});

buttons.forEach(button => {
    if (button.id === 'memory-recall') return;
    button.addEventListener('click', () => {
        if (!isNaN(button.dataset.value)) {
            memoryValue = parseFloat(displayValue) || 0;
        }
    });
});
