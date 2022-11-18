let displayValue = 0;

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