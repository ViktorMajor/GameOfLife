



let gameBoard = document.getElementById("game-board");
let stepsSlider = document.getElementById("steps");
let intervalSlider = document.getElementById("interval");
let stepsValueLabel = document.getElementById("stepsValue");
let intervalValueLabel = document.getElementById("intervalValue");
let intervalIDs = [];

stepsSlider.oninput = function () {
  stepsValueLabel.innerText = this.value;
};

intervalSlider.oninput = function () {
  intervalValueLabel.innerText = this.value;
};

const area = 30;
let board = [];

function setGame() {
  for (let i = 0; i < area; i++) {
    board[i] = [];
    for (let j = 0; j < area; j++) {
      board[i][j] = false;
    }
  }
}

for (let c = 0; c < area; c++) {
  for (let r = 0; r < area; r++) {
    let cell = document.createElement("div");
    cell.id = c.toString() + "-" + r.toString();

    gameBoard.appendChild(cell);
    cell.className = "dead";

    cell.addEventListener("mousedown", () => {
      cell.classList.toggle("alive");
      let life = cell.classList.contains("alive") ? true : false;
      updateCell(cell.id, life);
    });
  }
}

function updateCell(id, life) {
  let coordinates = id.split("-");
  let i = parseInt(coordinates[0]);
  let j = parseInt(coordinates[1]);

  board[i][j] = life;
}
let nextBoard = [];
function createNextBoard() {
  for (let i = 0; i < area; i++) {
    nextBoard[i] = [];
    for (let j = 0; j < area; j++) {
      nextBoard[i][j] = false;
    }
  }
}

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

function clearBoard() {
  stop();
  setGame();
  updateBoard();
}

function addShape(shape) {
  clearBoard()
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


let shapes = {
  glider: [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1]
  ],
  lwss: [
    [0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0]
  ],
  tumbler: [
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 1, 0],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 1]
  ],
  beacon: [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 1, 1],
    [0, 0, 1, 1]
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
    [0, 1, 1, 0, 0, 1, 1, 0]
  ],
  twoprehasslers: [
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1]
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
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
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
  ]
};





function play() {
  stop();
  let steps = parseInt(stepsSlider.value);
  let interval = parseInt(intervalSlider.value);
  for (let i = 0; i < steps; i++) {
    let intervalID = setTimeout(() => {
      nextStep();
    }, interval * i);
    intervalIDs.push(intervalID);
  }
}

function stop() {
  while (intervalIDs.length > 0) {
    clearTimeout(intervalIDs.pop());
  }
}

setGame();