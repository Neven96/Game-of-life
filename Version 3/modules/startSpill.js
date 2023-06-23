const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

import { typeObjects, pauseObject } from "./objects.js";

// Starts the game
function startSpill() {

    typeObjects.setStarted = true;
    typeObjects.setDrawable = false;

    document.getElementById("playBoxedKnapp").style.display = "none";
    document.getElementById("playInfinityKnapp").style.display = "none";
    document.getElementById("pauseKnapp").style.display = "initial";
    document.getElementById("pauseSpan").textContent = "Pause";

    // Starts the game by unpausing
    pauseObject.pauseSpill();
}

export { startSpill };