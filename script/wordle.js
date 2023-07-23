const main = () => {
  const submitBtn = document.querySelector("#submit-btn");
  const guessBox = document.querySelector("#guess-box");
  const resultBox = document.querySelector(".result-container");

  const secretWord = "tiger";

  const game = new Game(secretWord);
  const view = new View(resultBox);
  let attempt = 0;

  submitBtn.onclick = () => {
    if (attempt === 2) return;

    const userGuess = guessBox.value;
    attempt++;
    game.addGuess(userGuess);
    const stats = game.generateStats();

    view.render(stats);
  };
};

window.onload = main;
