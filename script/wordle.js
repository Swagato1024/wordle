const displayResult = (resultBox, isCorrectGuess, isGameOver) => {
  let displayMsg = isCorrectGuess ? "Correct Guess" : "Wrong Guess";

  if (isGameOver) displayMsg += "\nGame Over";

  resultBox.innerText = displayMsg;
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

  //improve guess
  addGuess(guess) {
    this.#guesses.push(guess);
  }

  getRecentGuess() {
    const [lastGuess] = this.#guesses.slice(-1);
    return lastGuess;
  }
}

const main = () => {
  const submitBtn = document.querySelector("#submit-btn");
  const guessBox = document.querySelector("#guess-box");
  const resultBox = document.querySelector(".result");

  const secretWord = "TIGER";
  let noOfGuesses = 0;

  setUpGuessBox(guessBox);

  const player = new Player();

  submitBtn.onclick = () => {
    noOfGuesses++;
    const userGuess = guessBox.value;
    player.addGuess(userGuess);
    const recentGuess = player.getRecentGuess();

    const isCorrectGuess = recentGuess === secretWord;
    const isGameOver = isCorrectGuess || noOfGuesses === 2;

    displayResult(resultBox, isCorrectGuess, isGameOver);
  };
};

window.onload = main;
