import { canvasObject, typeObjects, pauseObject } from "./modules/objects.js";
import { selectSpeed } from "./modules/selectSpeed.js";
import { paintLevel } from "./modules/paintLevel.js";
import { prepareSpill } from "./modules/prepareSpill.js";
import { startSpill } from "./modules/startSpill.js";

document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded() {
  // Used to show the speed name at the start
  selectSpeed();

  // Gets the canvas and it's context
  canvasObject.setBane = document.getElementById("bane");
  const bane = canvasObject.getBane;

  canvasObject.setInnhold = bane.getContext("2d");

  // Buttons and their actions
  document.getElementById("populateKnapp").onclick = function() {
    typeObjects.setTypeSpill = 1;
    prepareSpill();
  };
  document.getElementById("drawKnapp").onclick = function() {
    typeObjects.setTypeSpill = 2;
    prepareSpill();
  };

  document.getElementById("playBoxedKnapp").onclick = function () { 
    typeObjects.setTypeLevel = 1;
    startSpill();
  };
  document.getElementById("playInfinityKnapp").onclick = function () { 
    typeObjects.setTypeLevel = 2;
    startSpill();
  };

  document.getElementById("pauseKnapp").onclick = function () { 
    pauseObject.pauseSpill();
  };
  document.getElementById("fart").onchange = function () { 
    selectSpeed();
  };

  // Eventlistener for each time the board is clicked
  bane.addEventListener('click', function (event) {
    paintLevel(bane, event)
  });
}