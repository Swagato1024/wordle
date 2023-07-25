class View {
  #resultBox;
  #gameStat;
  #previousRecord;

  constructor(resultBox, gameStat, previousRecord) {
    this.#resultBox = resultBox;
    this.#gameStat = gameStat;
    this.#previousRecord = previousRecord;
  }

  displayPreviousRecord(record) {
    const { score, secretWord } = record;
    this.#previousRecord.innerText = `last ans: ${secretWord}  score: ${score}`;
  }

  #removeChildren() {
    Array.from(this.#resultBox.children).forEach((child) =>
      this.#resultBox.removeChild(child)
    );
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

  #createBlankRow() {
    const blankRow = document.createElement("div");

    new Array(5).fill().forEach((_) => {
      const blank = document.createElement("div");
      blank.classList.add("empty-tile");
      blankRow.append(blank);
    });

    blankRow.classList.add("row");
    return blankRow;
  }

  #createBlanks(count) {
    return new Array(count).fill().map((_) => this.#createBlankRow());
  }

  #createWord(stats) {
    const letters = stats.map((stat) => this.#createLetter(stat));
    const word = document.createElement("div");
    word.classList.add("row");
    word.append(...letters);

    return word;
  }

  #createRows(stats) {
    const words = stats.hints.map((stat) => this.#createWord(stat));
    const blanks = this.#createBlanks(stats.attemptsLeft);

    return [...words, ...blanks];
  }

  displayBlankRows() {
    const blanks = this.#createBlanks(6);
    this.#resultBox.append(...blanks);
  }

  render(stats) {
    this.#removeChildren();
    const rows = this.#createRows(stats);

    this.#resultBox.append(...rows);
  }

  #createGameOverMsg({ hasWon, secretWord }) {
    localStorage.setItem("secret-word", secretWord);

    const msg = hasWon ? "Congratulations!!" : `secret word: ${secretWord}`;
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
}
