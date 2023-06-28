import { myHeaders } from "./header.js";
import { arrayObjects, typeObjects, generationsObject, aliveCountObject } from "./objects.js";
import { populateGame } from "./populateGame.js";
import { prepareBoard } from "./prepareBoard.js";
import { pauseObject } from "./pauseGame.js";

// Creates board and chooses gametype
function prepareGame() {
    generationsObject.setGenerations = 0;
    aliveCountObject.setAliveCount = 0;

    typeObjects.setStarted = false;
    typeObjects.setEqualOnce = false;
    pauseObject.setPause = true;

    arrayObjects.setChangedArray = [];
    aliveCountObject.setAliveArray = [];

    let aliveCells = document.getElementsByClassName("aliveCell");

    // Empties the list of latest generations of alive cells
    for (let i = 0; i < aliveCells.length; i++) {
        aliveCells[i].textContent = "";
    }

    if (typeObjects.getTypeGame === 1) {
        typeObjects.setDrawable = false;
        populateGame();
        
        document.getElementById("populateSpan").textContent = "Repopulate";
        document.getElementById("drawSpan").textContent = "Draw";
    } else if (typeObjects.getTypeGame === 2) {
        typeObjects.setDrawable = true;
        prepareBoard();

        document.getElementById("populateSpan").textContent = "Populate";
        document.getElementById("drawSpan").textContent = "Redraw";
    }

    document.getElementById("pauseKnapp").style.display = "none";
    document.getElementById("playBoxedKnapp").style.display = "initial";
    document.getElementById("playInfinityKnapp").style.display = "initial";
    document.getElementById("stabilizedSpan").textContent = "";
}

export { prepareGame };