const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

import { arrayObjects } from "./objects.js";
import { reDrawSpill } from "./reDrawSpill.js";
import { spilleSpill } from "./spilleSpill.js";
import { mod } from "./modulo.js";

// Without borders, new render, much faster than every other
function playInfinitySpillV4() {
    let rowArray = arrayObjects.getRowArray;
    let changedArray = arrayObjects.getChangedArray;

    for (var row = 0; row < rowArray.length; row++) {
        for (var col = 0; col < rowArray[row].length; col++) {
            // Checks dead cells for the number of neighbours
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
                // Checks alive cells for number of neighbours
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

    reDrawSpill();
    spilleSpill();
}

export { playInfinitySpillV4 };