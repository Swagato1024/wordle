class InputController {
  #guessBox;

  constructor(guessBox) {
    this.#guessBox = guessBox;
  }

  onSubmit(verifyGuess) {
    this.#guessBox.addEventListener("keydown", (event) => {
      if (!(event.key === "Enter")) return;

      const userGuess = this.#guessBox.value;
      if (userGuess.length < 5) return;

      this.#guessBox.value = "";
      this.#guessBox.focus();

      verifyGuess(userGuess);
    });
  }

  stop() {
    //hide guess box
  }
}

class GameController {
  #game;
  #inputController;
  #view;

  constructor(game, inputController, view) {
    this.#game = game;
    this.#inputController = inputController;
    this.#view = view;
  }

  #onGuess(userGuess) {
    const guess = new Word(userGuess);
    this.#game.registerGuess(guess);
    const stats = this.#game.status();

    this.#view.render(stats);
  }

  #onGameOver() {
    const score = this.#game.calculateScore();
    const stats = this.#game.status();

    const gameStat = {
      score,
      secretWord: this.#game.correctWord,
      hasWon: stats.hasWon,
    };

    this.#inputController.stop();
    this.#view.displaySummary(gameStat);
  }

  start() {
    this.#inputController.onSubmit((userGuess) => {
      if (this.#game.isGameOver) return;
      this.#onGuess(userGuess);

      if (this.#game.isGameOver) this.#onGameOver();
    });
  }
}
