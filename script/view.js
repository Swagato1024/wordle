class View {
  #resultBox;
  #gameStat;
  #previousRecord;

  constructor(resultBox, gameStat, previousRecord) {
    this.#resultBox = resultBox;
    this.#gameStat = gameStat;
    this.#previousRecord = previousRecord;
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
    this.#gameStat.innerText = `Attempts left: ${stats.attemptsLeft}`;

    this.#resultBox.append(...words);
  }

  #createGameOverMsg({ hasWon, secretWord }) {
    localStorage.setItem("secret-word", secretWord);

    const msg = hasWon ? "Congratulation!!" : `Secret word: ${secretWord}`;
    const div = document.createElement("div");
    div.innerText = msg;

    return div;
  }

  displaySummary(gameStat) {
    this.#gameStat.innerText = "";
    const gameOverMsg = this.#createGameOverMsg(gameStat);
    const scoreElement = document.createElement("div");
    scoreElement.innerText = `Your Score: ${gameStat.score}`;

    this.#gameStat.append(gameOverMsg, scoreElement);
  }

  displayPreviousRecord(record) {
    const { score, secretWord } = record;
    this.#previousRecord.innerText = `secret word: ${secretWord} \n score: ${score}`;
  }
}
