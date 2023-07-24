Word // secretWord , guessed word
rover //secret word
river // guessed word

"rover" === "river"

Word

-

Guesses

- secretWord
- guessedWords
- isCorrectGuess

add(word)
isCorrectGuess() {
match the recent guess with secret word
}

generateStats() {
generate stats for all the words
}

recordGuess
this.#guesses.add(word)

Game
guesses
isGameOver
totalAttempts

registerGuess(word) {
this.#guesses.add(word);
this.#guesses.isCorrectGuess() - game over
if turns over - game over
}

status()

what is respo

#statForLetter(letter, index) {
const [guess, inCorrectSpot, inWrongSpot] = [letter, false, false];
const stat = { guess, inCorrectSpot, inWrongSpot };

    if (guess === this.#secretWord[index]) stat.inCorrectSpot = true;
    else if (this.#secretWord.includes(guess)) stat.inWrongSpot = true;

    return stat;

}

#statForWord(letters) {
return letters.map((letter, index) => this.#statForLetter(letter, index));
}

generateStats() {
return this.#guessChecker.map((guess) => this.#statForWord(guess));
}

a = [1, 2, 1];
guess = [2, 2, 3];

gSet = new Set(guess);
[...gSet].filter(i => a.has(i));

b = [2, 3, 2, 1]

obj , objb guess
keys = Object.keys(accb);
result = {}

for(key of keys) {
if(key in acc) {
result[key] = Math.min(acc[key], accb[key]);
}
}
