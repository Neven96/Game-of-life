import { myHeaders } from "./header.js";
import { speedObject, typeObjects, arrayObjects, generationsObject } from "./objects.js";
import { playBoxedGame } from "./playBoxedGame.js";
import { playInfinityGame } from "./playInfinityGame.js";
import { pauseObject } from "./pauseGame.js";

// Runs the game
function waitGame() {
    // Sets the tick rate of the game
    if (typeObjects.getStarted) {
        setTimeout(playGame, speedObject.getSpeed);
    }
}

// Checks if game is paused after a new generation has been started and pauses it
function playGame() {
    if (!pauseObject.getPause) {
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