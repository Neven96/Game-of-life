const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

import { cell, canvasObject, arrayObjects, generationsObject, aliveCountObject  } from "./objects.js";

//Draws the level and fills in the alive cells
function drawGame() {
    let rowArray = arrayObjects.getRowArray;
    let content = canvasObject.getContent;

    for (var i = 0; i < rowArray.length; i++) {
        for (var j = 0; j < rowArray[i].length; j++) {
            if (rowArray[i][j] == 1) {
                // If the cell is alive
                content.fillStyle = cell.getCellColor;
                content.fillRect(j * cell.getRectSize, i * cell.getRectSize, cell.getCellSize, cell.getCellSize);
            } else {
                // If the cell is dead
                content.fillStyle = cell.getBackgroundColor;
                content.fillRect(j * cell.getRectSize, i * cell.getRectSize, cell.getCellSize, cell.getCellSize);
            }
        }
    }

    let aliveCount = aliveCountObject.countAlives(rowArray);

    document.getElementById("generationsSpan").textContent = generationsObject.getGenerations;
    document.getElementById("aliveSpan").textContent = aliveCount;
}

export { drawGame };