const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

import { isPaused } from "./isPaused.js";
import { speedObject, typeObjects, arrayObjects } from "./objects.js";

//Runs the game
function playGame() {
    arrayObjects.setChangedArray = [];
    let speed = speedObject.getSpeed;

    if (typeObjects.getStarted) {
        setTimeout(isPaused, speed);
    }
}

export {playGame};