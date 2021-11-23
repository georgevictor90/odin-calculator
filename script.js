// Grab the elements
const numButtons = Array.from(document.querySelectorAll('.num-btn'));
const opButtons = Array.from(document.querySelectorAll('.operator-btn'));
const acBtn = document.getElementById('ac');
const delBtn = document.getElementById('del');
const equalBtn = document.querySelector('.equal');
const displayPreviousOperand = document.querySelector('[data-previous-operand]');
const displayCurrentOperand = document.querySelector('[data-current-operand]');

//Regex looking for operator symbols
const exp = /\D+/;

//Set defaults
let operator = undefined;
let currentOperand = '';
let previousOperand = '';

// Add functions for the basic operations
const add = function(a, b) {
  return a + b;
}

const subtract = function(a, b) {
  return a - b;
}

const multiply = function(a, b) {
  return a * b;
}

const divide = function(a, b) {
  return a / b;
}

const percentage = function(a, b) {
  return a / 100 * b;
}




function allClear() {
  currentOperand = '';
  previousOperand = '';
  operator = undefined;
}

function del() {
  currentOperand = currentOperand.toString().slice(0, -1);
}

function operate() {
 let result;
 const previousNum = parseFloat(previousOperand); 
 const currentNum = parseFloat(currentOperand); // i am using parseFloat() instead of Number() because the latter converts an empty string to 0 instead of NaN;
 if (isNaN(previousNum) || isNaN(currentNum)) return;

 switch(operator) {
  case "+":
    result = add(previousNum, currentNum);
    break;
  case "-":
    result = subtract(previousNum, currentNum);
    break;
  case "×":
    result = multiply(previousNum, currentNum);
    break;
  case "÷":
    result = divide(previousNum, currentNum);
    break;
  case "%":
    result = percentage(previousNum, currentNum);
    break;
  default: 
    return;
}    
 currentOperand = result;
 operator = undefined;
 previousOperand = '';   
}

function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return
  currentOperand = currentOperand.toString() + number.toString();
}

function getDisplayNumber(number) {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split('.')[0]);
  const decimalDigits = stringNumber.split('.')[1];
  let integerDisplay;
  if (isNaN(integerDigits)) {
    integerDisplay = '';
  } else {
    integerDisplay = integerDigits.toLocaleString('en', {
    maximumFractionDigits: 0})
  }

  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

function roundNum(number) {
  return number = Math.round((number + Number.EPSILON) * 100) / 100;
}

function updateDisplay() {
  displayCurrentOperand.textContent = getDisplayNumber(currentOperand);
  if (operator !== undefined) {
    displayPreviousOperand.textContent = `${getDisplayNumber(previousOperand)} ${operator}`;
  } else {
    displayPreviousOperand.textContent = '';
  }
}

function selectOperation(operation) {
  if (currentOperand === '') return
  if (previousOperand !== '') {
    operate();
  }
  operator = operation;
  previousOperand = currentOperand;
  currentOperand = '';
}

// ADD EVENT LISTENERS FOR NUMBER BUTTONS
numButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.textContent);
    updateDisplay();
  })
})

//ADD EVENT LISTENERS FOR OPERATION BUTTONS
opButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectOperation(button.textContent);
    updateDisplay();
  })
})

//ADD EVENT LISTENER FOR EQUALS BUTTON
equalBtn.addEventListener('click', button => {
  operate();
  updateDisplay();
})

//ADD EVENT LISTENER FOR ALL CLEAR BUTTON
acBtn.addEventListener('click', button => {
  allClear();
  updateDisplay();
})

//ADD EVENT LISTENER FOR DELETE BUTTON
delBtn.addEventListener('click', button => {
  del();
  updateDisplay();
})