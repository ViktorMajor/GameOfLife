const gameBoard = document.getElementById("game-board");

const area = 60;
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
      } else if (board[i][j] === false && count === 3 ) {
        nextBoard[i][j] = true;
      } else {
        nextBoard[i][j] = false;
      }
    }
  }
  board = JSON.parse(JSON.stringify(nextBoard)); 
  updateBoard(); 
}
function addPattern(board, pattern, offsetX, offsetY) {
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      board[i + offsetX][j + offsetY] = pattern[i][j];
    }
  }
}

function addPattern(board, pattern, offsetX, offsetY) {
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      board[i + offsetX][j + offsetY] = pattern[i][j];
    }
  }
}

function play(){
  for (let i = 0; i < 40; i++){
    setTimeout(() => {
      nextStep()
    }, 300 * i);
}

 
}

setGame();
