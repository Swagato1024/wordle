const displayResult = (resultBox, result) => {
  resultBox.innerText = `${result} Guess`;
};

const setUpGuessBox = (guessBox) => {
  guessBox.oninput = () => {
    if (guessBox.value.length === 5) {
      guessBox.disabled = true;
    }
  };
};

class Player {
  #guesses;

  constructor() {
    this.#guesses = [];
  }
}

class View {
  #resultBox;

  constructor(resultBox) {
    this.#resultBox = resultBox;
  }
}

class GameController {
  #player;
  #view;
  #secretWord;

  constructor(player, view) {
    this.#player = player;
    this.#view = view;
  }
}

const main = () => {
  const submitBtn = document.querySelector("#submit-btn");
  const guessBox = document.querySelector("#guess-box");
  const resultBox = document.querySelector(".result");

  const secretWord = "TIGER";

  setUpGuessBox(guessBox);

  const player = new Player();
  const view = new View(resultBox);

  const gameController = new GameController(player, view);

  submitBtn.onclick = () => {
    const userGuess = guessBox.value;
    const result = userGuess === secretWord ? "Correct" : "Incorrect";

    displayResult(resultBox, result);
  };
};

window.onload = main;
