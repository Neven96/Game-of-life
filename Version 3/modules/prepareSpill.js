const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

import { cell, canvasObject, arrayObjects, typeObjects, generationsObject, aliveCountObject, pauseObject } from "./objects.js";
import { populateSpill } from "./populateSpill.js";
import { drawSpill } from "./drawSpill.js";

// Creates board and chooses gametype
function prepareSpill() {
    generationsObject.setGenerations = 0;
    aliveCountObject.setAliveCount = 0;

    typeObjects.setStarted = false;
    typeObjects.setEqualOnce = false;
    pauseObject.setPause = true;

    arrayObjects.setRowArray = [];
    arrayObjects.setChangedArray = [];
    aliveCountObject.setAliveArray = [];

    let columnArray = [];
    let rowArray = arrayObjects.getRowArray;

    let typeSpill = typeObjects.getTypeSpill;

    let bane = canvasObject.getBane;

    let aliveCell = document.getElementsByClassName("aliveCell");

    // Empties the list of latest generations of alive cells
    for (let i = 0; i < aliveCell.length; i++) {
        aliveCell[i].textContent = "";
    }

    // Creates an empty array of the board size
    for (var i = 0; i <= bane.height / (cell.getRectSize); i++) {
        columnArray = [];
        for (var j = 0; j <= bane.width / (cell.getRectSize); j++) {
            columnArray[j] = 0;
        }
        rowArray[i] = columnArray;
    }

    arrayObjects.setRowArray = rowArray;

    if (typeSpill === 1) {
        typeObjects.setDrawable = false;
        populateSpill();
        
        document.getElementById("populateSpan").textContent = "Repopulate";
        document.getElementById("drawSpan").textContent = "Draw";
    } else if (typeSpill === 2) {
        typeObjects.setDrawable = true;
        drawSpill();

        document.getElementById("populateSpan").textContent = "Populate";
        document.getElementById("drawSpan").textContent = "Redraw";
    }

    document.getElementById("pauseKnapp").style.display = "none";
    document.getElementById("playBoxedKnapp").style.display = "initial";
    document.getElementById("playInfinityKnapp").style.display = "initial";
    document.getElementById("stabilizedSpan").textContent = "";
}

export { prepareSpill };