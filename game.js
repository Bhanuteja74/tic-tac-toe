import { Player, Players } from "./js/players.js";
import { TicTacToe } from "./js/tic-tac-toe.js";

const displayWonMsg = () => {
  alert("won");
};

const displayDrawMsg = () => {
  alert("draw");
};

const play = (event, game) => {
  const isCellSelected = event.target.classList.contains("cell");
  const cellId = parseInt(event.target.id);
  if (!isCellSelected || game.isGameOver || game.isChoiceChosen(cellId)) return;
  event.target.innerText = game.symbol(cellId);

  if (game.hasWon()) {
    displayWonMsg();
    return;
  }

  if (game.isDraw()) {
    displayDrawMsg();
    return;
  }

  game.changeTurn();
};

const undoPass = (game, board) => {
  const lastChoice = game.undo();
  if (!lastChoice) return;
  const cell = board.querySelector(`[id="${lastChoice}"]`);
  cell.innerText = "";
};

const resetGame = (game, board) => {
  game.reset();
  board.querySelectorAll(".cell").forEach((cell) => (cell.innerText = ""));
};

const startGame = () => {
  const player1 = new Player("KBT", "X");
  const player2 = new Player("TEJA", "O");
  const players = new Players([player1, player2]);
  const game = new TicTacToe(players);

  const board = document.querySelector(".board");
  const undoBtn = document.querySelector(".undo");
  const restartBtn = document.querySelector(".restart");

  board.addEventListener("click", (event) => play(event, game));
  undoBtn.addEventListener("click", () => undoPass(game, board));
  restartBtn.addEventListener("click", () => resetGame(game, board));
};

window.onload = startGame;
