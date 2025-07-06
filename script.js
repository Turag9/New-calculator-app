// Calculator functionality
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
let currentInput = '0';
let operator = null;
let operand = null;
let justEvaluated = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function clearAll() {
  currentInput = '0';
  operator = null;
  operand = null;
  justEvaluated = false;
  updateDisplay();
}

function inputNumber(num) {
  if (justEvaluated) {
    currentInput = num;
    justEvaluated = false;
  } else if (currentInput === '0') {
    currentInput = num;
  } else {
    currentInput += num;
  }
  updateDisplay();
}

function inputDot() {
  if (justEvaluated) {
    currentInput = '0.';
    justEvaluated = false;
  } else if (!currentInput.includes('.')) {
    currentInput += '.';
  }
  updateDisplay();
}

function inputOperator(op) {
  if (operator && !justEvaluated) {
    calculate();
  }
  operand = parseFloat(currentInput);
  operator = op;
  justEvaluated = false;
  currentInput = '0';
}

function calculate() {
  if (operator && operand !== null) {
    let result;
    const curr = parseFloat(currentInput);
    switch (operator) {
      case '+': result = operand + curr; break;
      case '-': result = operand - curr; break;
      case '*': result = operand * curr; break;
      case '/': result = curr !== 0 ? operand / curr : 'Error'; break;
      case '%': result = operand % curr; break;
      default: result = curr;
    }
    currentInput = String(result);
    operator = null;
    operand = null;
    justEvaluated = true;
    updateDisplay();
  }
}

function backspace() {
  if (justEvaluated) {
    currentInput = '0';
    justEvaluated = false;
  } else if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = '0';
  }
  updateDisplay();
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.textContent;
    if (!isNaN(val)) {
      inputNumber(val);
    } else if (val === '.') {
      inputDot();
    } else if (['+', '-', '*', '/', '%'].includes(val)) {
      inputOperator(val);
    } else if (val === '=') {
      calculate();
    } else if (val === 'C') {
      clearAll();
    } else if (val === '←') {
      backspace();
    }
  });
});

updateDisplay();
