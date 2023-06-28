import { myHeaders } from "./header.js";
import { arrayObjects } from "./objects.js";
import { reDrawGame } from "./reDrawGame.js";
import { playGame } from "./playGame.js";

// With borders
function playBoxedGame() {
    let rowArray = arrayObjects.getRowArray;
    let changedArray = arrayObjects.getChangedArray;

    for (let row = 0; row < rowArray.length; row++) {
        for (let col = 0; col < rowArray[row].length; col++) {
            // Top row
            if (row == 0) {
                // Top-left corner
                if (col == 0) {
                    if (rowArray[row][col] == 0) {
                        switch (rowArray[row][col + 1]
                        + rowArray[row + 1][col]
                        + rowArray[row + 1][col + 1]) {
                            case 3:
                                // Alive
                                changedArray.push([row, col]);
                        }
                    } else if (rowArray[row][col] == 1) {
                        switch (rowArray[row][col + 1]
                        + rowArray[row + 1][col]
                        + rowArray[row + 1][col + 1]) {
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
                // Top-right corner
                else if (col == rowArray[row].length - 1) {
                    if (rowArray[row][col] == 0) {
                        switch (rowArray[row][col - 1]
                            + rowArray[row + 1][col]
                            + rowArray[row + 1][col - 1]) {
                            case 3:
                                // Alive
                                changedArray.push([row, col]);
                        }
                    } else if (rowArray[row][col] == 1) {
                        switch (rowArray[row][col - 1]
                            + rowArray[row + 1][col]
                            + rowArray[row + 1][col - 1]) {
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
                // Rest of top row
                else {
                    if (rowArray[row][col] == 0) {
                        switch (rowArray[row][col - 1] 
                            + rowArray[row][col + 1]
                            + rowArray[row + 1][col - 1] 
                            + rowArray[row + 1][col]
                            + rowArray[row + 1][col + 1]) {
                            case 3:
                                // Alive
                                changedArray.push([row, col]);
                        }
                    } else if (rowArray[row][col] == 1) {
                        switch (rowArray[row][col - 1]
                            + rowArray[row][col + 1]
                            + rowArray[row + 1][col - 1]
                            + rowArray[row + 1][col]
                            + rowArray[row + 1][col + 1]) {
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
            } // Top row end

            // Bottom row
            else if (row == rowArray.length - 1) {
                // Bottom-left corner
                if (col == 0) {
                    if (rowArray[row][col] == 0) {
                        switch (rowArray[row][col + 1]
                            + rowArray[row - 1][col]
                            + rowArray[row - 1][col + 1]) {
                            case 3:
                                // Alive
                                changedArray.push([row, col]);
                        }
                    } else if (rowArray[row][col] == 1) {
                        switch (rowArray[row][col + 1]
                            + rowArray[row - 1][col]
                            + rowArray[row - 1][col + 1]) {
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
                // Bottom-right corner
                else if (col == rowArray[row].length - 1) {
                    if (rowArray[row][col] == 0) {
                        switch (rowArray[row][col - 1]
                            + rowArray[row - 1][col]
                            + rowArray[row - 1][col - 1]) {
                            case 3:
                                // Alive
                                changedArray.push([row, col]);
                        }
                    } else if (rowArray[row][col] == 1) {
                        switch (rowArray[row][col - 1]
                            + rowArray[row - 1][col]
                            + rowArray[row - 1][col - 1]) {
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
                // Rest of bottom row
                else {
                    if (rowArray[row][col] == 0) {
                        switch (rowArray[row][col - 1]
                            + rowArray[row][col + 1]
                            + rowArray[row - 1][col - 1]
                            + rowArray[row - 1][col]
                            + rowArray[row - 1][col + 1]) {
                            case 3:
                                // Alive
                                changedArray.push([row, col]);
                        }
                    } else if (rowArray[row][col] == 1) {
                        switch (rowArray[row][col - 1]
                            + rowArray[row][col + 1]
                            + rowArray[row - 1][col - 1]
                            + rowArray[row - 1][col]
                            + rowArray[row - 1][col + 1]) {
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
            } // Bottom row end

            //Between top and bottom row
            else {
                // Left column
                if (col == 0) {
                    if (rowArray[row][col] == 0) {
                        switch (rowArray[row - 1][col]
                            + rowArray[row - 1][col + 1]
                            + rowArray[row][col + 1]
                            + rowArray[row + 1][col]
                            + rowArray[row + 1][col + 1]) {
                            case 3:
                                // Alive
                                changedArray.push([row, col]);
                        }
                    } else if (rowArray[row][col] == 1) {
                        switch (rowArray[row - 1][col]
                            + rowArray[row - 1][col + 1]
                            + rowArray[row][col + 1]
                            + rowArray[row + 1][col]
                            + rowArray[row + 1][col + 1]) {
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
                // Right column
                else if (col == rowArray[row].length - 1) {
                    if (rowArray[row][col] == 0) {
                        switch (rowArray[row - 1][col]
                            + rowArray[row - 1][col - 1]
                            + rowArray[row][col - 1]
                            + rowArray[row + 1][col]
                            + rowArray[row + 1][col - 1]) {
                            case 3:
                                // Alive
                                changedArray.push([row, col]);
                        }
                    } else if (rowArray[row][col] == 1) {
                        switch (rowArray[row - 1][col]
                            + rowArray[row - 1][col - 1]
                            + rowArray[row][col - 1]
                            + rowArray[row + 1][col]
                            + rowArray[row + 1][col - 1]) {
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
                // Middle of map
                else {
                    if (rowArray[row][col] == 0) {
                        switch (rowArray[row - 1][col - 1] 
                            + rowArray[row - 1][col] 
                            + rowArray[row - 1][col + 1]
                            + rowArray[row][col - 1] 
                            + rowArray[row][col + 1]
                            + rowArray[row + 1][col - 1] 
                            + rowArray[row + 1][col] 
                            + rowArray[row + 1][col + 1]) {
                            case 3:
                                // Alive
                                changedArray.push([row, col]);
                        }
                    } else if (rowArray[row][col] == 1) {
                        switch (rowArray[row - 1][col - 1] 
                            + rowArray[row - 1][col] 
                            + rowArray[row - 1][col + 1]
                            + rowArray[row][col - 1] 
                            + rowArray[row][col + 1]
                            + rowArray[row + 1][col - 1] 
                            + rowArray[row + 1][col] 
                            + rowArray[row + 1][col + 1]) {
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
        }
    }

    arrayObjects.setChangedArray = changedArray;

    reDrawGame();
    playGame();
}

export {playBoxedGame};