const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

import { aliveArrayChecker } from "./aliveArrayChecker.js";
import { cell, canvasObject, arrayObjects} from "./objects.js";

// Redraws only the risen/killed cells, reducing the time per round drastically
function reDrawGame() {
    const content = canvasObject.getContent;

    let rowArray = arrayObjects.getRowArray;
    let changedArray = arrayObjects.getChangedArray;

    for (var i = 0; i < changedArray.length; i++) {
        // If the cell was alive, but is now dead
        if (rowArray[changedArray[i][0]][changedArray[i][1]] == 1) {
            content.fillStyle = cell.getBackgroundColor;
            content.fillRect(changedArray[i][1] * cell.getRectSize, changedArray[i][0] * cell.getRectSize, cell.getCubeSize, cell.getCubeSize);
            rowArray[changedArray[i][0]][changedArray[i][1]] = 0;
            // If the cell was dead, but is now alive
        } else if (rowArray[changedArray[i][0]][changedArray[i][1]] == 0) {
            content.fillStyle = cell.getCellColor;
            content.fillRect(changedArray[i][1] * cell.getRectSize, changedArray[i][0] * cell.getRectSize, cell.getCubeSize, cell.getCubeSize);
            rowArray[changedArray[i][0]][changedArray[i][1]] = 1;
        }
    }

    arrayObjects.setRowArray = rowArray;

    aliveArrayChecker();
}

export {reDrawGame};