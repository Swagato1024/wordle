class View {
  #resultBox;

  constructor(resultBox) {
    this.#resultBox = resultBox;
  }

  #createLetter(stat) {
    const { guess, inCorrectSpot, inWrongSpot } = stat;

    const letter = document.createElement("div");
    letter.innerText = guess;

    letter.classList.add("tile");

    if (inCorrectSpot) letter.classList.add("correct-guess");
    else if (inWrongSpot) letter.classList.add("letter-present");
    else letter.classList.add("absent");

    return letter;
  }

  #createWord(stats) {
    const letters = stats.map((stat) => this.#createLetter(stat));
    const word = document.createElement("div");
    word.classList.add("row");

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
