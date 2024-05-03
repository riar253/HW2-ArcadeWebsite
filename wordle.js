"use strict";

const total_guesses = 6; //the number of guess that the user has in order to get the correct word
let guesses_remaining = total_guesses;   //the number of guesses that the user has left
let current_guess = []
let next_letter = 0;
let correct_word = ""



window.onload = function() {
    correct_word = dictionary_of_words[Math.floor(Math.random() * dictionary_of_words.length)]
}

function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < total_guesses; i++) {
        let row = document.createElement("div")
        row.className = "row_of_boxes"
        
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }

    console.log("done with game build");
}

initBoard()

document.addEventListener("keyup", (e) => {
    if(guesses_remaining === 0) {
        return //don't do anything
    }

    let letter_entered = String(e.key);

    if(letter_entered === "Enter"){
        checkGuess()
        return
    }

    if(letter_entered === "Backspace" && next_letter !== 0){
        deleteLetter()
        console.log("backspace entered")
        return
    }
    
    let found = letter_entered.match(/[a-z]/gi)
    if(!found || found.length > 1){
        return 
    } else {
        console.log("letter entered")
        displayLetter(letter_entered)
    }
    
})

function displayLetter (letter_entered){
    if (next_letter === 5){
        return
    }

    letter_entered = letter_entered.toLowerCase()
    let row = document.getElementsByClassName("row_of_boxes")[total_guesses - guesses_remaining]
    let box = row.children[next_letter]
    box.textContent = letter_entered
    box.classList.add("filled-box")
    current_guess.push(letter_entered)
    next_letter += 1
}

function deleteLetter () {
    let row = document.getElementsByClassName("row_of_boxes")[total_guesses - guesses_remaining]
    let box = row.children[next_letter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    current_guess.pop()
    next_letter -= 1
}

document.getElementById('enter-button').onclick = function() {
    checkGuess()
};

function checkGuess () {
    let row = document.getElementsByClassName("row_of_boxes")[total_guesses - guesses_remaining]
    let guessString = ''
    let rightGuess = Array.from(correct_word)

    for (const val of current_guess) {
        guessString += val
    }

    if (guessString.length != 5) {
        alert("Not enough letters!")
        return
    }

    if (!dictionary_of_words.includes(guessString)) {
        alert("Word not in list!")
        return
    }

    
    for (let i = 0; i < 5; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = current_guess[i]
        
        let letterPosition = rightGuess.indexOf(current_guess[i])
        // is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = 'grey'
        } else {
            // now, letter is definitely in word
            // if letter index and right guess index are the same
            // letter is in the right position 
            if (current_guess[i] === rightGuess[i]) {
                // shade green 
                letterColor = 'green'
            } else {
                // shade box yellow
                letterColor = 'yellow'
            }

            rightGuess[letterPosition] = "#"
        }

        let delay = 250 * i
        setTimeout(()=> {
            //shade box
            box.style.backgroundColor = letterColor
        }, delay)
    }

    if (guessString === correct_word) {
        alert("You guessed right! Game over!")
        guesses_remaining = 0
        return
    } else {
        guesses_remaining -= 1;
        current_guess = [];
        next_letter = 0;

        if (guesses_remaining === 0) {
            alert("You've run out of guesses! Game over!")
            alert(`The right word was: "${correct_word}"`)
        }
    }
}
