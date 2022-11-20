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
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
}
const divideZeroText = '😒';

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
    executeInput(button);
  });
});

document.addEventListener('keydown', (event) => {
    var keyName = event.key;
    var code = event.code;
    console.log(keyName);

    if (!isNaN(parseInt(keyName))){
        // console.log(numDict[keyName]);
        var buttonId = `#${numDict[keyName]}`;
        // console.log(buttonId);
        executeInput(document.querySelector(buttonId));
    }
    else if (keyName === 'Backspace') {
        executeInput(document.querySelector("#backspace"));
    }
    else if (keyName === 'Enter'){
        executeInput(document.querySelector('#equal'));
    }
    else if (keyName === '+'){
        executeInput(document.querySelector('#add'));
    }
    else if (keyName === '-'){
        executeInput(document.querySelector('#subtract'));
    }
    else if (keyName === '*') {
        executeInput(document.querySelector('#multiply'));
    }
    else if (keyName === '/') {
        executeInput(document.querySelector('#divide'));
    }
  }, false);

function executeInput(input) {
    if (input.id === "clear") {
        resetCurrentNum();
        prevNum = 0;
        updateDisplay(0);
    }
    else if (input.id === "backspace") {
        currentNum = backspace();
        updateDisplay(currentNum);
    }
    else if (input.id === "plus-minus") {
        currentNum = operate(currentNum,-1,"multiply");
        updateDisplay(currentNum);
    }
    //if button is number increment current number and update display value
    else if (input.id in numDict) {
        currentNum = updateCurrentNum(numDict[input.id]);
        updateDisplay(currentNum);
    }
    // if operator is selected store current num into previous num and set current num to zero
    else if (input.className === "operator"){
        //if current operator is not blank then operate on current values
        if (currentOperator != ""){
            prevNum = operate(prevNum,currentNum,currentOperator);
            prevNum = Math.round(prevNum * 1000) / 1000;
            updateDisplay(prevNum);
        }
        else {
            prevNum = currentNum;
        }
        resetCurrentNum();
        currentOperator = input.id;
    }
    else if (input.id === "equal" && currentOperator != ""){
        updateDisplay(Math.round(operate(prevNum,currentNum,currentOperator) * 1000) / 1000);
        prevNum = currentNum;
        resetCurrentNum();
        resetCurrentOperator();
    }
}

function updateCurrentNum(num) {
    let textNum = String(currentNum) + String(num);
    return parseInt(textNum);
}

function resetCurrentNum() {
    currentNum = 0;
}

function resetCurrentOperator() {
    currentOperator = "";
}

function updateDisplay(num) {
    if (isNaN(num)) {
        document.querySelector('#display').textContent = divideZeroText;
    }
    else{
        displayValue = num;
        document.querySelector('#display').textContent = String(displayValue);
    }
}

function backspace() {
    if (String(Math.abs(currentNum)).length <= 1) { //Math.abs to handle negative values
        return 0;
    }
    let textNum = String(currentNum).slice(0,-1);
    return parseInt(textNum);
}