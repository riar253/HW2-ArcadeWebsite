"use strict";


let num_sides = 2;

document.getElementById('enter-button').onclick = function() {
    let inputField = document.getElementById("numSides"); 
    num_sides = inputField.value; 
    //alert("You want a coin with this many sides: " + num_sides); 


    let board = document.getElementById("category-container");
    board.innerHTML = ""; 


    for(let i = 0; i < num_sides; i++){
        var lab = document.createTextNode("Category: ");
        let box = document.createElement("input")
        lab.className = "label-cat"
        box.className = "input-box"
        board.appendChild(lab)
        board.appendChild(box)
    }

    var but = document.createElement("BUTTON");
    but.innerHTML = "Enter"
    but.classList.add("enter-button");
    but.id = "cat-button"


    but.onclick = function() {
        let board = document.getElementById("category-container");
        let question = document.getElementById("question");

        board.innerHTML = ""; 
        question.innerHTML = ""; 

    
        var header = document.createElement("h3");
        var text = document.createTextNode("Which category won?")
        header.appendChild(text)
        board.appendChild(header)
    
        // var coin = document.createElement("div");
        // coin.className = "coin"
        // coin.id = "coin"
        // var img1 = document.createElement("img");
        // img1.src = "images/heads-coin.jpg"
        // board.appendChild(coin)
        // board.appendChild(img1)

        let num = Math.floor(Math.random()*(num_sides))
        let winner = document.getElementsByClassName("input-box")[num]
        let winner_text = winner.value

        var header2 = document.createElement("h3");
        var text2 = document.createTextNode(winner_text)
        header2.appendChild(text2)
        board.appendChild(header2)

    
    }


    board.appendChild(but)

}




