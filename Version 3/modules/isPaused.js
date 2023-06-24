const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

import { playBoxedSpill } from "./playBoxedSpill.js";
import { playInfinitySpillV4 } from "./playInfinitySpill.js";
import { typeObjects } from "./objects.js";
import { pauseObject } from "./pauseSpill.js";

// Checks if game is paused after a new generation has been started and pauses it
function isPaused() {
    let typeLevel = typeObjects.getTypeLevel;

    if (!pauseObject.getPause) {
        if (typeLevel === 1) {
            playBoxedSpill();
        } else if (typeLevel === 2) {
            playInfinitySpillV4();
        }
    }
}

export {isPaused};