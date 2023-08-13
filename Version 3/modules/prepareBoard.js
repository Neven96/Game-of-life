import { myHeaders } from "../helpers/header.js";
import { cell, canvasObject, arrayObjects } from "./objects.js";

// Creates an empty board ready for use
function prepareBoard() {
    let rowArray = arrayObjects.getRowArray;
    const board = canvasObject.getBoard;
    const content = canvasObject.getContent;

    // Creates an empty array of the board size
    for (let i = 0; i <= board.height / (cell.getRectSize); i++) {
        let columnArray = [];
        for (let j = 0; j <= board.width / (cell.getRectSize); j++) {
            columnArray[j] = 0;
            content.fillStyle = cell.getBackgroundColor;
            content.fillRect(j * cell.getRectSize, i * cell.getRectSize, cell.getCellSize, cell.getCellSize);
        }
        rowArray[i] = columnArray;
    }

    arrayObjects.setRowArray = rowArray;
}

export { prepareBoard };