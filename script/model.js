class Word {
  #word;

  constructor(letters) {
    this.#word = letters;
  }

  isEqual(other) {
    return this.#word === other.#word;
  }

  #generateFrequencyTable([...letters]) {
    const frequencies = {};
    letters.forEach(
      (letter) => (frequencies[letter] = (frequencies[letter] || 0) + 1)
    );

    return frequencies;
  }

  compare(other) {
    const frequencies1 = this.#generateFrequencyTable(this.#word);
    const frequencies2 = this.#generateFrequencyTable(other.#word);

    const matches = {};
    const keys = Object.keys(frequencies1);

    for (const key of keys) {
      if (key in frequencies2) {
        matches[key] = Math.min(frequencies1[key], frequencies2[key]);
      }
    }

    const noOfMatches = Object.values(matches).reduce(
      (sum, count) => sum + count,
      0
    );

    return {
      guess: other.#word,
      matches: noOfMatches,
    };
  }
}

class GuessHandler {
  #guesses;
  #secretWord;

  constructor(secretWord) {
    this.#guesses = [];
    this.#secretWord = secretWord;
  }

  addGuess(guess) {
    this.#guesses.push(guess);
  }

  isCorrectGuess() {
    const [recentGuess] = this.#guesses.slice(-1);
    return this.#secretWord.isEqual(recentGuess);
  }

  generateHints() {
    return this.#guesses.map((guess) => this.#secretWord.compare(guess));
  }
}

class Game {
  #guessChecker;
  #isGameOver;
  #attemptsLeft;
  #win;

  constructor(guessChecker, attempts) {
    this.#guessChecker = guessChecker;
    this.#attemptsLeft = attempts;
    this.#isGameOver = false;
    this.#win = false;
  }

  get isGameOver() {
    return this.#isGameOver;
  }

  registerGuess(guess) {
    this.#guessChecker.addGuess(guess);

    this.#attemptsLeft--;

    if (this.#guessChecker.isCorrectGuess()) {
      this.#isGameOver = true;
      this.#win = true;
      return;
    }

    if (this.#attemptsLeft <= 0) {
      this.#isGameOver = true;
      this.#win = false;
    }
  }

  status() {
    return {
      isGameOver: this.#isGameOver,
      hints: this.#guessChecker.generateHints(),
      win: this.#win,
      attemptsLeft: this.#attemptsLeft,
    };
  }
}
