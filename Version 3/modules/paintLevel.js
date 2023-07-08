import { myHeaders } from "./header.js";
import { cell, typeObjects, arrayObjects, generationsObject, aliveCountObject, paintObject } from "./objects.js";
import { reDrawGame } from "./reDrawGame.js";

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
        // Left click to draw, right click to delete
        if (event.type === "mousedown" && event.buttons === 1) {
            paintObject.setAddPaint = true;
            paintObject.setLocked = true;
        } else if (event.type === "mousedown" && event.buttons === 2) {
            paintObject.setAddPaint = false;
            paintObject.setLocked = true;
        }

        // Checks if we are allowed to draw and then keeps drawing, only on the right cells
        // The rowArray check is for not changedArray to not be called on the wrong cells
        // ChangedArray doesn't care what status the cell has, it changes it either way
        if (paintObject.getAddPaint && paintObject.getLocked && rowArray[y_array_index][x_array_index] === 0) {
            changedArray.push([y_array_index, x_array_index]);
        } else if (!paintObject.getAddPaint && paintObject.getLocked && rowArray[y_array_index][x_array_index] === 1) {
            changedArray.push([y_array_index, x_array_index]);
        }

        arrayObjects.setChangedArray = changedArray;

        reDrawGame();

        document.getElementById("generationsSpan").textContent = generationsObject.getGenerations;
        document.getElementById("aliveSpan").textContent = aliveCountObject.countAlives(arrayObjects.getRowArray);
    }
}

// Stops the drawing
function stopPainting(event) {
    if (event.type === "mouseup" || event.type === "mouseleave") {
        paintObject.setLocked = false;
    }
}

export { paintLevel, stopPainting };