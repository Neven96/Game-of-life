import { myHeaders } from "./header.js";
import { playBoxedGame } from "./playBoxedGame.js";
import { playInfinityGame } from "./playInfinityGame.js";
import { typeObjects } from "./objects.js";
import { pauseObject } from "./pauseGame.js";

// Checks if game is paused after a new generation has been started and pauses it
function isPaused() {
    if (!pauseObject.getPause) {
        if (typeObjects.getTypeLevel === 1) {
            playBoxedGame();
        } else if (typeObjects.getTypeLevel === 2) {
            playInfinityGame();
        }
    }
}

export {isPaused};