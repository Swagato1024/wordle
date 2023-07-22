const onSubmit = () => {};

const main = () => {
  const submitBtn = document.querySelector("#submit-btn");
  const guessBox = document.querySelector("#secret-word");

  const secretWord = "TIGER";

  submitBtn.onclick = () => {
    const userGuess = guessBox.value;
    console.log(userGuess);
  };
};

window.onload = main;
