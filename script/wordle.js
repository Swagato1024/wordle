const showResult = (result) => {
  const resultBox = document.querySelector(".result");
  resultBox.innerText = `${result} Guess`;
};

const main = () => {
  const submitBtn = document.querySelector("#submit-btn");
  const guessBox = document.querySelector("#secret-word");

  const secretWord = "TIGER";

  submitBtn.onclick = () => {
    const userGuess = guessBox.value;
    const result = userGuess === secretWord ? "Correct" : "Incorrect";

    showResult(result);
  };
};

window.onload = main;
