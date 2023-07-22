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

class Game {
  #guesses;
  #secretWord;

  constructor(secretWord) {
    this.#guesses = [];
    this.#secretWord = secretWord;
  }

  addGuess(guess) {
    this.#guesses.push(guess);
  }

  #findMatches([...letters]) {
    let matches = [];

    letters.forEach((letter) => {
      if (this.#secretWord.includes(letter)) matches.push(letter);
    });

    return matches;
  }

  generateStat() {
    return this.#guesses.map((guess) => this.#findMatches(guess));
  }
}

const main = () => {
  const submitBtn = document.querySelector("#submit-btn");
  const guessBox = document.querySelector("#guess-box");
  const resultBox = document.querySelector(".result");

  const secretWord = "tiger";

  const game = new Game(secretWord);
  const view = new View(resultBox);

  submitBtn.onclick = () => {
    const userGuess = guessBox.value;
    game.addGuess(userGuess);
    const stats = game.generateStat();
    console.log(stats);
    // view.render(stats);
  };
};

window.onload = main;
