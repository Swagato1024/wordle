I will have an entity Guess
Guess will consists of
guesses = [[]]
secretWord = []

It can generate Stats on each guessed letter
stat = {
guess: 'l',
inCorrectSpot: false,
inWrongSpot: false,
notInWord: true
}

generateStat(guess) { //for each char
const stat = [];

statFormat = guess.map((letter) => {
return {
guess: letter, inCorrectSpot: false, inWrongSpot: false, notInWord: false
};
    
letters.
}
guesses.map(generateStat)
