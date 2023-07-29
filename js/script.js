// Define an object containing the values for different buttons.
const buttonValues = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  zero: 0,
  addition: "+",
  subtraction: "-",
  multiplication: "*",
  division: "/",
  decimalpoint: ".",
  backspace: "Backspace",
  equals: "equals",
};

// Initialize variables to store user input and the current number being entered.
let userInputDisplay = "";
let inputHistory = "";

// Get references to the HTML elements for displaying the result and input history.
const resultDisplay = document.getElementById("results");
const inputHistoryDisplay = document.getElementById("inputHistory");

// Function to update the result display with the user input.
const resultUpdate = () => {
  resultDisplay.innerText = userInputDisplay;
};

// Function to capture the user input and update the display accordingly.
const captureUserInput = (currentInput) => {
  userInputDisplay += currentInput;
};

//Resets user input display and history
const resetDisplay = () => {
  userInputDisplay = "";
  inputHistoryDisplay.innerText = "";
};

//Used to reset userInputDisplay and inputHistory after = is pressed and user continues with number input
let lastInputEquals = false;

// Function to handle button clicks and perform appropriate actions.
const handleButtonClick = (buttonID) => {
  const currentInput = buttonValues[buttonID];

  // If the button is a number or decimal point capture the input
  if (typeof currentInput == "number" || currentInput == ".") {
    if (lastInputEquals == false) {
      captureUserInput(currentInput);
    } else if (lastInputEquals == true) {
      // Resets the history and user input display if the user directly presses number instead of further calculation
      resetDisplay();
      lastInputEquals = false;
      captureUserInput(currentInput);
    }
    //If the input is a valid operator, capture the input.
  } else if (
    buttonID == "addition" ||
    buttonID == "subtraction" ||
    buttonID == "multiplication" ||
    buttonID == "division"
  ) {
    lastInputEquals = false; // Incase the last input was "Equals to and the string was evaluated and user wishes to continue the calculation -
    captureUserInput(currentInput);
  } else if (buttonID == "allClear") {
    // If the button is the "All Clear" button, reset the user input and history.
    resetDisplay();
  } else if (buttonID == "backspace") {
    // If the button is the "Backspace" button, remove the last character from the user input.
    userInputDisplay = userInputDisplay.substring(
      0,
      userInputDisplay.length - 1
    );
  } else if (buttonID == "equals") {
    try {
      // If the button is the "Equals" button, try to evaluate the user input as an expression.
      const result = eval(userInputDisplay);
      inputHistory = userInputDisplay;

      // Function to round a number to a specific number of decimal places.
      function roundToMaxDecimalPlaces(number, maxDecimals) {
        const roundedNumber = Number(number.toFixed(maxDecimals));
        return roundedNumber;
      }

      // Display the rounded result in the user input display and update the history display.
      userInputDisplay = roundToMaxDecimalPlaces(result, 6);
      inputHistoryDisplay.innerText = inputHistory;
      lastInputEquals = true;
    } catch (error) {
      // If the evaluation fails, show an alert with an error message.

      alert("Invalid Input");
    }
  }
};

// Get all elements with class "input-buttons" and convert the NodeList to an array
const inputButtons = Array.from(document.querySelectorAll(".input-buttons"));

// Add an event listener to each button in the array
inputButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    handleButtonClick(event.target.id);
    resultUpdate();
  });
});

// Add an even to get the keyboard input
document.addEventListener("keyup", (event) => {
  let currentKeyboardInput = event.key;
  console.log(currentKeyboardInput);
  const numberRegex = /^\d$/;
  const operatorsRegex = /^[*\/+\-]$/;

  // Fetches the ID value form buttonValues so that it can be used for handleButtonClick(buttonID)
  const fetchButtonIdInButtonValues = (currentKeyboardInput) => {
    for (let key in buttonValues) {
      if (buttonValues[key] == currentKeyboardInput) {
        return key;
      }
    }
  };

  currentKeyboardInput = numberRegex.test(currentKeyboardInput)
    ? parseInt(currentKeyboardInput)
    : currentKeyboardInput;
  currentKeyboardInput =
    currentKeyboardInput == "=" ? "equals" : currentKeyboardInput;

  const buttonID = fetchButtonIdInButtonValues(currentKeyboardInput);
  handleButtonClick(buttonID);
  resultUpdate();
});
