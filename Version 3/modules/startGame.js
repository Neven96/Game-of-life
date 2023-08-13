import { myHeaders } from "../helpers/header.js";
import { typeObjects } from "./objects.js";
import { pauseObject } from "./pauseGame.js";

// Starts the game
function startGame() {
    typeObjects.setStarted = true;
    typeObjects.setDrawable = false;

    // Fixes buttons to either disappear or appear
    document.getElementById("playBoxedKnapp").style.display = "none";
    document.getElementById("playInfinityKnapp").style.display = "none";
    document.getElementById("pauseKnapp").style.display = "initial";
    document.getElementById("pauseSpan").textContent = "Pause";

    // Starts the game by unpausing
    pauseObject.pauseGame();
}

export { startGame };