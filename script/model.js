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

    return {
      guess: other.#word,
      matches: Object.keys(matches).length,
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
    this.#secretWord.isEqual(recentGuess);
    console.log("equal");
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

  onGuess(guess) {
    this.#guessChecker.addGuess(guess);

    if (this.#guessChecker.isCorrectGuess()) {
      this.#isGameOver = true;
      this.#win = true;
      return;
    }

    if (this.#attemptsLeft <= 1) {
      this.#isGameOver = true;
      this.#win = false;
    }

    this.#attemptsLeft--;
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
