import { canvasObject, typeObjects } from "./modules/objects.js";
import { selectSpeed } from "./modules/selectSpeed.js";
import { paintLevel } from "./modules/paintLevel.js";
import { prepareSpill } from "./modules/prepareSpill.js";
import { startSpill } from "./modules/startSpill.js";
import { prepareBoard } from "./modules/prepareBoard.js";
import { pauseObject } from "./modules/pauseSpill.js";

document.addEventListener("DOMContentLoaded", domLoaded, false);
function domLoaded() {
  // Gets the canvas and its context
  canvasObject.setBane = document.getElementById("bane");
  const bane = canvasObject.getBane;

  canvasObject.setInnhold = bane.getContext("2d");

  // Used to show the speed name at the start
  selectSpeed();
  // Sets the board to show the cells at start
  prepareBoard();

  // Buttons and their actions
  // Readies a pre-populated game board
  document.getElementById("populateKnapp").onclick = function() {
    typeObjects.setTypeSpill = 1;
    prepareSpill();
  };

  // Readies the board for drawing 
  document.getElementById("drawKnapp").onclick = function() {
    typeObjects.setTypeSpill = 2;
    prepareSpill();
  };

  // Starts a game confied to the size of the board
  document.getElementById("playBoxedKnapp").onclick = function () { 
    typeObjects.setTypeLevel = 1;
    startSpill();
  };

  // Starts a game where the borders loop around
  document.getElementById("playInfinityKnapp").onclick = function () { 
    typeObjects.setTypeLevel = 2;
    startSpill();
  };

  // Pauses the game
  document.getElementById("pauseKnapp").onclick = function () { 
    pauseObject.pauseSpill();
  };

  // Gets the game speed form user input
  document.getElementById("speed").onchange = function () { 
    selectSpeed();
  };

  // Eventlistener for each time the board is clicked
  bane.addEventListener('click', function (event) {
    paintLevel(bane, event)
  });
}