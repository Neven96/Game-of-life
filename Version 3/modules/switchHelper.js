import { myHeaders } from "../helpers/header.js";

function switchHelper(row, col, rowArray, changedArray, sum) {
    switch (sum) {
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

export { switchHelper };