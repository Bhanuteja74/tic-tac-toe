class TicTacToe {
  #moves;
  #players;
  #undoAvailable = true;
  #isGameOver = false;
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
    this.#moves = [];
    this.#players = players;
  }

  isChoiceChosen(choice) {
    return this.#moves.includes(choice);
  }

  symbol(choice) {
    this.#moves.push(choice);
    this.#players.currentPlayer().addChoice(choice);
    this.#undoAvailable = true;
    return this.#players.currentPlayer().symbol;
  }

  changeTurn() {
    this.#players.changeTurn();
  }

  get isGameOver() {
    return this.#isGameOver;
  }

  hasWon() {
    const won = this.#winningCombinations.some((combination) =>
      combination.every((number) =>
        this.#players.currentPlayer().choices.has(number)
      )
    );
    if (won) {
      this.#undoAvailable = false;
      this.#isGameOver = true;
    }
    return won;
  }

  isDraw() {
    const draw = this.#moves.length === 9;
    if (draw) {
      this.#undoAvailable = false;
      this.#isGameOver = true;
    }
    return draw;
  }

  undo() {
    if (!this.#undoAvailable) return null;

    const lastMove = this.#moves.pop();
    this.changeTurn();
    this.#players.currentPlayer().removeChoice(lastMove);
    this.#undoAvailable = false;
    return lastMove;
  }

  reset() {
    this.#moves = [];
    this.#isGameOver = false;
    this.#players.resetChoices();
  }
}

export { TicTacToe };
