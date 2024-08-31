// Array of words with their scrambled versions and hints
const words = [
    { word: "exchange", scrambled: "AEGEXCNH", hint: "The act of trading" },
    { word: "javascript", scrambled: "TPIRCSAVAJ", hint: "Popular programming language" },
    { word: "challenge", scrambled: "EGNELLACH", hint: "Something that requires effort" },
    { word: "computer", scrambled: "PUTERMCO", hint: "Electronic device " },
    { word: "kundan", scrambled: "NDANUK", hint: "frontend developer" },
];

let currentWord; // Holds the current word object being used in the game
let attempts = 0; // Counter for the number of attempts made by the user
let timeLeft = 30; // Time limit in seconds for each word
let timerInterval; // Reference to the interval for the countdown timer

// DOM elements for interaction and display
const scrambledWordElement = document.getElementById('scrambled-word'); // Displays the scrambled word
const hintElement = document.getElementById('hint'); // Displays the hint for the current word
const timerElement = document.getElementById('timer'); // Displays the countdown timer
const userInput = document.getElementById('user-input'); // Input field for user's guess
const feedbackMessage = document.getElementById('feedback-message'); // Feedback message for user attempts
const submitBtn = document.getElementById('submit-btn'); // Button to submit the user's guess
const refreshBtn = document.getElementById('refresh-btn'); // Button to refresh and get a new scrambled word

// Function to start the game with a new scrambled word
function startGame() {
    const randomIndex = Math.floor(Math.random() * words.length); // Select a random word from the list
    currentWord = words[randomIndex]; // Set the current word object
    scrambledWordElement.textContent = currentWord.scrambled.split('').join(' '); // Display the scrambled word with spaces
    hintElement.textContent = `Hint: ${currentWord.hint}`; // Display the hint for the current word
    userInput.value = ''; // Clear the input field
    feedbackMessage.textContent = ''; // Clear any previous feedback messages
    userInput.disabled = false; // Enable the input field
    submitBtn.disabled = false; // Enable the submit button
    resetTimer(); // Start or reset the timer for the new word
}

// Function to reset and start the countdown timer
function resetTimer() {
    clearInterval(timerInterval); // Clear any existing timer intervals
    timeLeft = 30; // Reset the timer to 15 seconds
    timerElement.textContent = `Time Left: ${timeLeft}s`; // Display the time left
    timerInterval = setInterval(() => { // Start the countdown timer
        timeLeft--; // Decrease the time left by 1 second
        timerElement.textContent = `Time Left: ${timeLeft}s`; // Update the display with the remaining time
        if (timeLeft <= 0) { // If time runs out
            clearInterval(timerInterval); // Stop the timer
            feedbackMessage.textContent = "Time's up! Try another word."; // Inform the user that time has run out
            userInput.disabled = true; // Disable the input field
            submitBtn.disabled = true; // Disable the submit button
        }
    }, 800); // Set the interval 800 milliseconds
}

// Event listener for the "Check Word" button
submitBtn.addEventListener('click', () => {
    const userGuess = userInput.value.toLowerCase().trim(); // Get the user's guess, convert to lowercase, and trim spaces
    attempts++; // Increment the number of attempts
    if (userGuess === currentWord.word) { // Check if the user's guess matches the correct word
        feedbackMessage.textContent = "Correct! You've unscrambled the word!"; // Provide positive feedback for a correct guess
        clearInterval(timerInterval); // Stop the timer
        userInput.disabled = true; // Disable the input field
        submitBtn.disabled = true; // Disable the submit button
    } else {
        feedbackMessage.textContent = "Incorrect guess. Try again!"; // Provide feedback for an incorrect guess
    }
});

// Event listener for the "Refresh Word" button
refreshBtn.addEventListener('click', startGame); // Start a new game with a different scrambled word

startGame(); // Initialize the first game when the page loads
