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

  countMatches(other) {
    const letters = [...this.#word];
    let matches = 0;

    [...other.#word].forEach((letter) => {
      const index = letters.indexOf(letter);
      if (index >= 0) {
        letters.splice(index, 1);
        matches++;
      }
    });

    return matches;
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

class Guesses {
  #guesses;
  #secretWord;

  constructor(secretWord) {
    this.#guesses = [];
    this.#secretWord = secretWord;
  }

  addGuess(guess) {
    this.#guesses.push(guess);
  }

  isRecentGuessCorrect() {
    const [recentGuess] = this.#guesses.slice(-1);
    return this.#secretWord.isEqual(recentGuess);
  }

  generateHints() {
    return this.#guesses.map((guess) => this.#secretWord.compare(guess));
  }
}

class Game {
  #guesses;
  #isGameOver;
  #attemptsLeft;
  #hasWon;

  constructor(guessChecker, attempts) {
    this.#guesses = guessChecker;
    this.#attemptsLeft = attempts;
    this.#isGameOver = false;
    this.#hasWon = false;
  }

  get isGameOver() {
    return this.#isGameOver;
  }

  registerGuess(guess) {
    this.#guesses.addGuess(guess);

    this.#attemptsLeft--;

    if (this.#guesses.isRecentGuessCorrect()) {
      console.log("correct guess");

      this.#isGameOver = true;
      this.#hasWon = true;
      return;
    }

    if (this.#attemptsLeft <= 0) {
      this.#isGameOver = true;
      this.#hasWon = false;
    }
  }

  #hasLost() {
    return this.#attemptsLeft === 0 && !this.#hasWon;
  }

  calculateScore() {
    return this.#hasLost() ? 0 : (this.#attemptsLeft + 1) * 10;
  }

  status() {
    return {
      isGameOver: this.#isGameOver,
      hints: this.#guesses.generateHints(),
      hasWon: this.#hasWon,
      attemptsLeft: this.#attemptsLeft,
    };
  }
}
