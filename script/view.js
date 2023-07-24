class View {
  #resultBox;
  #attemptsLeft;

  constructor(resultBox, attemptsLeft) {
    this.#resultBox = resultBox;
    this.#attemptsLeft = attemptsLeft;
  }

  #createLetter(stat) {
    const { letter, isInCorrectSpot, isInWrongSpot } = stat;

    const letterElement = document.createElement("div");
    letterElement.innerText = letter;

    letterElement.classList.add("tile");

    if (isInCorrectSpot) letterElement.classList.add("correct-guess");
    else if (isInWrongSpot) letterElement.classList.add("letter-present");
    else letterElement.classList.add("absent");

    return letterElement;
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
    const words = stats.hints.map((stat) => this.#createWord(stat));
    this.#attemptsLeft.innerText = `Attempts left: ${stats.attemptsLeft}`;

    this.#resultBox.append(...words);
  }

  showScore(score) {
    console.log(this.#attemptsLeft.innerText);

    this.#attemptsLeft.innerText = "";
    const scoreElement = document.createElement("div");
    scoreElement.innerText = `Your Score: ${score}`;

    this.#resultBox.appendChild(scoreElement);
  }
}
