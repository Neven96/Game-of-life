import { cell, canvasObject, arrayObjects, typeObjects, generationsObject, aliveCountObject, pauseObject } from "./modules/objects.js";
import { selectSpeed } from "./modules/selectSpeed.js";

document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded() {
  // Used to show the speed name at the start
  selectSpeed();

  canvasObject.setBane = document.getElementById("bane");
  canvasObject.setInnhold = canvasObject.getBane.getContext("2d");

  const bane = canvasObject.getBane;

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

  // Creates board and chooses gametype
  function prepareSpill() {
    generationsObject.setGenerations = 0;
    aliveCountObject.setAliveCount = 0;

    typeObjects.setStarted = false;
    typeObjects.setEqualOnce = false;
    pauseObject.setPause = true;

    arrayObjects.setRowArray = [];
    arrayObjects.setChangedArray = [];
    aliveCountObject.setAliveArray = [];

    let columnArray = [];
    let rowArray = arrayObjects.getRowArray;

    let typeSpill = typeObjects.getTypeSpill;

    let aliveCell = document.getElementsByClassName("aliveCell");
    
    for (let i = 0; i < aliveCell.length; i++) {
      aliveCell[i].textContent = "";
    }

    for (var i = 0; i <= bane.height / (cell.getRectSize); i++) {
      columnArray = [];
      for (var j = 0; j <= bane.width / (cell.getRectSize); j++) {
        columnArray[j] = 0;
      }
      rowArray[i] = columnArray;
    }

    arrayObjects.setRowArray = rowArray;

    if (typeSpill === 1) {
      populateSpill();
      typeObjects.setDrawable = false;

      document.getElementById("populateSpan").textContent = "Repopulate";
      document.getElementById("drawSpan").textContent = "Draw";
    } else if (typeSpill === 2) {
      typeObjects.setDrawable = true;

      document.getElementById("populateSpan").textContent = "Populate";
      document.getElementById("drawSpan").textContent = "Redraw";
    }

    drawSpill();

    document.getElementById("pauseKnapp").style.display = "none";
    document.getElementById("playBoxedKnapp").style.display = "initial";
    document.getElementById("playInfinityKnapp").style.display = "initial";
    document.getElementById("stabilizedSpan").textContent = "";
  }

  // Populates the board randomly
  function populateSpill() {
    let rowArray = arrayObjects.getRowArray;

    let percentageAlive = document.getElementById("prosent").value;
    if (percentageAlive <= 0) {
      percentageAlive = 10;
    } else if (percentageAlive >= 50) {
      percentageAlive = 50;
    }

    for (var i = 0; i < rowArray.length; i++) {
      for (var j = 0; j < rowArray[i].length; j++) {
        let randNum = Math.floor((Math.random() * (100 / percentageAlive)) + 1);
        if (randNum <= 1) {
          rowArray[i][j] = 1;
        } else {
          rowArray[i][j] = 0;
        }
      }
    }

    drawSpill();
  }

  // Eventlistener for each time the board is clicked
  bane.addEventListener('click', function (e) {
    paintLevel(bane, e)
  });

  //Allows painting on grid
  function paintLevel(bane, event) {
    let rowArray = arrayObjects.getRowArray;

    if (typeObjects.getDrawable) {
      const rect = bane.getBoundingClientRect();
      // Finds the x and y coordinates of the board
      // This is somewhat off from my coordinates, not sure why
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      // Derives the start coordinates of the cell from the size of it
      let x_true = (Math.floor(x / cell.getRectSize) * cell.getRectSize);
      let y_true = (Math.floor(y / cell.getRectSize) * cell.getRectSize);
      // Derives the index of the cell in the rowArray array
      let x_array_index = x_true / (cell.getRectSize);
      let y_array_index = y_true / (cell.getRectSize);

      if (rowArray[y_array_index][x_array_index] == 0) {
        rowArray[y_array_index][x_array_index] = 1;
      } else if (rowArray[y_array_index][x_array_index] == 1) {
        rowArray[y_array_index][x_array_index] = 0;
      }
      drawSpill();
    }
  }

  //Draws the level
  function drawSpill() {
    let rowArray = arrayObjects.getRowArray;
    let innhold = canvasObject.getInnhold;

    for (var i = 0; i < rowArray.length; i++) {
      for (var j = 0; j < rowArray[i].length; j++) {
        // If the cell is alive
        if (rowArray[i][j] == 1) {
          innhold.fillStyle = cell.getCellColor;
          innhold.fillRect(j*cell.getRectSize,i*cell.getRectSize,cell.getCubeSize,cell.getCubeSize);
        // If the cell is alive
        } else {
          innhold.fillStyle = cell.getBackgroundColor;
          innhold.fillRect(j*cell.getRectSize,i*cell.getRectSize,cell.getCubeSize,cell.getCubeSize);
        }
      }
    }

    let aliveCount = aliveCountObject.countAlives(rowArray);

    document.getElementById("generationsSpan").textContent = generationsObject.getGenerations;
    document.getElementById("aliveSpan").textContent = aliveCount;
  }

  //Starts the game
  function startSpill() {

    typeObjects.setStarted = true;
    typeObjects.setDrawable = false;
    let typeLevel = typeObjects.getTypeLevel;
    
    document.getElementById("playBoxedKnapp").style.display = "none";
    document.getElementById("playInfinityKnapp").style.display = "none";
    document.getElementById("pauseKnapp").style.display = "initial";
    document.getElementById("pauseSpan").textContent = "Pause";

    // Starts the game by unpausing
    pauseObject.pauseSpill();
  }
}