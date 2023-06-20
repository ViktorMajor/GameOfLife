const gameBoard = document.getElementById("game-board");

const area = 10;
let board = []; // A board változó most globális, ez tárolja a cellák állapotát

function setGame() {
  // Itt hozzuk létre a kezdeti állapotot, minden cella halott (false)
  for (let i = 0; i < area; i++) {
    board[i] = [];
    for (let j = 0; j < area; j++) {
      board[i][j] = false;
    }
  }
  console.log(board);
}

for (let c = 0; c < area; c++) {
  for (let r = 0; r < area; r++) {
    let cell = document.createElement("div"); 
    cell.id = c.toString() + "-" + r.toString(); 
    
    gameBoard.appendChild(cell);
    cell.className = "dead"; 
    cell.addEventListener("click", () => { 
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
  console.log(board);
}

setGame(); 
