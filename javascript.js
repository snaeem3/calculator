let displayValue = 0;
let currentNum = 0;
let prevNum = 0;
let currentOperator = "";
const numDict = {
    "zero": 0,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
}

function add(num1,num2) {
    return num1 + num2;
}

function subtract(num1,num2) {
    return num1 - num2;
}

function multiply(num1,num2) {
    return num1 * num2;
}

function divide(num1,num2) {
    return num1 / num2;
}
function operate(num1,num2,operator) {
    switch (operator) {
        case "add":
            return add(num1,num2);
            break;
        case "subtract":
            return subtract(num1,num2);
            break;
        case "multiply":
            return multiply(num1,num2);
            break;
        case "divide":
            if (num2 === 0) {
                return "ERROR";
            }
            return divide(num1,num2);
    }
}

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    // console.log(button.id);
    //if button is number increment current number and update display value
    if (button.id in numDict) {
        currentNum = updateCurrentNum(numDict[button.id]);
        updateDisplay(currentNum);
    }
    // if operator is selected store current num into previous num and set current num to zero
    else if (button.className === "operator"){
        //if current operator is not blank then operate on current values
        if (currentOperator != ""){
            prevNum = operate(prevNum,currentNum,currentOperator);
            updateDisplay(prevNum);
        }
        else {
            prevNum = currentNum;
        }
        currentNum = 0;
        currentOperator = button.id;
    }
    else if (button.id === "equal"){
        updateDisplay(operate(prevNum,currentNum,currentOperator));
        prevNum = currentNum;
        resetCurrentNum();
        resetCurrentOperator();
    }

  });
});

function updateCurrentNum(num) {
    textNum = String(currentNum) + String(num);
    return parseInt(textNum);
}

function resetCurrentNum() {
    currentNum = 0;
}

function resetCurrentOperator() {
    currentOperator = "";
}

function updateDisplay(num) {
    displayValue = num;
    document.querySelector('#display').textContent = displayValue;
}