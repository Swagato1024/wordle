const displayResult = (resultBox, isCorrectGuess, isGameOver) => {
  let displayMsg = isCorrectGuess ? "Correct Guess" : "Wrong Guess";

  if (isGameOver) displayMsg += "\nGame Over";

  resultBox.innerText = displayMsg;
};

const setUpGuessBox = (guessBox) => {
  guessBox.oninput = () => {
    if (guessBox.value.length === 5) {
      guessBox.disabled = true;
    }
  };
};

class Game {}

const main = () => {
  const submitBtn = document.querySelector("#submit-btn");
  const guessBox = document.querySelector("#guess-box");
  const resultBox = document.querySelector(".result");

  const secretWord = "TIGER";
  let noOfGuesses = 0;

  const guesses = [];

  submitBtn.onclick = () => {
    noOfGuesses++;
    const userGuess = guessBox.value;
    guesses.push(userGuess);
    const [recentGuess] = guesses.slice(-1);

    const isCorrectGuess = recentGuess === secretWord;
    const isGameOver = isCorrectGuess || noOfGuesses === 2;
    if (noOfGuesses === 2) submitBtn.disabled = true;

    displayResult(resultBox, isCorrectGuess, isGameOver);
  };
};

window.onload = main;
