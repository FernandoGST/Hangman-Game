const gameWordOptions =
    ['mercury', 'venus', 'earth', 'mars', 'juptier', 'saturn', 'uranus', 'neptune', 'pluto', 'sun', 'moon'];
var started = false;
var gameWord = "";
var guessedLetters = "";
var wrongGuessedLetters = [];
var guessesRem = 0;
var maxGuesses = 0;
var totalWins = 0;

function updateNumberOfWins(wins) {
    $("#wins").text(wins);
}
function initializeGuessedLetters(word) {
    gameWord = word;
    guessedLetters = "";
    for (let i = 0; i < word.length; i++) guessedLetters += "_ ";
    updateGuessedLetters();
}
function updateGuessedLetters() {
    $("#underscore").text(guessedLetters);
}
function updateGuessRem(guessNo) {
    $("#remaining").text(guessNo);
}
function updateLettersGuessed() {
    $("#wrongguess").text(wrongGuessedLetters.join(" "));
}
function updateMainMessage(mess) {
    $("#message").text(mess);
}
function isLetter(c) {
    //warning this function will not work with chinese lol
    if (c.length > 1) return false;
    return c.toLowerCase() != c.toUpperCase();
}

function startGame() {
    let randIndex = Math.floor(Math.random() * gameWordOptions.length);
    let numberOfWins = 0;
    let crrWord = gameWordOptions[randIndex].toLocaleLowerCase();
    //let crrWord = "test";
    maxGuesses = 10;
    wrongGuessedLetters = [];
    guessesRem = maxGuesses - wrongGuessedLetters.length;
    updateNumberOfWins(numberOfWins);
    initializeGuessedLetters(crrWord);
    updateGuessRem(guessesRem);
    updateLettersGuessed();
    updateMainMessage("Start Guessing!");

}
function findAll(word, letter) {
    var indices = [];
    for (var i = 0; i < word.length; i++) {
        if (word[i] === letter) indices.push(i);
    }
    return indices;
}
document.addEventListener('keypress', (event) => {
    var key = event.key.toLocaleLowerCase();
    if (!started || (guessesRem <= 0 && key == 'f')) {
        started = true;
        startGame();
        return;
    }
    if (guessesRem <= 0) return;
    if (!isLetter(key)) {
        alert("Thats not a letter!");
        return;
    }
    let foundIndxs = findAll(gameWord, key);
    if (foundIndxs.length > 0) {
        let letter = gameWord[foundIndxs[0]];
        guessedLettersArr = guessedLetters.split(" ");
        console.log(guessedLettersArr);
        for (let i = 0; i < guessedLettersArr.length; i++) {
            guessedLettersArr[foundIndxs[i]] = letter;
        }
        guessedLetters = guessedLettersArr.join(" ");
        updateGuessedLetters();
        if (!guessedLettersArr.find(el => { return el === '_' })) {
            alert("You Win!")
            updateMainMessage("Press f to Start Over! :D");
            totalWins++;
            updateNumberOfWins(totalWins);
            guessesRem = totalWins;
            updateGuessRem(guessesRem)
        }
        return;
    }
    if (!wrongGuessedLetters.find(el => { return el == key })) {
        wrongGuessedLetters.push(key);
        guessesRem--;
        updateGuessRem(guessesRem)
        updateLettersGuessed();
    } else {
        alert("You already used that letter!")
    }
    if (guessesRem <= 0)
        updateMainMessage("You lose, Press F to pay respects.");

});
