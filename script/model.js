class Word {
  #word;

  constructor(letters) {
    this.#word = letters;
  }

  get value() {
    return this.#word;
  }

  isEqual(other) {
    return this.#word === other.#word;
  }

  #compareLetter(letter, index) {
    const [isInCorrectSpot, isInWrongSpot] = [false, false];
    const stat = { letter, isInCorrectSpot, isInWrongSpot };

    if (this.#word[index] === letter) stat.isInCorrectSpot = true;
    else if (this.#word.includes(letter)) stat.isInWrongSpot = true;

    return stat;
  }

  compare(other) {
    return [...other.#word].map((letter, index) =>
      this.#compareLetter(letter, index)
    );
  }
}

class GameRecord {
  constructor() {}

  getPrevious() {
    return JSON.parse(localStorage.getItem("gameRecord"));
  }

  update(score, secretWord) {
    const gameRecord = { score, secretWord };

    localStorage.setItem("gameRecord", JSON.stringify(gameRecord));
  }
}

class Game {
  #secretWord;
  #guesses;
  #isGameOver;
  #attemptsLeft;
  #hasWon;

  constructor(secretWord, attempts) {
    this.#secretWord = secretWord;
    this.#guesses = [];
    this.#attemptsLeft = attempts;
    this.#isGameOver = false;
    this.#hasWon = false;
  }

  get isGameOver() {
    return this.#isGameOver;
  }

  registerGuess(guess) {
    this.#guesses.push(guess);
    this.#attemptsLeft--;

    if (this.#secretWord.isEqual(guess)) {
      this.#isGameOver = true;
      this.#hasWon = true;
      return;
    }

    this.#isGameOver = this.#attemptsLeft === 0;
  }

  #hasLost() {
    return this.#attemptsLeft === 0 && !this.#hasWon;
  }

  calculateScore() {
    return this.#hasLost() ? 0 : (this.#attemptsLeft + 1) * 10;
  }

  #generateHints() {
    return this.#guesses.map((guess) => this.#secretWord.compare(guess));
  }

  status() {
    return {
      isGameOver: this.#isGameOver,
      hints: this.#generateHints(),
      hasWon: this.#hasWon,
      attemptsLeft: this.#attemptsLeft,
      secretWord: this.#secretWord.value,
    };
  }
}
