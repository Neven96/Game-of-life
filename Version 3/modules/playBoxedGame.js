import { myHeaders } from "./header.js";
import { arrayObjects } from "./objects.js";
import { reDrawGame } from "./reDrawGame.js";
import { waitGame } from "./playGame.js";
import { aliveArrayChecker } from "./aliveArrayChecker.js";

// With borders
function playBoxedGame(changedArray) {
    let rowArray = arrayObjects.getRowArray;

    for (let row = 0; row < rowArray.length; row++) {
        for (let col = 0; col < rowArray[row].length; col++) {
            // Top row
            if (row == 0) {
                // Top-left corner
                if (col == 0) {
                    switch (rowArray[row][col + 1]
                          + rowArray[row + 1][col]
                          + rowArray[row + 1][col + 1]) {
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
                // Top-right corner
                else if (col == rowArray[row].length - 1) {
                    switch (rowArray[row][col - 1]
                          + rowArray[row + 1][col]
                          + rowArray[row + 1][col - 1]) {
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
                // Rest of top row
                else {
                    switch (rowArray[row][col - 1]
                          + rowArray[row][col + 1]
                          + rowArray[row + 1][col - 1]
                          + rowArray[row + 1][col]
                          + rowArray[row + 1][col + 1]) {
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
            } // Top row end

            // Bottom row
            else if (row == rowArray.length - 1) {
                // Bottom-left corner
                if (col == 0) {
                    switch (rowArray[row][col + 1]
                          + rowArray[row - 1][col]
                          + rowArray[row - 1][col + 1]) {
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
                // Bottom-right corner
                else if (col == rowArray[row].length - 1) {
                    switch (rowArray[row][col - 1]
                          + rowArray[row - 1][col]
                          + rowArray[row - 1][col - 1]) {
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
                // Rest of bottom row
                else {
                    switch (rowArray[row][col - 1]
                          + rowArray[row][col + 1]
                          + rowArray[row - 1][col - 1]
                          + rowArray[row - 1][col]
                          + rowArray[row - 1][col + 1]) {
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
            } // Bottom row end

            //Between top and bottom row
            else {
                // Left column
                if (col == 0) {
                    switch (rowArray[row - 1][col]
                          + rowArray[row - 1][col + 1]
                          + rowArray[row][col + 1]
                          + rowArray[row + 1][col]
                          + rowArray[row + 1][col + 1]) {
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
                // Right column
                else if (col == rowArray[row].length - 1) {
                    switch (rowArray[row - 1][col]
                          + rowArray[row - 1][col - 1]
                          + rowArray[row][col - 1]
                          + rowArray[row + 1][col]
                          + rowArray[row + 1][col - 1]) {
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
                // Middle of map
                else {
                    switch (rowArray[row - 1][col - 1]
                          + rowArray[row - 1][col]
                          + rowArray[row - 1][col + 1]
                          + rowArray[row][col - 1]
                          + rowArray[row][col + 1]
                          + rowArray[row + 1][col - 1]
                          + rowArray[row + 1][col]
                          + rowArray[row + 1][col + 1]) {
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
        }
    }

    arrayObjects.setChangedArray = changedArray;

    reDrawGame();
    aliveArrayChecker();
    waitGame();
}

export {playBoxedGame};