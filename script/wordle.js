const main = () => {
  const submitBtn = document.querySelector("#submit-btn");
  const guessBox = document.querySelector("#guess-box");
  const resultBox = document.querySelector(".result-container");
  const attemptsLeft = document.querySelector("#attempt-left");

  const secretWord = new Word("rover");
  const guesses = new Guesses(secretWord);
  const game = new Game(guesses, 6);
  const view = new View(resultBox, attemptsLeft);

  const inputController = new InputController(guessBox, submitBtn);
  const gameController = new GameController(game, inputController, view);

  gameController.start();
};

window.onload = main;
