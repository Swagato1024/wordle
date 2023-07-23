const main = () => {
  const submitBtn = document.querySelector("#submit-btn");
  const guessBox = document.querySelector("#guess-box");
  const resultBox = document.querySelector(".result-container");

  const secretWord = new Word("tiger");
  const guesses = new GuessHandler(secretWord);
  const game = new Game(guesses);
  const view = new View(resultBox);

  const inputController = new InputController(guessBox, submitBtn);
  const gameController = new GameController(game, inputController, view);
  
  gameController.start();
};

window.onload = main;
