const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

import { cell, typeObjects, generationsObject, aliveCountObject, pauseObject, arrayObjects} from "./objects.js";

//Redraws the risen/killed cells
function reDrawSpill() {
    const bane = document.getElementById("bane");
    const innhold = bane.getContext("2d");

    let rowArray = arrayObjects.getRowArray;
    let changedArray = arrayObjects.getChangedArray;

    for (var i = 0; i < changedArray.length; i++) {
        // If the cell was alive, but is now dead
        if (rowArray[changedArray[i][0]][changedArray[i][1]] == 1) {
            innhold.fillStyle = cell.getBackgroundColor;
            innhold.fillRect(changedArray[i][1] * cell.getRectSize, changedArray[i][0] * cell.getRectSize, cell.getCubeSize, cell.getCubeSize);
            rowArray[changedArray[i][0]][changedArray[i][1]] = 0;
            // If the cell was dead, but is now alive
        } else if (rowArray[changedArray[i][0]][changedArray[i][1]] == 0) {
            innhold.fillStyle = cell.getCellColor;
            innhold.fillRect(changedArray[i][1] * cell.getRectSize, changedArray[i][0] * cell.getRectSize, cell.getCubeSize, cell.getCubeSize);
            rowArray[changedArray[i][0]][changedArray[i][1]] = 1;
        }
    }

    arrayObjects.setRowArray = rowArray;

    generationsObject.increaseGenerations();
    let aliveCount = aliveCountObject.countAlives(rowArray);
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

export {reDrawSpill};