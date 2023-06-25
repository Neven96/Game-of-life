const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

import { cell, typeObjects, arrayObjects } from "./objects.js";
import { drawGame } from "./drawGame.js";

//Allows painting on grid
function paintLevel(board, event) {
    let rowArray = arrayObjects.getRowArray;

    if (typeObjects.getDrawable) {
        const rect = board.getBoundingClientRect();
        // Finds the x and y coordinates of the board
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        // Derives the start coordinates of the cell from the size of it
        let x_true = (Math.floor(x / cell.getRectSize) * cell.getRectSize);
        let y_true = (Math.floor(y / cell.getRectSize) * cell.getRectSize);
        // Derives the index of the cell in the rowArray array
        let x_array_index = x_true / (cell.getRectSize);
        let y_array_index = y_true / (cell.getRectSize);

        // If the cell is empty, change it to drawn, if it is already drawn on, change to empty
        if (rowArray[y_array_index][x_array_index] == 0) {
            rowArray[y_array_index][x_array_index] = 1;
        } else if (rowArray[y_array_index][x_array_index] == 1) {
            rowArray[y_array_index][x_array_index] = 0;
        }
        drawGame();
    }
}

export { paintLevel };