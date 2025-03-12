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
}

const displayWonMsg = () => {
  alert("won");
};

const displayDrawMsg = () => {
  alert("draw");
};

const startGame = () => {
  const player1 = new Player("KBT", "X");
  const player2 = new Player("TEJA", "O");
  const players = new Players([player1, player2]);
  const game = new TicTacToe(players);

  const board = document.querySelector(".board");

  board.addEventListener("click", (event) => {
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
  });
};

window.onload = startGame;
