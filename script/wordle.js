const displayResult = (resultBox, result) => {
  resultBox.innerText = `${result} Guess`;
};

const setUpGuessBox = (guessBox) => {
  guessBox.oninput = () => {
    if (guessBox.value.length === 5) {
      guessBox.disabled = true;
    }
  };
};

const main = () => {
  const submitBtn = document.querySelector("#submit-btn");
  const guessBox = document.querySelector("#secret-word");
  const resultBox = document.querySelector(".result");

  const secretWord = "TIGER";

  setUpGuessBox(guessBox);

  submitBtn.onclick = () => {
    const userGuess = guessBox.value;
    const result = userGuess === secretWord ? "Correct" : "Incorrect";

    displayResult(resultBox, result);
  };
};

window.onload = main;
