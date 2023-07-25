import { myHeaders } from "./header.js";
import { arrayObjects } from "./objects.js";
import { reDrawGame } from "./reDrawGame.js";
import { tickGame } from "./playGame.js";
import { aliveArrayChecker } from "./aliveArrayChecker.js";
import { mod } from "./modulo.js";
import { switchHelper } from "./switchHelper.js";

// Without borders
function playInfinityGame(changedArray) {
    let rowArray = arrayObjects.getRowArray;

    // Get the length before the array to speed it up a little
    let rowArrayLength = rowArray.length;
    for (let row = 0; row < rowArrayLength; row++) {
        
        // Get the length before the array to speed it up a little
        let rowArrayRowLength = rowArray[row].length;
        for (let col = 0; col < rowArrayRowLength; col++) {
            // Finds the number of neighbors of one cell
            switchHelper(row, col, rowArray, changedArray, 
                         rowArray[mod(row - 1, rowArray.length)][mod(col - 1, rowArray[row].length)]
                       + rowArray[mod(row - 1, rowArray.length)][col]
                       + rowArray[mod(row - 1, rowArray.length)][mod(col + 1, rowArray[row].length)]
                       + rowArray[row][mod(col - 1, rowArray[row].length)]
                       + rowArray[row][mod(col + 1, rowArray[row].length)]
                       + rowArray[mod(row + 1, rowArray.length)][mod(col - 1, rowArray[row].length)]
                       + rowArray[mod(row + 1, rowArray.length)][col]
                       + rowArray[mod(row + 1, rowArray.length)][mod(col + 1, rowArray[row].length)])
        }
    }

    reDrawGame();
    aliveArrayChecker();
    tickGame();
}

export { playInfinityGame };