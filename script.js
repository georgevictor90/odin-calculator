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
  // Grab the buttons
    const buttons = Array.from(document.querySelectorAll('.num-btn'));
    const display = document.querySelector('.display');
    let currentNum;

  // Add event listeners 
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', disp);

      function disp() {
        currentNum = buttons[i].value;
        if (display.textContent === '0') {
          display.textContent = `${currentNum}`;
          
        } else display.textContent = display.textContent + `${currentNum}`;
          currentNum = display.textContent;
      };
    };

    
  // Store display value in a variable