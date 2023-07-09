import { myHeaders } from "./header.js";
import { typeObjects, generationsObject, aliveCountObject, arrayObjects } from "./objects.js";
import { pauseObject } from "./pauseGame.js";

// Function for updating the list of previous generations, and checking if life is dead or stabilized
function aliveArrayChecker() { 
    let aliveCount = aliveCountObject.countAlives(arrayObjects.getRowArray);
    let aliveArray = aliveCountObject.addToAliveArray(aliveCount);

    // Adds the number of alive cells to the latest generations table
    for (let i = 0; i < aliveArray.length; i++) {
        document.getElementById("aliveCell" + i).textContent = aliveArray[i];
    }

    let stabilizedSpan = document.getElementById("stabilizedSpan");

    // Checks if the aliveCount is 0, which means that no cells are alive and none can be created
    if (aliveCount === 0) {
        stabilizedSpan.style.color = "red";
        stabilizedSpan.textContent = "Life is dead"
        typeObjects.setEqualOnce = true;
        pauseObject.pauseGame();
    }

    if (!typeObjects.getEqualOnce) {
        if (aliveArray.length >= 20) {
            // Checks if all elements in the array are equal, returns boolean
            let equal = aliveArray.every((val, ind, arr) => val === arr[0]);
            if (equal) {
                stabilizedSpan.style.color = "green";
                stabilizedSpan.textContent = "Life is stabilized"
                typeObjects.setEqualOnce = true;
                pauseObject.pauseGame();
            }
        }
    }
}

export { aliveArrayChecker };