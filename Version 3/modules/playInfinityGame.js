import { myHeaders } from "./header.js";
import { arrayObjects } from "./objects.js";
import { reDrawGame } from "./reDrawGame.js";
import { tickGame } from "./playGame.js";
import { aliveArrayChecker } from "./aliveArrayChecker.js";
import { mod } from "./modulo.js";

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
            switch (rowArray[mod(row - 1, rowArray.length)][mod(col - 1, rowArray[row].length)]
                  + rowArray[mod(row - 1, rowArray.length)][col]
                  + rowArray[mod(row - 1, rowArray.length)][mod(col + 1, rowArray[row].length)]
                  + rowArray[row][mod(col - 1, rowArray[row].length)]
                  + rowArray[row][mod(col + 1, rowArray[row].length)]
                  + rowArray[mod(row + 1, rowArray.length)][mod(col - 1, rowArray[row].length)]
                  + rowArray[mod(row + 1, rowArray.length)][col]
                  + rowArray[mod(row + 1, rowArray.length)][mod(col + 1, rowArray[row].length)]) {
                case 2:
                    // Stay alive/dead
                    break;
                case 3:
                    // Stay alive/awaken
                    if (rowArray[row][col] == 0) {
                        changedArray.push([row, col]);
                    }
                    break;                    
                default:
                    // Killed
                    if (rowArray[row][col] == 1) {
                        changedArray.push([row, col]);
                    }
                    break;
            }
        }
    }

    arrayObjects.setChangedArray = changedArray;

    reDrawGame();
    aliveArrayChecker();
    tickGame();
}

export { playInfinityGame };