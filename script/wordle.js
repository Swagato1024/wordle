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

class View {
  #resultBox;

  constructor(resultBox) {
    this.#resultBox = resultBox;
  }

  #createLetter(stat) {
    const { guess, inCorrectSpot, inWrongSpot } = stat;

    const letter = document.createElement("span");
    letter.innerText = guess;

    if (inCorrectSpot) letter.style.color = "green";
    else if (inWrongSpot) letter.style.color = "yellow";
    else letter.style.color = "red";

    console.log(letter);

    return letter;
  }

  #createWord(stats) {
    const letters = stats.map((stat) => this.#createLetter(stat));
    const word = document.createElement("p");

    word.append(...letters);
    return word;
  }

  #removeChildren() {
    Array.from(this.#resultBox.children).forEach((child) =>
      this.#resultBox.removeChild(child)
    );
  }

  render(stats) {
    this.#removeChildren();
    const words = stats.map((stat) => this.#createWord(stat));
    this.#resultBox.append(...words);
  }
}

class Game {
  #guesses;
  #secretWord;

  constructor(secretWord) {
    this.#guesses = [];
    this.#secretWord = [...secretWord];
  }

  addGuess(guess) {
    this.#guesses.push([...guess]);
  }

  #statForLetter(letter, index) {
    const [guess, inCorrectSpot, inWrongSpot] = [letter, false, false];

    const stat = { guess, inCorrectSpot, inWrongSpot };

    if (guess === this.#secretWord[index]) stat.inCorrectSpot = true;
    else if (this.#secretWord.includes(guess)) stat.inWrongSpot = true;

    return stat;
  }

  #statForWord(letters) {
    return letters.map((letter, index) => this.#statForLetter(letter, index));
  }

  generateStats() {
    return this.#guesses.map((guess) => this.#statForWord(guess));
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
    const stats = game.generateStats();

    view.render(stats);
  };
};

window.onload = main;
