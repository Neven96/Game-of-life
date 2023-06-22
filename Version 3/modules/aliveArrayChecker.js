const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

import { typeObjects, generationsObject, aliveCountObject, pauseObject, arrayObjects } from "./objects.js";

// Function for updating the list of previous generations, and checking if life is dead or stabilized
function aliveArrayChecker() { 
    generationsObject.increaseGenerations();

    let aliveCount = aliveCountObject.countAlives(arrayObjects.getRowArray);
    let aliveArray = aliveCountObject.createArray(aliveCount);

    for (let i = 0; i < aliveArray.length; i++) {
        document.getElementById("aliveCell" + i).textContent = aliveArray[i];
    }

    let stabilizedSpan = document.getElementById("stabilizedSpan");

    if (!typeObjects.getEqualOnce) {
        if (aliveCount === 0) {
            stabilizedSpan.style.color = "red";
            stabilizedSpan.textContent = "Life is dead"
            typeObjects.setEqualOnce = true;
            pauseObject.pauseSpill();
        }

        if (aliveArray.length >= 20) {
            let equal = aliveArray.every((val, ind, arr) => val === arr[0]);
            if (equal) {
                stabilizedSpan.style.color = "green";
                stabilizedSpan.textContent = "Life is stabilized"
                typeObjects.setEqualOnce = true;
                pauseObject.pauseSpill();
            }
        }
    }

    document.getElementById("generationsSpan").textContent = generationsObject.getGenerations;
    document.getElementById("aliveSpan").textContent = aliveCount;    
}

export { aliveArrayChecker };