const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

import { arrayObjects } from "./objects.js";
import { reDrawSpill } from "./reDrawSpill.js";
import { spilleSpill } from "./spilleSpill.js";

// With borders
function playBoxedSpill() {
    let rowArray = arrayObjects.getRowArray;
    let changedArray = arrayObjects.getChangedArray;

    for (var i = 0; i < rowArray.length; i++) {
        for (var j = 0; j < rowArray[i].length; j++) {
            // Top row
            if (i == 0) {
                // Top-left corner
                if (j == 0) {
                    if (rowArray[i][j] == 0) {
                        switch (rowArray[i][j + 1]
                        + rowArray[i + 1][j]
                        + rowArray[i + 1][j + 1]) {
                            case 3:
                                // Alive
                                changedArray.push([i, j]);
                        }
                    } else if (rowArray[i][j] == 1) {
                        switch (rowArray[i][j + 1]
                        + rowArray[i + 1][j]
                        + rowArray[i + 1][j + 1]) {
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
                // Top-right corner
                else if (j == rowArray[i].length - 1) {
                    if (rowArray[i][j] == 0) {
                        switch (rowArray[i][j - 1]
                        + rowArray[i + 1][j]
                        + rowArray[i + 1][j - 1]) {
                            case 3:
                                // Alive
                                changedArray.push([i, j]);
                        }
                    } else if (rowArray[i][j] == 1) {
                        switch (rowArray[i][j - 1]
                        + rowArray[i + 1][j]
                        + rowArray[i + 1][j - 1]) {
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
                // Rest of top row
                else {
                    if (rowArray[i][j] == 0) {
                        switch (rowArray[i][j - 1] + rowArray[i][j + 1]
                        + rowArray[i + 1][j - 1] + rowArray[i + 1][j]
                        + rowArray[i + 1][j + 1]) {
                            case 3:
                                // Alive
                                changedArray.push([i, j]);
                        }
                    } else if (rowArray[i][j] == 1) {
                        switch (rowArray[i][j - 1]
                        + rowArray[i][j + 1]
                        + rowArray[i + 1][j - 1]
                        + rowArray[i + 1][j]
                        + rowArray[i + 1][j + 1]) {
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
            } // Top row end

            // Bottom row
            else if (i == rowArray.length - 1) {
                // Bottom-left corner
                if (j == 0) {
                    if (rowArray[i][j] == 0) {
                        switch (rowArray[i][j + 1]
                        + rowArray[i - 1][j]
                        + rowArray[i - 1][j + 1]) {
                            case 3:
                                // Alive
                                changedArray.push([i, j]);
                        }
                    } else if (rowArray[i][j] == 1) {
                        switch (rowArray[i][j + 1]
                        + rowArray[i - 1][j]
                        + rowArray[i - 1][j + 1]) {
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
                // Bottom-right corner
                else if (j == rowArray[i].length - 1) {
                    if (rowArray[i][j] == 0) {
                        switch (rowArray[i][j - 1]
                        + rowArray[i - 1][j]
                        + rowArray[i - 1][j - 1]) {
                            case 3:
                                // Alive
                                changedArray.push([i, j]);
                        }
                    } else if (rowArray[i][j] == 1) {
                        switch (rowArray[i][j - 1]
                        + rowArray[i - 1][j]
                        + rowArray[i - 1][j - 1]) {
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
                // Rest of bottom row
                else {
                    if (rowArray[i][j] == 0) {
                        switch (rowArray[i][j - 1]
                        + rowArray[i][j + 1]
                        + rowArray[i - 1][j - 1]
                        + rowArray[i - 1][j]
                        + rowArray[i - 1][j + 1]) {
                            case 3:
                                // Alive
                                changedArray.push([i, j]);
                        }
                    } else if (rowArray[i][j] == 1) {
                        switch (rowArray[i][j - 1]
                        + rowArray[i][j + 1]
                        + rowArray[i - 1][j - 1]
                        + rowArray[i - 1][j]
                        + rowArray[i - 1][j + 1]) {
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
            } // Bottom row end

            //Between top and bottom row
            else {
                // Left column
                if (j == 0) {
                    if (rowArray[i][j] == 0) {
                        switch (rowArray[i - 1][j]
                        + rowArray[i - 1][j + 1]
                        + rowArray[i][j + 1]
                        + rowArray[i + 1][j]
                        + rowArray[i + 1][j + 1]) {
                            case 3:
                                // Alive
                                changedArray.push([i, j]);
                        }
                    } else if (rowArray[i][j] == 1) {
                        switch (rowArray[i - 1][j]
                        + rowArray[i - 1][j + 1]
                        + rowArray[i][j + 1]
                        + rowArray[i + 1][j]
                        + rowArray[i + 1][j + 1]) {
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
                // Right column
                else if (j == rowArray[i].length - 1) {
                    if (rowArray[i][j] == 0) {
                        switch (rowArray[i - 1][j]
                        + rowArray[i - 1][j - 1]
                        + rowArray[i][j - 1]
                        + rowArray[i + 1][j]
                        + rowArray[i + 1][j - 1]) {
                            case 3:
                                // Alive
                                changedArray.push([i, j]);
                        }
                    } else if (rowArray[i][j] == 1) {
                        switch (rowArray[i - 1][j]
                        + rowArray[i - 1][j - 1]
                        + rowArray[i][j - 1]
                        + rowArray[i + 1][j]
                        + rowArray[i + 1][j - 1]) {
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
                // Middle of map
                else {
                    if (rowArray[i][j] == 0) {
                        switch ((rowArray[i - 1][j - 1] + rowArray[i - 1][j] + rowArray[i - 1][j + 1])
                        + (rowArray[i][j - 1] + rowArray[i][j + 1])
                        + (rowArray[i + 1][j - 1] + rowArray[i + 1][j] + rowArray[i + 1][j + 1])) {
                            case 3:
                                // Alive
                                changedArray.push([i, j]);
                        }
                    } else if (rowArray[i][j] == 1) {
                        switch ((rowArray[i - 1][j - 1] + rowArray[i - 1][j] + rowArray[i - 1][j + 1])
                        + (rowArray[i][j - 1] + rowArray[i][j + 1])
                        + (rowArray[i + 1][j - 1] + rowArray[i + 1][j] + rowArray[i + 1][j + 1])) {
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
        }
    }

    arrayObjects.setChangedArray = changedArray;

    reDrawSpill();
    spilleSpill();
}

export {playBoxedSpill};