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

  #countMatches(letterCountsInSecret, letterCountsInGuessed) {
    const distincLetters = Object.keys(letterCountsInGuessed);
    const matches = {};

    console.log(distincLetters);

    distincLetters.forEach((letter) => {
      if (letter in letterCountsInSecret) {
        matches[letter] = Math.min(
          letterCountsInSecret[letter],
          letterCountsInGuessed[letter]
        );
      }
    });

    return Object.values(matches).reduce((total, count) => total + count, 0);
  }

  compare(other) {
    const letterCountsInSecret = this.#generateFrequencyTable(this.#word);
    const letterCountsInGuessed = this.#generateFrequencyTable(other.#word);

    const noOfMatches = this.#countMatches(
      letterCountsInSecret,
      letterCountsInGuessed
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
  #guessHandler;
  #isGameOver;
  #attemptsLeft;
  #win;

  constructor(guessChecker, attempts) {
    this.#guessHandler = guessChecker;
    this.#attemptsLeft = attempts;
    this.#isGameOver = false;
    this.#win = false;
  }

  get isGameOver() {
    return this.#isGameOver;
  }

  registerGuess(guess) {
    this.#guessHandler.addGuess(guess);

    this.#attemptsLeft--;

    if (this.#guessHandler.isCorrectGuess()) {
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
      hints: this.#guessHandler.generateHints(),
      win: this.#win,
      attemptsLeft: this.#attemptsLeft,
    };
  }
}
