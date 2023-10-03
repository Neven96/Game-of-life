import { myHeaders } from "../helpers/header.js";
import { tickGame } from "./playGame.js";

// Stores the value of pause in an object for easier access and storage
const pauseObject = {
    pause: true,

    /**
     * @param {boolean} pause
     */
    set setPause(pause) {this.pause = pause;},

    get getPause() {return this.pause;},

    //Pauses/unpauses the game
    pauseGame() {
        if (!this.pause) {
            this.pause = true;

            document.getElementById("pauseSpan").textContent = "Play";
        } else if (this.pause) {
            this.pause = false;

            tickGame();

            document.getElementById("pauseSpan").textContent = "Pause";
        }
    }
};

export { pauseObject };