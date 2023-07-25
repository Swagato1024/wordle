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
  #gameRecord;

  constructor(game, gameRecord, inputController, view) {
    this.#game = game;
    this.#inputController = inputController;
    this.#view = view;
    this.#gameRecord = gameRecord;
  }

  #onGuess(userGuess) {
    const guess = new Word(userGuess);
    this.#game.registerGuess(guess);
    const stats = this.#game.status();

    this.#view.render(stats);
  }

  #onGameOver() {
    const score = this.#game.calculateScore();
    const { hasWon, secretWord } = this.#game.status();
    const gameStat = { score, secretWord, hasWon };
    this.#inputController.stop();
    this.#view.displaySummary(gameStat);
    this.#gameRecord.update(score, secretWord);
  }

  start() {
    const { score, secretWord } = this.#gameRecord.getPrevious();
    this.#view.displayPreviousRecord(score, secretWord);
    this.#inputController.onSubmit((userGuess) => {
      if (this.#game.isGameOver) return;
      this.#onGuess(userGuess);

      if (this.#game.isGameOver) this.#onGameOver();
    });
  }
}
