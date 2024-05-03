"use strict";

var you;
var yourScore = 0;
var opponent;
var opponentScore = 0;

var choices = ["rock", "paper", "scissors"];

window.onload = function() {
    for (let i = 0; i < 3; i++){
        //<img>
        let choice = document.createElement("img");
        choice.id = choices[i];
        choice.src = "images/" + choices[i] + ".jpg";
        choice.addEventListener("click", selectChoice);
        document.getElementById("choices").append(choice);
    }
}

function selectChoice() {
    you = this.id;
    document.getElementById("user-choice").src = "images/" + you + ".jpg";

    //random choice for opponent
    opponent = choices[Math.floor(Math.random() * 3)];
    document.getElementById("opponent-choice").src = "images/" + opponent + ".jpg";

    //check for winner
    if(you == "rock"){
        if(opponent == "scissors"){
            yourScore += 1;
        }
        if(opponent == "paper"){
            opponentScore += 1;
        }
    }
    else if (you == "scissors"){
        if(opponent == "paper"){
            yourScore += 1;
        }
        if(opponent == "rock"){
            opponentScore += 1;
        }
    }
    else {
        if(opponent == "scissors"){
            yourScore += 1;
        }
        if(opponent == "paper"){
            opponentScore += 1;
        }
    }

    document.getElementById("user-score").innerText = "You: " + yourScore;
    document.getElementById("opponent-score").innerText = "Computer: " + opponentScore;

}
