var board;
var playerX = "0";
var playerO = "1";
var currPlayer = playerO;
var gameOver = false;
let gameOverAudio = new Audio("gameover.mp3");

window.onload = function () {
  setGame();
};

function setGame() {
  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      let tile = document.createElement("div");
      tile.id = row.toString() + "-" + col.toString();
      tile.classList.add("tile");
      if (row == 0 || row == 1) {
        tile.classList.add("horizontal-line");
      }
      if (col == 0 || col == 1) {
        tile.classList.add("vertical-line");
      }
      tile.addEventListener("click", setTile);
      document.getElementById("board").append(tile);
    }
  }
}
function setTile() {
  if (gameOver) {
    return;
  }
  let coords = this.id.split("-"); //"1-1"->["1","1"]
  let row = parseInt(coords[0]);
  let col = parseInt(coords[1]);

  if (board[row][col] != " ") {
    return;
  }

  board[row][col] = currPlayer;
  this.innerText = currPlayer;

  if (currPlayer == playerO) {
    currPlayer = playerX;
  } else {
    currPlayer = playerO;
  }

  checkWinner();
}

function checkWinner() {
  //horizontally, check 3 rows
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] == board[row][1] &&
      board[row][1] == board[row][2] &&
      board[row][0] != " "
    ) {
      //if we found the winning row
      //apply the winner style to that row
      for (let i = 0; i < 3; i++) {
        let tile = document.getElementById(row.toString() + "-" + i.toString());
        tile.classList.add("winner");
      }
      gameOverAudio.play();
      gameOver = true;
      return;
    }
  }
  //vertically, check 3 columns
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] == board[1][col] &&
      board[1][col] == board[2][col] &&
      board[0][col] != " "
    ) {
      //if we found the winning col
      //apply the winner style to that col
      for (let i = 0; i < 3; i++) {
        let tile = document.getElementById(i.toString() + "-" + col.toString());
        tile.classList.add("winner");
      }
      gameOverAudio.play();
      gameOver = true;
      return;
    }
  }
  //diagonally
  if (
    board[0][0] == board[1][1] &&
    board[1][1] == board[2][2] &&
    board[0][0] != " "
  ) {
    for (let i = 0; i < 3; i++) {
      let tile = document.getElementById(i.toString() + "-" + i.toString());
      tile.classList.add("winner");
    }
    gameOverAudio.play();
    gameOver = true;
    return;
  }

  //anti-diagonally
  if (
    board[0][2] == board[1][1] &&
    board[1][1] == board[2][0] &&
    board[0][2] != " "
  ) {
    //0-2
    let tile = document.getElementById("0-2");
    tile.classList.add("winner");

    //1-1
    tile = document.getElementById("1-1");
    tile.classList.add("winner");

    //2-0
    tile = document.getElementById("2-0");
    tile.classList.add("winner");
    gameOverAudio.play();
    gameOver = true;
    return;
  }
}
