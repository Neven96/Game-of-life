const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

import { isPaused } from "./isPaused.js";
import { speedObject, typeObjects, arrayObjects } from "./objects.js";

//Runs the game
function playGame() {
    arrayObjects.setChangedArray = [];

    if (typeObjects.getStarted) {
        setTimeout(isPaused, speedObject.getSpeed);
    }
}

export {playGame};