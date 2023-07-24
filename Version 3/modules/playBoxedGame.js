import { myHeaders } from "./header.js";
import { arrayObjects } from "./objects.js";
import { reDrawGame } from "./reDrawGame.js";
import { tickGame } from "./playGame.js";
import { aliveArrayChecker } from "./aliveArrayChecker.js";
import { switchHelper } from "./switchHelper.js";

// With borders
function playBoxedGame(changedArray) {
    let rowArray = arrayObjects.getRowArray;

    // Get the length before the array to speed it up a little
    let rowArrayLength = rowArray.length;
    for (let row = 0; row < rowArrayLength; row++) {

        // Get the length before the array to speed it up a little
        let rowArrayRowLength = rowArray[row].length;
        for (let col = 0; col < rowArrayRowLength; col++) {
            // Top row
            if (row == 0) {
                // Top-left corner
                if (col == 0) {
                    switchHelper(row, col, rowArray, changedArray, rowArray[row][col + 1]
                               + rowArray[row + 1][col]
                               + rowArray[row + 1][col + 1]);
                }
                // Top-right corner
                else if (col == rowArray[row].length - 1) {
                    switchHelper(row, col, rowArray, changedArray, rowArray[row][col - 1]
                               + rowArray[row + 1][col]
                               + rowArray[row + 1][col - 1]);
                }
                // Rest of top row
                else {
                    switchHelper(row, col, rowArray, changedArray, rowArray[row][col - 1]
                               + rowArray[row][col + 1]
                               + rowArray[row + 1][col - 1]
                               + rowArray[row + 1][col]
                               + rowArray[row + 1][col + 1]);
                }
            } // Top row end

            // Bottom row
            else if (row == rowArray.length - 1) {
                // Bottom-left corner
                if (col == 0) {
                    switchHelper(row, col, rowArray, changedArray, rowArray[row][col + 1]
                               + rowArray[row - 1][col]
                               + rowArray[row - 1][col + 1]);
                }
                // Bottom-right corner
                else if (col == rowArray[row].length - 1) {
                    switchHelper(row, col, rowArray, changedArray, rowArray[row][col - 1]
                               + rowArray[row - 1][col]
                               + rowArray[row - 1][col - 1]);
                }
                // Rest of bottom row
                else {
                    switchHelper(row, col, rowArray, changedArray, rowArray[row][col - 1]
                               + rowArray[row][col + 1]
                               + rowArray[row - 1][col - 1]
                               + rowArray[row - 1][col]
                               + rowArray[row - 1][col + 1]);
                }
            } // Bottom row end

            //Between top and bottom row
            else {
                // Left column
                if (col == 0) {
                    switchHelper(row, col, rowArray, changedArray, rowArray[row - 1][col]
                               + rowArray[row - 1][col + 1]
                               + rowArray[row][col + 1]
                               + rowArray[row + 1][col]
                               + rowArray[row + 1][col + 1]);
                }
                // Right column
                else if (col == rowArray[row].length - 1) {
                    switchHelper(row, col, rowArray, changedArray, rowArray[row - 1][col]
                               + rowArray[row - 1][col - 1]
                               + rowArray[row][col - 1]
                               + rowArray[row + 1][col]
                               + rowArray[row + 1][col - 1]);
                }
                // Middle of map
                else {
                    switchHelper(row, col, rowArray, changedArray, rowArray[row - 1][col - 1]
                               + rowArray[row - 1][col]
                               + rowArray[row - 1][col + 1]
                               + rowArray[row][col - 1]
                               + rowArray[row][col + 1]
                               + rowArray[row + 1][col - 1]
                               + rowArray[row + 1][col]
                               + rowArray[row + 1][col + 1]);
                }
            }
        }
    }

    reDrawGame();
    aliveArrayChecker();
    tickGame();
}

export {playBoxedGame};