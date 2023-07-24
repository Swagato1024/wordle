const main = () => {
  const submitBtn = document.querySelector("#submit-btn");
  const guessBox = document.querySelector("#guess-box");
  const resultBox = document.querySelector(".result-container");

  const secretWord = new Word("rover");
  const guesses = new GuessHandler(secretWord);
  const game = new Game(guesses, 6);
  const view = new View(resultBox);

  const inputController = new InputController(guessBox, submitBtn);
  const gameController = new GameController(game, inputController, view);

  gameController.start();
};

window.onload = main;
