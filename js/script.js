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
};

// Get references to the HTML elements for displaying the result and input history.
const resultDisplay = document.getElementById("results");
const inputHistoryDisplay = document.getElementById("inputHistory");

// Initialize variables to store user input and the current number being entered.
let userInputDisplay = "";
let currentNumber = "";
let inputHistory = "";

// Function to round a number to a specific number of decimal places.
function roundToMaxDecimalPlaces(number, maxDecimals) {
  const roundedNumber = Number(number.toFixed(maxDecimals));
  return roundedNumber;
}

// Function to capture the user input and update the display accordingly.
const captureUserInput = (currentInput) => {
  userInputDisplay += currentInput;
  currentNumber += currentInput;
};

// Function to handle button clicks and perform appropriate actions.
const handleButtonClick = (buttonID) => {
  const currentInput = buttonValues[buttonID];
  if (
    typeof currentInput == "number" ||
    currentInput == "." ||
    buttonID == "addition" ||
    buttonID == "subtraction" ||
    buttonID == "multiplication" ||
    buttonID == "division"
  ) {
    // If the button is a number or a valid operator, capture the input.
    captureUserInput(currentInput);
  } else if (buttonID == "allClear") {
    // If the button is the "All Clear" button, reset the user input and history.
    userInputDisplay = "";
    inputHistoryDisplay.innerText = "";
  } else if (buttonID == "backspace") {
    // If the button is the "Backspace" button, remove the last character from the user input.
    userInputDisplay = userInputDisplay.substring(
      0,
      userInputDisplay.length - 1
    );
  } else if (buttonID == "equals") {
    // If the button is the "Equals" button, try to evaluate the user input as an expression.
    try {
      const result = eval(userInputDisplay);
      inputHistory = userInputDisplay;
      // Display the rounded result in the user input display and update the history display.
      userInputDisplay = roundToMaxDecimalPlaces(result, 6);
      inputHistoryDisplay.innerText = inputHistory;
    } catch (error) {
      // If the evaluation fails, show an alert with an error message.
      alert("Invalid Input");
    }
  }
};

// Function to update the result display with the user input.
const resultUpdate = () => {
  resultDisplay.innerText = userInputDisplay;
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