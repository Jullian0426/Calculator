function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if(b === 0) {
    return "Can't divide by zero!";
  }
  return a / b;
}

let displayValue = '0';
let firstNumber = null;
let operator = null;
let awaitingSecondNumber = false;

function operate(operator, num1, num2) {
  switch(operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    case '*':
      return multiply(num1, num2);
    case '/':
      return divide(num1, num2);
    default:
      return 'Invalid operator';
  }
}

function updateDisplay() {
  document.getElementById('display').innerText = displayValue;
}

function numberPressed(number) {
  if (awaitingSecondNumber) {
    displayValue = number.toString();
    awaitingSecondNumber = false;
  } else {
    displayValue = displayValue === '0' ? number.toString() : displayValue + number.toString();
  }
  updateDisplay();
}

function operatorPressed(op) {
  if (!awaitingSecondNumber) {
    if (firstNumber === null) {
      firstNumber = parseFloat(displayValue);
    } else if (operator) {
      const result = operate(operator, firstNumber, parseFloat(displayValue));
      displayValue = `${parseFloat(result.toFixed(7))}`;
      firstNumber = result;
    }
  }
  operator = op;
  awaitingSecondNumber = true;
}

function calculate() {
  if (firstNumber == null || awaitingSecondNumber) return;
  if (operator === '/' && displayValue === '0') {
    displayValue = "Can't divide by zero!";
    updateDisplay();
    return;
  }
  const result = operate(operator, firstNumber, parseFloat(displayValue));
  displayValue = `${parseFloat(result.toFixed(7))}`;
  firstNumber = null;
  operator = null;
  awaitingSecondNumber = false;
  updateDisplay();
}

function clearDisplay() {
  displayValue = '0';
  firstNumber = null;
  operator = null;
  awaitingSecondNumber = false;
  updateDisplay();
}

function decimalPressed() {
  if (!displayValue.includes('.')) {
    displayValue += '.';
    updateDisplay();
  }
}

function backspacePressed() {
  if (displayValue.length > 1) {
    displayValue = displayValue.slice(0, -1);
  } else {
    displayValue = '0';
  }
  updateDisplay();
}

document.addEventListener('keydown', (event) => {
  if (event.key >= 0 && event.key <= 9) {
    numberPressed(event.key);
  } else if (['+', '-', '*', '/'].includes(event.key)) {
    operatorPressed(event.key);
  } else if (event.key === '.') {
    decimalPressed();
  } else if (event.key === 'Enter' || event.key === '=') {
    calculate();
  } else if (event.key === 'Backspace') {
    backspacePressed();
  } else if (event.key === 'Escape') {
    clearDisplay();
  }
});