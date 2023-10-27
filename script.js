// Getting references to various DOM elements
let gameBoard = document.getElementById("game-board");
let stepsSlider = document.getElementById("steps");
let intervalSlider = document.getElementById("interval");
let stepsValueLabel = document.getElementById("stepsValue");
let intervalValueLabel = document.getElementById("intervalValue");
let intervalIDs = [];

// Update the steps label when the steps slider is moved
stepsSlider.oninput = function () {
  stepsValueLabel.innerText = this.value;
};

// Update the interval label when the interval slider is moved
intervalSlider.oninput = function () {
  intervalValueLabel.innerText = this.value;
};

const area = 40; // Define the size of the game area
let board = []; // Create a 2D array to represent the game board

// Initialize the game board with all dead cells
function setGame() {
  for (let i = 0; i < area; i++) {
    board[i] = [];
    for (let j = 0; j < area; j++) {
      board[i][j] = false;
    }
  }
}

// Create a visual representation of the board in the DOM
for (let c = 0; c < area; c++) {
  for (let r = 0; r < area; r++) {
    let cell = document.createElement("div");
    cell.id = c.toString() + "-" + r.toString();
    gameBoard.appendChild(cell);
    cell.className = "dead";

    // Add click event listener to toggle cell state (alive/dead)
    cell.addEventListener("mousedown", () => {
      cell.classList.toggle("alive");
      let life = cell.classList.contains("alive") ? true : false;
      updateCell(cell.id, life);
    });
  }
}

// Update the cell's state in the board array
function updateCell(id, life) {
  let coordinates = id.split("-");
  let i = parseInt(coordinates[0]);
  let j = parseInt(coordinates[1]);
  board[i][j] = life;
}

let nextBoard = []; // Create a 2D array to represent the next state of the game board

// Initialize the nextBoard with all dead cells
function createNextBoard() {
  for (let i = 0; i < area; i++) {
    nextBoard[i] = [];
    for (let j = 0; j < area; j++) {
      nextBoard[i][j] = false;
    }
  }
}

// Update the visual board based on the state in the board array
function updateBoard() {
  for (let i = 0; i < area; i++) {
    for (let j = 0; j < area; j++) {
      let cell = document.getElementById(i.toString() + "-" + j.toString());
      if (board[i][j]) {
        cell.classList.add("alive");
      } else {
        cell.classList.remove("alive");
      }
    }
  }
}

// Count the number of live neighbors for a given cell
function countNeighbors(i, j) {
  let count = 0;
  for (let x = Math.max(i - 1, 0); x <= Math.min(i + 1, area - 1); x++) {
    for (let y = Math.max(j - 1, 0); y <= Math.min(j + 1, area - 1); y++) {
      if (x !== i || y !== j) {
        if (board[x][y] === true) {
          count++;
        }
      }
    }
  }
  return count;
}

// Calculate the next state of the board based on the current state
function nextStep() {
  createNextBoard();
  for (let i = 0; i < area; i++) {
    for (let j = 0; j < area; j++) {
      let count = countNeighbors(i, j);

      if (board[i][j] === true && (count === 2 || count === 3)) {
        nextBoard[i][j] = true;
      } else if (board[i][j] === false && count === 3) {
        nextBoard[i][j] = true;
      } else {
        nextBoard[i][j] = false;
      }
    }
  }
  board = JSON.parse(JSON.stringify(nextBoard));
  updateBoard();
}

// Clear the game board
function clearBoard() {
  stop();
  setGame();
  updateBoard();
}

// Add a predefined shape to the game board
function addShape(shape) {
  clearBoard();
  let startX = Math.floor(area / 2) - Math.floor(shape.length / 2);
  let startY = Math.floor(area / 2) - Math.floor(shape[0].length / 2);

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j] === 1) {
        board[startX + i][startY + j] = true;
      }
    }
  }
  updateBoard();
}

// A function that starts the game simulation

let shapes = {
  glider: [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
  ],
  lwss: [
    [0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  tumbler: [
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 1, 0],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
  ],
  beacon: [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 1, 1],
    [0, 0, 1, 1],
  ],
  pentadecathlon: [
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  acorn: [
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [1, 1, 0, 0, 1, 1, 1],
  ],
  figureeight: [
    [0, 1, 1, 0, 0, 1, 1, 0],
    [0, 1, 0, 1, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 1, 1, 0, 1, 0],
    [0, 1, 1, 0, 0, 1, 1, 0],
  ],
  twoprehasslers: [
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  ],
  p26prepulsarshuttle: [
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  ],
  merzenichp31: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
};

function play() {
  stop();
  let steps = parseInt(stepsSlider.value);
  let interval = parseInt(intervalSlider.value);
  for (let i = 0; i < steps; i++) {
    intervalIDs.push(setTimeout(nextStep, i * interval));
  }
}

function stop() {
  while (intervalIDs.length > 0) {
    clearTimeout(intervalIDs.pop());
  }
}
setGame();