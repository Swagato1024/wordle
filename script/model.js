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

  isRecentGuessCorrect() {
    const [recentGuess] = this.#guesses.slice(-1);
    return this.#secretWord.isEqual(recentGuess);
  }

  generateHints() {
    return this.#guesses.map((guess) => {
      console.log(guess.value);

      const matches = this.#secretWord.countMatches(guess);
      return {
        guess: guess.value,
        matches,
      };
    });
  }
}

class Game {
  #guessHandler;
  #isGameOver;
  #attemptsLeft;
  #hasWon;

  constructor(guessChecker, attempts) {
    this.#guessHandler = guessChecker;
    this.#attemptsLeft = attempts;
    this.#isGameOver = false;
    this.#hasWon = false;
  }

  get isGameOver() {
    return this.#isGameOver;
  }

  registerGuess(guess) {
    this.#guessHandler.addGuess(guess);

    this.#attemptsLeft--;

    if (this.#guessHandler.isRecentGuessCorrect()) {
      this.#isGameOver = true;
      this.#hasWon = true;
      return;
    }

    if (this.#attemptsLeft <= 0) {
      this.#isGameOver = true;
      this.#hasWon = false;
    }
  }

  status() {
    return {
      isGameOver: this.#isGameOver,
      hints: this.#guessHandler.generateHints(),
      hasWon: this.#hasWon,
      attemptsLeft: this.#attemptsLeft,
    };
  }
}
