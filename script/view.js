class View {
  #resultBox;
  #summary;

  constructor(resultBox, summary) {
    this.#resultBox = resultBox;
    this.#summary = summary;
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
    this.#summary.innerText = `Attempts left: ${stats.attemptsLeft}`;

    this.#resultBox.append(...words);
  }

  #createGameOverMsg({ hasWon, secretWord }) {
    const msg = hasWon ? "Congratulation!!" : `Secret word: ${secretWord}`;
    const div = document.createElement("div");
    div.innerText = msg;

    return div;
  }

  displaySummary(summary) {
    this.#summary.innerText = "";
    const gameOverMsg = this.#createGameOverMsg(summary);
    const scoreElement = document.createElement("div");
    scoreElement.innerText = `Your Score: ${summary.score}`;

    this.#summary.append(gameOverMsg, scoreElement);
  }
}
