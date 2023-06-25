const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

import { cell, canvasObject, arrayObjects } from "./objects.js";
import { drawGame } from "./drawGame.js";

// Creates an empty board ready for use
function prepareBoard() {
    let rowArray = arrayObjects.getRowArray;
    let board = canvasObject.getBoard;

    let columnArray = [];

    // Creates an empty array of the board size
    for (var i = 0; i <= board.height / (cell.getRectSize); i++) {
        columnArray = [];
        for (var j = 0; j <= board.width / (cell.getRectSize); j++) {
            columnArray[j] = 0;
        }
        rowArray[i] = columnArray;
    }

    arrayObjects.setRowArray = rowArray;

    drawGame();
}

export { prepareBoard };