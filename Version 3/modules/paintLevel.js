import { drawGame } from "./drawGame.js";
import { myHeaders } from "./header.js";
import { cell, typeObjects, arrayObjects, paintObject } from "./objects.js";

//Allows painting on grid
function paintLevel(board, event) {
    let rowArray = arrayObjects.getRowArray;
    arrayObjects.setChangedArray = [];
    let changedArray = arrayObjects.getChangedArray;

    if (typeObjects.getDrawable) {
        const rect = board.getBoundingClientRect();
        // Finds the x and y coordinates of the board
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        // Derives the start coordinates of the cell from the size of it
        let x_true = (Math.floor(x / cell.getRectSize) * cell.getRectSize);
        let y_true = (Math.floor(y / cell.getRectSize) * cell.getRectSize);
        // Derives the index of the cell for the rowArray and changedArray arrays
        let x_array_index = x_true / (cell.getRectSize);
        let y_array_index = y_true / (cell.getRectSize);

        // Gives the ability to draw by holding down the mouse button
        if (event.type === "mousedown" && rowArray[y_array_index][x_array_index] === 0 && !paintObject.getLocked) {
            paintObject.setAddPaint = true;
            paintObject.setLocked = true;
            drawGame();
        } else if (event.type === "mousedown" && rowArray[y_array_index][x_array_index] === 1 && !paintObject.getLocked) {
            paintObject.setAddPaint = false;
            paintObject.setLocked = true;
            drawGame();
        }

        // If the cell is empty, change it to drawn, if it is already drawn on, change to empty
        if (paintObject.getAddPaint && paintObject.getLocked && rowArray[y_array_index][x_array_index] === 0) {
            rowArray[y_array_index][x_array_index] = 1;
            drawGame();
        } else if (!paintObject.getAddPaint && paintObject.getLocked && rowArray[y_array_index][x_array_index] === 1) {
            rowArray[y_array_index][x_array_index] = 0;
            drawGame();
        }
    }
}

// Stops the drawing
function stopPainting(event) {
    if (event.type === "mouseup" || event.type === "mouseleave") {
        paintObject.setLocked = false;
    }
}

export { paintLevel, stopPainting };