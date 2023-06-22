const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

import { isPaused } from "./isPaused.js";
import { speedObject, typeObjects, pauseObject, arrayObjects } from "./objects.js";

//Runs the game
function spilleSpill() {
    arrayObjects.setChangedArray = [];
    let speed = speedObject.getSpeed;
    let typeLevel = typeObjects.getTypeLevel;

    if (!pauseObject.getPause && typeObjects.getStarted) {
        let playGame = setTimeout(function () {
            isPaused(typeLevel);
        }, speed);
    }
}

export {spilleSpill};