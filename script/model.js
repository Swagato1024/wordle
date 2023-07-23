class Word {

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

  status() {
    return [{guess, inCorrectSpot, inWrongSpot}];
  }
}