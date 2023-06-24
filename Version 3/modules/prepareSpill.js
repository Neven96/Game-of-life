const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

import { arrayObjects, typeObjects, generationsObject, aliveCountObject, pauseObject } from "./objects.js";
import { populateSpill } from "./populateSpill.js";
import { prepareBoard } from "./prepareBoard.js";

// Creates board and chooses gametype
function prepareSpill() {
    generationsObject.setGenerations = 0;
    aliveCountObject.setAliveCount = 0;

    typeObjects.setStarted = false;
    typeObjects.setEqualOnce = false;
    pauseObject.setPause = true;

    arrayObjects.setChangedArray = [];
    aliveCountObject.setAliveArray = [];

    let typeSpill = typeObjects.getTypeSpill;

    let aliveCell = document.getElementsByClassName("aliveCell");

    // Empties the list of latest generations of alive cells
    for (let i = 0; i < aliveCell.length; i++) {
        aliveCell[i].textContent = "";
    }

    if (typeSpill === 1) {
        typeObjects.setDrawable = false;
        populateSpill();
        
        document.getElementById("populateSpan").textContent = "Repopulate";
        document.getElementById("drawSpan").textContent = "Draw";
    } else if (typeSpill === 2) {
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

export { prepareSpill };