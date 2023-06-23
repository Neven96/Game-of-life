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

    for (let i = 0; i < aliveCell.length; i++) {
        aliveCell[i].textContent = "";
    }

    for (var i = 0; i <= bane.height / (cell.getRectSize); i++) {
        columnArray = [];
        for (var j = 0; j <= bane.width / (cell.getRectSize); j++) {
            columnArray[j] = 0;
        }
        rowArray[i] = columnArray;
    }

    arrayObjects.setRowArray = rowArray;

    if (typeSpill === 1) {
        populateSpill();
        typeObjects.setDrawable = false;

        document.getElementById("populateSpan").textContent = "Repopulate";
        document.getElementById("drawSpan").textContent = "Draw";
    } else if (typeSpill === 2) {
        typeObjects.setDrawable = true;

        document.getElementById("populateSpan").textContent = "Populate";
        document.getElementById("drawSpan").textContent = "Redraw";
    }

    drawSpill();

    document.getElementById("pauseKnapp").style.display = "none";
    document.getElementById("playBoxedKnapp").style.display = "initial";
    document.getElementById("playInfinityKnapp").style.display = "initial";
    document.getElementById("stabilizedSpan").textContent = "";
}

export { prepareSpill };