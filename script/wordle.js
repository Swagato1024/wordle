const showResult = (resultBox, result) => {
  resultBox.innerText = result;
};

const main = () => {
  const submitBtn = document.querySelector("#submit-btn");
  const guessBox = document.querySelector("#secret-word");
  const resultBox = document.querySelector(".result");

  const secretWord = "TIGER";

  submitBtn.onclick = () => {
    const userGuess = guessBox.value;
    const result = userGuess === secretWord ? "Correct" : "Incorrect";

    showResult(resultBox, result);
  };
};

window.onload = main;
