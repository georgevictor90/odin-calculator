// Grab the buttons
const numButtons = Array.from(document.querySelectorAll('.num-btn'));
const acBtn = document.getElementById('ac');
const delBtn = document.getElementById('del');
const opButtons = Array.from(document.querySelectorAll('.operator-btn'));
const equalBtn = document.querySelector('.equal');
const display = document.querySelector('.display');

//Regex looking for operator symbols
const exp = /\D+/;

//Set defaults
let num1 = '';
let num2 = ''; 
let operator = '';
let result = '';
let lastResult = '';
display.textContent = '0';


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
  
  
// Add function operate that takes an operator and two numbers and calls one of the above functions on the number
  const operate = function(operator, num1, num2) {
    switch(operator) {
      case "+":
        return add(num1,num2);
      case "-":
        return subtract(num1, num2);
      case "*":
        return multiply(num1, num2);
      case "/":
        return divide(num1, num2);
    }    
  }

// Add event listeners for number Buttons
for (let i = 0; i < numButtons.length; i++) {
  numButtons[i].addEventListener('click', setNumber);

  function setNumber() {
    if (typeof num1 === 'string') {
      num1 = Number(numButtons[i].value);
      display.textContent = num1.toString();

    } else if (typeof num1 === 'number') {
        if (exp.test(display.textContent)) {
          if (num2 === '') {
            num2 = Number(numButtons[i].value);
          
          } else if (typeof num2 === 'number') {
            //ADD ANOTHER DIGIT TO NUM2
            num2 = Number(num2.toString().concat(numButtons[i].value));
            
          }
          display.textContent = num1 + operator + num2;
        
        } else {
          // ADD ANOTHER DIGIT TO NUM1
          num1 = Number(num1.toString().concat(numButtons[i].value));
          display.textContent = num1.toString();
        }
    }
  }
}


  
// Add event listeners for operator buttons
for (let i = 0; i < opButtons.length; i++) {
  opButtons[i].addEventListener('click', setOperator);
  function setOperator() {
    if (num1 === '' && operator === '') {
      num1 = 0;
    } else if (typeof num1 === 'number' && operator.length > 0 && typeof num2 === 'number') {
      solveOperation();
      
    } 
    operator = opButtons[i].value;
    display.textContent = num1 + operator; 
  };
}

// ADD EVENT LISTENER FOR EQUALS BUTTON
equalBtn.addEventListener('click', solveOperation); 
function solveOperation() {
  if (typeof num1 === 'number' && typeof num2 === 'number') {
    result = operate(operator, num1, num2);
    display.textContent = result.toString();
    num2 = '';
    lastResult = result;
    num1 = lastResult;
    console.log(num1);
    operator = '';
  }
}




acBtn.addEventListener('click',  clearAll);

function clearAll() {
  display.textContent = '0';
  num1 = '';
  num2 = '';
};

delBtn.addEventListener('click', deleteLastIndex);



function deleteLastIndex() {
  if (num2.toString().length < 1) {
  
    if (operator.length > 0) {
      operator = clearItem(operator);
      display.textContent = num1;
  
    } else {
    
      if (num1.toString().length <= 1) {
        clearAll();
    
      } else {
        num1 = trimNumber(num1);
        display.textContent = num1;
    
      }
    }
  
  } else if (num2.toString().length == 1) {
    num2 = clearItem(num2);
    display.textContent = num1 + operator;
  
  } else if (num2.toString().length > 1) {
      num2 = trimNumber(num2);
      display.textContent = num1 + operator + num2;
  
  }
}
  
  


function trimNumber(numb) {
  return numb = Number(numb.toString().substring(0, numb.toString().length - 1))
}

function clearItem(item) {
  return item = '';
}