import { myHeaders } from "./header.js";
import { isPaused } from "./isPaused.js";
import { speedObject, typeObjects, arrayObjects } from "./objects.js";

// Runs the game
function playGame() {
    arrayObjects.setChangedArray = [];

    // Sets the tick rate of the game
    if (typeObjects.getStarted) {
        setTimeout(isPaused, speedObject.getSpeed);
    }
}

export {playGame};