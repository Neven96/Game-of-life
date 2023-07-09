import { myHeaders } from "./header.js";
import { arrayObjects } from "./objects.js";
import { reDrawGame } from "./reDrawGame.js";

// Populates the board randomly
function populateGame() {
    let rowArray = arrayObjects.getRowArray;
    arrayObjects.setChangedArray = [];
    let changedArray = arrayObjects.getChangedArray;

    let percentageAlive = document.getElementById("lifePercent").value;
    // Sets a min and max percentage, just to not break the game
    if (percentageAlive <= 0) {
        percentageAlive = 10;
    } else if (percentageAlive >= 50) {
        percentageAlive = 50;
    }

    // Randomly populates the board with cells, depending on the percentage of alive chosen
    // randNum gives an integer from 1 to 100/percent, if it's 1 it's alive, else it's dead
    for (let i = 0; i < rowArray.length; i++) {
        for (let j = 0; j < rowArray[i].length; j++) {
            let randNum = Math.floor((Math.random() * (100 / percentageAlive)) + 1);
            if (randNum <= 1) {
                changedArray.push([i, j])
            }
        }
    }

    arrayObjects.setChangedArray = changedArray;

    reDrawGame();
}

export { populateGame };