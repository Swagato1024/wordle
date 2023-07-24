class Word {
  #word;

  constructor(letters) {
    this.#word = letters;
  }

  isEqual(other) {
    return this.#word === other.#word;
  }

  compare(other) {
    const guessedLetters = new Set([...other.#word]);
    const secretLetters = new Set([...this.#word]);

    const matchedLetters = [...guessedLetters].filter((letter) =>
      secretLetters.has(letter)
    );

    return {
      guess: other.#word,
      matches: matchedLetters.length,
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
