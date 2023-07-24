import { myHeaders } from "./header.js";
import { speedObject, typeObjects, arrayObjects, generationsObject } from "./objects.js";
import { playBoxedGame } from "./playBoxedGame.js";
import { playInfinityGame } from "./playInfinityGame.js";
import { pauseObject } from "./pauseGame.js";

// Waits for the next tick of the game
function waitGame() {
    if (typeObjects.getStarted && !pauseObject.getPause) {
        setTimeout(playGame, speedObject.getSpeed);
    }
}

// Calls the correct type of level and plays the game
function playGame() {
    if (!pauseObject.getPause) {
        // Increment the generations and resets the changedArray array
        generationsObject.increaseGenerations();
        let changedArray = arrayObjects.setChangedArray = [];

        if (typeObjects.getTypeLevel === 1) {
            playBoxedGame(changedArray);
        } else if (typeObjects.getTypeLevel === 2) {
            playInfinityGame(changedArray);
        }
    }
}

export { waitGame, playGame };