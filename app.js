/**********************************************
 * File: app.js
 * Description: A simple Tic-Tac-Toe game
 * Author: Lejla Lukacevic
 **********************************************/

// Select the status display element from the DOM.
// We'll use this to display messages to the user.
const statusDisplay = document.querySelector(".game--status");

// Set initial game state values
let gameActive = true; // This keeps track of whether the game is active or has ended
let currentPlayer = "X"; // This tracks whose turn it currently is
let gameState = ["", "", "", "", "", "", "", "", ""]; // Represents the 9 cells in the game board

// A function to return the current player's turn message
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Display the initial status message in the DOM
statusDisplay.innerHTML = currentPlayerTurn();

// Define the possible winning conditions for Tic-Tac-Toe
// Each array within this array represents a set of indices in 'gameState'
// that forms a winning line
const winningConditions = [
  [0,1,2],//rows
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],//columns
  [0,4,8],
  [2,4,6]//diagonals
];

/**
 * handleCellPlayed
 * ----------------
 * Updates the gameState array and the clicked cell with the current player's symbol.
 * @param {HTMLElement} clickedCell - The cell that was clicked in the UI.
 * @param {number} clickedCellIndex - The index of the clicked cell in the gameState.
 */
function handleCellPlayed(clickedCell, clickedCellIndex) {
  // Update the game state to reflect the move
  gameState[clickedCellIndex] = currentPlayer;
  // Display the current player's symbol in the clicked cell
  clickedCell.innerHTML = currentPlayer;
}

/**
 * handlePlayerChange
 * ------------------
 * Switches the active player from X to O or O to X.
 * Also updates the UI text to notify whose turn it is.
 */
function handlePlayerChange() {
  // Toggle the current player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  // Update the status text to reflect the new player's turn
  statusDisplay.innerHTML = currentPlayerTurn();
}

/**
 * handleResultValidation
 * ----------------------
 * Checks if the current move caused a win or a draw.
 * If a win, display a win message and end the game.
 * If a draw, display a draw message and end the game.
 * Otherwise, switch players.
 */
function handleResultValidation() {
  let roundWon = false;

  // Iterate through each winning condition
for(let i=0;i<=7;i++){
  const winCondition=winningConditions[i];
  const a=gameState[winCondition[0]];
  const b=gameState[winCondition[1]];
  const c=gameState[winCondition[2]];
  if(a===b && b===c && a!==""){
    roundWon=true;
    break;
  }
}
if(roundWon){
  statusDisplay.innerHTML = "Player " + currentPlayer + " wins";
  gameActive=false;
  return;
}
let roundDraw = !gameState.includes("");
if (roundDraw) {
  statusDisplay.innerHTML = "Game is a draw";
  gameActive=false;
  return;
}
  // Destructure the three cell indices that form a potential win

  // If any cell is empty, skip this iteration

  // Check if these three positions match, indicating a win

  // If the round is won, display the winner and end the game

  // If there are no empty cells in 'gameState', it's a draw

  // If the game is neither won nor drawn, switch to the next player
  handlePlayerChange();
}

/**
 * handleCellClick
 * ---------------
 * This function is triggered whenever a cell in the board is clicked.
 * It determines which cell was clicked, checks if that cell is already used
 * or if the game is inactive, and if valid, calls the functions to update the game state.
 * @param {Event} clickedCellEvent - The click event on one of the cells.
 */
function handleCellClick(clickedCellEvent) {
  // The clicked cell element
  const clickedCell = clickedCellEvent.target;
  // The index of the cell based on its data attribute
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  // If the cell is already filled or the game is not active, don't do anything
if(gameState[clickedCellIndex] !== "" || !gameActive) {
  return;
}
  // Otherwise, handle the cell being played and validate results
handleCellPlayed(clickedCell, clickedCellIndex);
handleResultValidation();
}

/**
 * handleRestartGame
 * -----------------
 * Resets the game to its initial state:
 *  - Clears the board
 *  - Resets the 'gameState' array
 *  - Reactivates the game
 *  - Sets the current player to X
 *  - Updates the status display
 */
function handleRestartGame() {
  // Reset gameActive to true
  gameActive = true;
  // Set currentPlayer back to "X"
  currentPlayer = "X";
  // Clear gameState: ["", "", "", "", "", "", "", "", ""]
  gameState = ["", "", "", "", "", "", "", "", ""];
  // Clear the visual board (i.e., any DOM cells get their content reset to an empty string)
  document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");
  // Update the status message to "It's X's turn"
  statusDisplay.innerHTML = currentPlayerTurn();
}

// Add event listeners to each cell for a click event
document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", handleCellClick));

// Add event listener to the restart button
document.querySelector(".game--restart").addEventListener("click", handleRestartGame);