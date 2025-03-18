class Player {
  #name;
  #symbol;
  #choices;

  constructor(name, symbol) {
    this.#name = name;
    this.#symbol = symbol;
    this.#choices = new Set();
  }

  get symbol() {
    return this.#symbol;
  }

  get name() {
    return this.#name;
  }

  get choices() {
    return this.#choices;
  }

  addChoice(choice) {
    this.#choices.add(choice);
  }

  removeChoice(choice) {
    return this.#choices.delete(choice);
  }
}

class Players {
  #players;
  #currentPlayerId;

  constructor(players) {
    this.#players = players;
    this.#currentPlayerId = 0;
  }

  currentPlayer() {
    return this.#players[this.#currentPlayerId];
  }

  changeTurn() {
    this.#currentPlayerId = ++this.#currentPlayerId % this.#players.length;
  }

  nth(n) {
    return this.#players[n];
  }
}

class TicTacToe {
  #moves;
  #players;
  #canUndo = true;
  #winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  constructor(players) {
    this.#moves = new Array();
    this.#players = players;
  }

  isChoiceChosen(choice) {
    return this.#moves.includes(choice);
  }

  symbol(choice) {
    this.#moves.push(choice);
    this.#players.currentPlayer().addChoice(choice);
    this.#canUndo = true;
    return this.#players.currentPlayer().symbol;
  }

  changeTurn() {
    this.#players.changeTurn();
  }

  iswon() {
    return this.#winningCombinations.some((combination) =>
      combination.every((number) =>
        this.#players.currentPlayer().choices.has(number)
      )
    );
  }

  isDraw() {
    return this.#moves.length === 9;
  }

  undo() {
    if (!this.#canUndo) return null;
    const lastMove = this.#moves.pop();
    this.changeTurn();
    this.#players.currentPlayer().removeChoice(lastMove);
    this.#canUndo = false;
    return lastMove;
  }
}

const displayWonMsg = () => {
  alert("won");
};

const displayDrawMsg = () => {
  alert("draw");
};

const play = (event, game) => {
  const target = Number.parseInt(event.target.id);
  if (game.isChoiceChosen(target)) return;
  event.target.innerText = game.symbol(target);

  if (game.iswon()) {
    displayWonMsg();
    return;
  }

  if (game.isDraw()) {
    displayDrawMsg();
    return;
  }

  game.changeTurn();
};

const undoPass = (event, game, board) => {
  const lastChoice = game.undo();
  if (lastChoice === null) return;
  const cell = board.querySelector(`[id="${lastChoice}"]`);
  cell.innerText = "";
};

const startGame = () => {
  const player1 = new Player("KBT", "X");
  const player2 = new Player("TEJA", "O");
  const players = new Players([player1, player2]);
  const game = new TicTacToe(players);

  const board = document.querySelector(".board");
  const undoBtn = document.querySelector(".undo");
  console.log(undoBtn);

  board.addEventListener("click", (event) => play(event, game));
  undoBtn.addEventListener("click", (event) => undoPass(event, game, board));
};

window.onload = startGame;
