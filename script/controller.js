class InputController {
  #guessBox;
  #submitBtn;

  constructor(guessBox, submitBtn) {
    this.#guessBox = guessBox;
    this.#submitBtn = submitBtn;
  }

  onSubmit(verifyGuess) {
    this.#submitBtn.onclick = () => {
      const userGuess = this.#guessBox.value;
      this.#guessBox.value = "";
      this.#guessBox.focus();

      verifyGuess(userGuess);
    };
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

  start() {
    this.#inputController.onSubmit((userGuess) => {
      if (this.#game.isGameOver) return;

      const guess = new Word(userGuess);
      this.#game.registerGuess(guess);
      const stats = this.#game.status();
      this.#view.render(stats);

      if (this.#game.isGameOver) {
        const score = this.#game.calculateScore();
        const summary = {
          score,
          secretWord: this.#game.correctWord,
          hasWon: stats.hasWon,
        };

        this.#view.displaySummary(summary);
      }
    });
  }
}
