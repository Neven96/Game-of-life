import { myHeaders } from "./header.js";
import { waitGame } from "./playGame.js";

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
    pauseGame() {
        if (!this.pause) {

            this.pause = true;

            document.getElementById("pauseSpan").textContent = "Play";
        } else if (this.pause) {

            this.pause = false;

            waitGame();

            document.getElementById("pauseSpan").textContent = "Pause";
        }
    }
};

export { pauseObject };