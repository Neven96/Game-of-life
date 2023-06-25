const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

import { playBoxedGame } from "./playBoxedGame.js";
import { playInfinityGame } from "./playInfinityGame.js";
import { typeObjects } from "./objects.js";
import { pauseObject } from "./pauseGame.js";

// Checks if game is paused after a new generation has been started and pauses it
function isPaused() {
    let typeLevel = typeObjects.getTypeLevel;

    if (!pauseObject.getPause) {
        if (typeLevel === 1) {
            playBoxedGame();
        } else if (typeLevel === 2) {
            playInfinityGame();
        }
    }
}

export {isPaused};