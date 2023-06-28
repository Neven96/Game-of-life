import { myHeaders } from "./header.js";
import { cell, canvasObject, arrayObjects } from "./objects.js";
import { drawGame } from "./drawGame.js";

// Creates an empty board ready for use
function prepareBoard() {
    let rowArray = arrayObjects.getRowArray;
    const board = canvasObject.getBoard;

    // Creates an empty array of the board size
    for (let i = 0; i <= board.height / (cell.getRectSize); i++) {
        let columnArray = [];
        for (let j = 0; j <= board.width / (cell.getRectSize); j++) {
            columnArray[j] = 0;
        }
        rowArray[i] = columnArray;
    }

    arrayObjects.setRowArray = rowArray;

    drawGame();
}

export { prepareBoard };