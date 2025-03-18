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

  getPlayer(n) {
    return this.#players[n];
  }

  resetChoices() {
    this.#currentPlayerId = 0;
    this.#players.forEach((player) => player.choices.clear());
  }
}

export { Player, Players };
