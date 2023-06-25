const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

import { cell, canvasObject, arrayObjects, generationsObject, aliveCountObject  } from "./objects.js";

//Draws the level and fills in the alive cells
function drawGame() {
    let rowArray = arrayObjects.getRowArray;
    let innhold = canvasObject.getInnhold;

    for (var i = 0; i < rowArray.length; i++) {
        for (var j = 0; j < rowArray[i].length; j++) {
            // If the cell is alive
            if (rowArray[i][j] == 1) {
                innhold.fillStyle = cell.getCellColor;
                innhold.fillRect(j * cell.getRectSize, i * cell.getRectSize, cell.getCubeSize, cell.getCubeSize);
                // If the cell is alive
            } else {
                innhold.fillStyle = cell.getBackgroundColor;
                innhold.fillRect(j * cell.getRectSize, i * cell.getRectSize, cell.getCubeSize, cell.getCubeSize);
            }
        }
    }

    let aliveCount = aliveCountObject.countAlives(rowArray);

    document.getElementById("generationsSpan").textContent = generationsObject.getGenerations;
    document.getElementById("aliveSpan").textContent = aliveCount;
}

export { drawGame };