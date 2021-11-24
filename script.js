// GRAB THE ELEMENTS
const numButtons = Array.from(document.querySelectorAll('.num-btn'));
const opButtons = Array.from(document.querySelectorAll('.operator-btn'));
const acBtn = document.getElementById('ac');
const delBtn = document.getElementById('del');
const equalBtn = document.querySelector('.equal');
const negateBtn = document.querySelector('.negate-btn');
const displayPreviousOperand = document.querySelector('[data-previous-operand]');
const displayCurrentOperand = document.querySelector('[data-current-operand]');



//SET DEFAULTS
let operator = undefined;
let currentOperand = '';
let previousOperand = '';

// ADD FUNCTIONS FOR BASIC OPERATIONS
const add = function(a, b) {
  return roundNum(a + b);
}

const subtract = function(a, b) {
  return roundNum(a - b);
}

const multiply = function(a, b) {
  return roundNum(a * b);
}

const divide = function(a, b) {
  return roundNum(a / b);
}

const percentage = function(a, b) {
  return roundNum(a / 100 * b);
}


const numRegex = /\d|\./g;
const opRegex = /\+|\-|\*|\//g;

//ADD EVENT LISTENER FOR USER KEYPRESS
document.addEventListener('keypress', (e) => {
  const keyPressed = e.key;
  if (keyPressed === 'Enter') {
    operate();
    updateDisplay();
  }
  if (keyPressed === 'Delete') {
    allClear();
    updateDisplay();
  }
  if (numRegex.test(keyPressed)) {
    appendNumber(keyPressed);
    updateDisplay();
  }
  if (opRegex.test(keyPressed)) {
    selectOperation(keyPressed);
    updateDisplay();
  }
});

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
    selectOperation(button.value);
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

//ADD EVENT LISTENER FOR NEGATE BUTTON
negateBtn.addEventListener('click', button => {
  negateNumber();
  updateDisplay();
})



//ADD FUNCTIONS FOR EVENT LISTENERS
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
 const parsedPreviousOperand = parseFloat(previousOperand);
 const parsedCurrentOperand = parseFloat(currentOperand);
 const previousNum = roundNum(parsedPreviousOperand); 
 const currentNum = roundNum(parsedCurrentOperand); // i am using parseFloat() instead of Number() because the latter converts an empty string to 0 instead of NaN;
 if (isNaN(previousNum) || isNaN(currentNum)) return;

 switch(operator) {
  case "+":
    result = add(previousNum, currentNum);
    break;
  case "-":
    result = subtract(previousNum, currentNum);
    break;
  case "*":
    result = multiply(previousNum, currentNum);
    break;
  case "/":
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


function negateNumber() {
  if (currentOperand === '') return;
  if (currentOperand.toString().includes('-')) {
    return currentOperand = parseFloat(currentOperand.toString().slice(1))
  } else {
    return currentOperand = parseFloat('-' + currentOperand.toString());
  }
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
