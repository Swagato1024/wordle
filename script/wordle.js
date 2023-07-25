const pickRandomWord = () => {
  const commonWords = [
    "faint",
    "tiger",
    "empty",
    "blame",
    "creep",
    "shift",
    "abuse",
  ];

  const randomIndex = Math.floor(Math.random() * commonWords.length);
  console.log(commonWords[randomIndex]);

  return new Word(commonWords[randomIndex]);
};

const createInputController = () => {
  const guessBox = document.querySelector("#guess-box");

  return new InputController(guessBox);
};

const createView = () => {
  const resultBox = document.querySelector(".result-container");
  const gameStat = document.querySelector("#game-stat");

  return new View(resultBox, gameStat);
};

const main = () => {
  const secretWord = pickRandomWord();

  const game = new Game(secretWord, 6);
  const view = createView();

  const inputController = createInputController();
  const gameController = new GameController(game, inputController, view);

  gameController.start();
};

window.onload = main;
