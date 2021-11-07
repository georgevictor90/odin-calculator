// Grab the buttons
const numButtons = Array.from(document.querySelectorAll('.num-btn'));
const delButtons = Array.from(document.querySelectorAll('.del-btn'));
const display = document.querySelector('.display');

let currentNum;
let defaultNum = '0';

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


// Show the value of the pressed button on the display
  
  // Add event listeners for number Buttons
    for (let i = 0; i < numButtons.length; i++) {
      numButtons[i].addEventListener('click', disp);

      function disp() {
        currentNum = numButtons[i].value;
        if (display.textContent === '0') {
          display.textContent = `${currentNum}`;
          
        } else display.textContent = display.textContent + `${currentNum}`;
          currentNum = display.textContent;
      };
    };

    
// Store display value in a variable

// Add event listeners for del buttons
    for (let i = 0; i < delButtons.length; i++) {
      delButtons[i].addEventListener('click', deleteNum);

      function deleteNum() {
      // if user presses AC, currentNum and display resets to 0 
        if (delButtons[i].value === 'ac') {
          display.textContent = '0';
          currentNum = '0';
          
      // if user presser DEL, last number of display and currentNum gets deleted    
        } else if (delButtons[i].value === 'del') {
          if (display.textContent !== '0') {
            display.textContent = display.textContent.substring(0, display.textContent.length - 1);
            currentNum = display.textContent;
            if (display.textContent.length === 0) {
              display.textContent = '0';
              currentNum = display.textContent;
            }
          } 
        }
      } 
    }