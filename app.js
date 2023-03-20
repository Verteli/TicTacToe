const board = document.querySelector(".board");

const gameState = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  currentPlayer: "x",
  issinglePlayer: true,
};

let playerX = "x";
let playerO = "o";

let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const player1Name = e.target[0].value;
  const player2Name = e.target[1].value;
  let name1 = document.getElementById("player1Displayed");
  let name2 = document.getElementById("player2Displayed");
  name1.innerText = `${player1Name} is Player X`;
  name2.innerText = `${player2Name} is Player O`;
  gameState.issinglePlayer = false;
  startGame();
});

const singlePlayer = document.getElementById("single");

singlePlayer.addEventListener("submit", (e) => {
  e.preventDefault();
  const playerName = e.target[0].value;
  const computer = e.target[1].value;
  let name1 = document.getElementById("player1Displayed");
  let name2 = document.getElementById("player2Displayed");
  name1.innerText = `${playerName} is Player X`;
  name2.innerText = `Computer is Player O`;

  gameState.issinglePlayer = true;
  startGame();
});

const winningForms = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
  [[0.0], [1, 0], [2, 0]],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
];

function winningPattern() {
  let hasWon = false;
  for (i = 0; i < winningForms.length; i++) {
    let winningForm = winningForms[i];

    let position1 = gameState.board[winningForm[0][0]][winningForm[0][1]];
    let position2 = gameState.board[winningForm[1][0]][winningForm[1][1]];
    let position3 = gameState.board[winningForm[2][0]][winningForm[2][1]];

    if (
      playerX === position1 &&
      playerX === position2 &&
      playerX === position3
    ) {
      alert("Tic Tac Toe That's 3 in a row!!! Player(X) is the winner");
      hasWon = true;
    }

    if (
      playerO === position1 &&
      playerO === position2 &&
      playerO === position3
    ) {
      alert("Tic Tac Toe That's 3 in a row!!! Player(O) is the winner");
      hasWon = true;
    }
  }
  if (!hasWon) {
    let counter = 0;
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        if (gameState.board[i][j] === null) {
          counter++;
        }
      }
    }
    if (counter === 0) {
      alert("IT'S A DRAW!!!");
    }
  }
}

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = `${i}-${j}`;
    board.append(cell);
  }
}

board.addEventListener("click", (e) => {
  const row = e.target.id[0];
  const col = e.target.id[2];
  if (gameState.board[row][col] === null) {
    gameState.board[row][col] = gameState.currentPlayer;

    console.log("Game State: ", gameState);

    renderBoard();
    switchPlayes();
    winningPattern();
    if (gameState.issinglePlayer) {
      setRandom();
      renderBoard();
      switchPlayes();
      winningPattern();
    }
  }
});

function setRandom() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameState.board[i][j] === null) {
        gameState.board[i][j] = gameState.currentPlayer;
        return;
      }
    }
  }
}

function renderBoard() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.getElementById(`${i}-${j}`);
      cell.innerText = gameState.board[i][j];
    }
  }
}

function switchPlayes() {
  if (gameState.currentPlayer === "x") {
    gameState.currentPlayer = "o";
  } else {
    gameState.currentPlayer = "x";
  }
}

const restartButton = document.getElementById("restartButton");

startGame();
restartButton.addEventListener("click", startGame);

function startGame() {
  gameState.board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  renderBoard();
  gameState.currentPlayer = "x";
}
