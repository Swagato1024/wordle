class View {
  #resultBox;

  constructor(resultBox) {
    this.#resultBox = resultBox;
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
    this.#resultBox.append(...words);
  }

  #createGameOverMsg({ hasWon }) {
    const winningMessage = "Correct Guess";
    const losingMessage = "Try again";

    const [gameOverMsg, msgColor] = hasWon
      ? [winningMessage, "green"]
      : [losingMessage, "red"];

    const p = document.createElement("p");
    p.style.color = msgColor;
    p.innerText = gameOverMsg;

    return p;
  }
}
