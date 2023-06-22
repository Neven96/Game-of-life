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

    for (var i = 0; i < rowArray.length; i++) {
        for (var j = 0; j < rowArray[i].length; j++) {
            // Checks dead cells for the number of neighbours
            if (rowArray[i][j] == 0) {
                switch ((rowArray[mod(i - 1, rowArray.length)][mod(j - 1, rowArray[i].length)]
                    + rowArray[mod(i - 1, rowArray.length)][j]
                    + rowArray[mod(i - 1, rowArray.length)][mod(j + 1, rowArray[i].length)])
                + (rowArray[i][mod(j - 1, rowArray[i].length)]
                    + rowArray[i][mod(j + 1, rowArray[i].length)])
                + (rowArray[mod(i + 1, rowArray.length)][mod(j - 1, rowArray[i].length)]
                    + rowArray[mod(i + 1, rowArray.length)][j]
                    + rowArray[mod(i + 1, rowArray.length)][mod(j + 1, rowArray[i].length)])) {
                    case 3:
                        // Alive
                        changedArray.push([i, j]);
                }
            } else if (rowArray[i][j] == 1) {
                // Checks alive cells for number of neighbours
                switch ((rowArray[mod(i - 1, rowArray.length)][mod(j - 1, rowArray[i].length)]
                    + rowArray[mod(i - 1, rowArray.length)][j]
                    + rowArray[mod(i - 1, rowArray.length)][mod(j + 1, rowArray[i].length)])
                + (rowArray[i][mod(j - 1, rowArray[i].length)]
                    + rowArray[i][mod(j + 1, rowArray[i].length)])
                + (rowArray[mod(i + 1, rowArray.length)][mod(j - 1, rowArray[i].length)]
                    + rowArray[mod(i + 1, rowArray.length)][j]
                    + rowArray[mod(i + 1, rowArray.length)][mod(j + 1, rowArray[i].length)])) {
                    case 2:
                        // Stay alive
                        break;
                    case 3:
                        // Stay alive
                        break;
                    default:
                        // Dead
                        changedArray.push([i, j]);
                }
            }
        }
    }

    arrayObjects.setChangedArray = changedArray;

    reDrawSpill();
    spilleSpill();
}

export { playInfinitySpillV4 };