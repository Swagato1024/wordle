const main = () => {
  const submitBtn = document.querySelector("#submit-btn");
  const guessBox = document.querySelector("#guess-box");
  const resultBox = document.querySelector(".result-container");

  const secretWord = new Word("tiger");
  const guesses = new GuessHandler(secretWord);
  const game = new Game(guesses);
  const view = new View(resultBox);
  let attempt = 0;

  submitBtn.onclick = () => {
    if (attempt === 2) return;

    const userGuess = guessBox.value;
    attempt++;

    game.onGuess(new Word(userGuess));
    const stats = game.status();

    view.display(stats);
  };
};

window.onload = main;
