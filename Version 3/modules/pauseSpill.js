const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

import { typeObjects } from "./objects.js";
import { spilleSpill } from "./spilleSpill.js";

// Stores the value of pause in an object for easier access and storage
const pauseObject = {
    pause: true,

    get getPause() {
        return this.pause;
    },

    /**
     * @param {boolean} pause
     */
    set setPause(pause) {
        this.pause = pause;
    },

    //Pauses/unpauses the game
    pauseSpill() {
        if (!this.pause) {

            this.pause = true;

            document.getElementById("pauseSpan").textContent = "Play";
        } else if (this.pause) {

            this.pause = false;

            let typeLevel = typeObjects.getTypeLevel;
            spilleSpill(typeLevel);

            document.getElementById("pauseSpan").textContent = "Pause";
        }
    }
};

export { pauseObject };