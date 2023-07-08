import { myHeaders } from "./header.js";
import { arrayObjects } from "./objects.js";
import { reDrawGame } from "./reDrawGame.js";
import { playGame } from "./playGame.js";
import { aliveArrayChecker } from "./aliveArrayChecker.js";
import { mod } from "./modulo.js";

// Without borders, new render, much faster than every other
function playInfinityGame() {
    let rowArray = arrayObjects.getRowArray;
    let changedArray = arrayObjects.getChangedArray;

    for (let row = 0; row < rowArray.length; row++) {
        for (let col = 0; col < rowArray[row].length; col++) {
            // Checks dead cells for the number of alive neighbours
            if (rowArray[row][col] == 0) {
                switch (rowArray[mod(row - 1, rowArray.length)][mod(col - 1, rowArray[row].length)]
                    + rowArray[mod(row - 1, rowArray.length)][col]
                    + rowArray[mod(row - 1, rowArray.length)][mod(col + 1, rowArray[row].length)]
                    + rowArray[row][mod(col - 1, rowArray[row].length)]
                    + rowArray[row][mod(col + 1, rowArray[row].length)]
                    + rowArray[mod(row + 1, rowArray.length)][mod(col - 1, rowArray[row].length)]
                    + rowArray[mod(row + 1, rowArray.length)][col]
                    + rowArray[mod(row + 1, rowArray.length)][mod(col + 1, rowArray[row].length)]) {
                    case 3:
                        // Alive
                        changedArray.push([row, col]);
                }
            } else if (rowArray[row][col] == 1) {
                // Checks alive cells for number of alive neighbours
                switch (rowArray[mod(row - 1, rowArray.length)][mod(col - 1, rowArray[row].length)]
                    + rowArray[mod(row - 1, rowArray.length)][col]
                    + rowArray[mod(row - 1, rowArray.length)][mod(col + 1, rowArray[row].length)]
                    + rowArray[row][mod(col - 1, rowArray[row].length)]
                    + rowArray[row][mod(col + 1, rowArray[row].length)]
                    + rowArray[mod(row + 1, rowArray.length)][mod(col - 1, rowArray[row].length)]
                    + rowArray[mod(row + 1, rowArray.length)][col]
                    + rowArray[mod(row + 1, rowArray.length)][mod(col + 1, rowArray[row].length)]) {
                    case 2:
                        // Stay alive
                        break;
                    case 3:
                        // Stay alive
                        break;
                    default:
                        // Dead
                        changedArray.push([row, col]);
                }
            }
        }
    }

    arrayObjects.setChangedArray = changedArray;

    reDrawGame();
    aliveArrayChecker();
    playGame();
}

export { playInfinityGame };