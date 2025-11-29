function calculator() {
  let num1, num2, operation;

  function getNumber(message) {
    while (true) {
      let input = prompt(message);
      if (input === null) {
        return null;
      }
      if (!isNaN(input) && input.trim() !== "") {
        return Number(input);
      } else {
        alert("Invalid number! Please enter a valid number.");
      }
    }
  }

  function getOperation() {
    while (true) {
      let op = prompt("Enter operation (+, -, *, /, %):");
      if (op === null) {
        return null;
      }
      switch (op) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "%":
          return op;
        default:
          alert("Invalid operation! Please enter one of (+, -, *, /, %).");
      }
    }
  }

  num1 = getNumber("Enter the first number:");
  if (num1 === null) {
    return alert("Calculation cancelled. Please try again.");
  }

  operation = getOperation();
  if (operation === null) {
    return alert("Calculation cancelled. Please try again.");
  }

  num2 = getNumber("Enter the second number:");
  if (num2 === null) {
    return alert("Calculation cancelled. Please try again.");
  }

  let result;
  switch (operation) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        return alert("Error: Division by zero is not allowed.");
      }
      result = num1 / num2;
      break;
    case "%":
      result = num1 % num2;
      break;
  }

  alert(`Result: ${num1} ${operation} ${num2} = ${result}`);
}

calculator();
