// script.js
const rows = 6;
const cols = 7;
let board = Array.from({ length: rows }, () => Array(cols).fill(null));
let currentPlayer = 'red'; // Alternate between 'red' and 'yellow'
let isGameActive = true;

const gameBoard = document.getElementById('game-board');
const statusText = document.getElementById('status');

// Create the board
function createBoard() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', handleCellClick);
      gameBoard.appendChild(cell);
    }
  }
}

// Handle cell click
function handleCellClick(e) {
  if (!isGameActive) return;

  const col = e.target.dataset.col;
  const row = findEmptyRow(col);

  if (row !== null) {
    board[row][col] = currentPlayer;
    const cell = document.querySelector(
      `.cell[data-row='${row}'][data-col='${col}']`
    );
    cell.classList.add(currentPlayer);

    if (checkWin(row, col)) {
      statusText.textContent = `Player ${currentPlayer === 'red' ? 1 : 2} Wins!`;
      isGameActive = false;
      return;
    } else if (board.flat().every(cell => cell !== null)) {
      statusText.textContent = "It's a Draw!";
      isGameActive = false;
      return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    statusText.textContent = `Player ${
      currentPlayer === 'red' ? 1 : 2
    }'s Turn (${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)})`;
  }
}

// Find the lowest empty row in a column
function findEmptyRow(col) {
  for (let row = rows - 1; row >= 0; row--) {
    if (!board[row][col]) {
      return row;
    }
  }
  return null;
}

// Check for a win
function checkWin(row, col) {
  const directions = [
    { r: 0, c: 1 }, // Horizontal
    { r: 1, c: 0 }, // Vertical
    { r: 1, c: 1 }, // Diagonal \
    { r: 1, c: -1 } // Diagonal /
  ];

  const inBounds = (r, c) => r >= 0 && r < rows && c >= 0 && c < cols;

  for (const { r, c } of directions) {
    let count = 1;

    // Check in the positive direction
    for (let i = 1; i <= 3; i++) {
      const newRow = row + i * r;
      const newCol = col + i * c;
      if (inBounds(newRow, newCol) && board[newRow][newCol] === currentPlayer) {
        count++;
      } else {
        break;
      }
    }

    // Check in the negative direction
    for (let i = 1; i <= 3; i++) {
      const newRow = row - i * r;
      const newCol = col - i * c;
      if (inBounds(newRow, newCol) && board[newRow][newCol] === currentPlayer) {
        count++;
      } else {
        break;
      }
    }

    // If 4 or more in a row are found
    if (count >= 4) {
      return true;
    }
  }
  return false;
}

// Initialize the game
createBoard();