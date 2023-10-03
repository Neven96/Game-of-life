import { myHeaders } from "../helpers/header.js";
import { typeObjects, generationsObject, aliveCountObject, arrayObjects } from "./objects.js";
import { pauseObject } from "./pauseGame.js";

// Function for updating the list of previous generations, and checking if life is dead or stabilized
function aliveArrayChecker() { 
    // Gets the current alive count and adds it to the array
    let aliveCount = aliveCountObject.countAlives(arrayObjects.getRowArray);
    let aliveArray = aliveCountObject.addToAliveArray(aliveCount);

    let stabilizedSpan = document.getElementById("stabilizedSpan");

    // Adds the number of alive cells to the latest generations table
    for (let i = 0; i < aliveArray.length; i++) {
        document.getElementById("aliveCell" + i).textContent = aliveArray[i];
    }

    // Checks if the aliveCount is 0, which means that no cells are alive and none can be created
    if (aliveCount === 0) {
        stabilizedSpan.style.color = "#FF0000";
        stabilizedSpan.textContent = "Life is dead"
        typeObjects.setEqualOnce = true;
        pauseObject.pauseGame();
    }

    // Checks if all elements in the array are equal
    let equal = aliveArray.every((val, ind, arr) => val === arr[0]);
    if (!typeObjects.getEqualOnce && aliveArray.length >= 20 && equal) {
        stabilizedSpan.style.color = "#00FF00";
        stabilizedSpan.textContent = "Life is stabilized"
        typeObjects.setEqualOnce = true;
        pauseObject.pauseGame();
    }
}

export { aliveArrayChecker };