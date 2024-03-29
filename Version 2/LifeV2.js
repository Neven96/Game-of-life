function mod(n, m) {
  return ((n % m) + m) % m;
}

document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded() {

  // OBJECTS
  // Stores all size and colors of the cell
  class Cell {
    constructor(rectSize, cubeSize, cellColor, backgroundColor) {
      this.rectSize = rectSize;
      this.cubeSize = cubeSize;
      this.cellColor = cellColor;
      this.backgroundColor = backgroundColor;
    }

    get getRectSize() {
      return this.rectSize;
    }

    get getCubeSize() {
      return this.cubeSize;
    }

    get getCellColor() {
      return this.cellColor;
    }

    get getBackgroundColor() {
      return this.backgroundColor;
    }
  };

  // Sets the speed, so that we don't have to use the switch statement each round
  const speedObject = {
    speed: 500,

    get getSpeed() {
      return this.speed;
    },

    /**
     * @param {number} speed
     */
    set setSpeed(speed) {
      this.speed = speed;
    }
  };

  // Sets the type of level, type of game, if the board is drawable, if the game has started, and if the game is stagnated
  const typeObjects = {
    typeLevel: 1,
    typeSpill: 1,
    drawable: false,
    started: false,
    equalOnce: false,

    // TypeLevel
    get getTypeLevel() {
      return this.typeLevel;
    },

    /**
     * @param {number} typeLevel
     */
    set setTypeLevel(typeLevel) {
      this.typeLevel = typeLevel;
    },

    // TypeSpill
    get getTypeSpill() {
      return this.typeSpill;
    },

    /**
     * @param {number} typeSpill
     */
    set setTypeSpill(typeSpill) {
      this.typeSpill = typeSpill;
    },

    // Drawable
    get getDrawable() {
      return this.drawable
    },

    /**
     * @param {boolean} drawable
     */
    set setDrawable(drawable) {
      this.drawable = drawable;
    },

    // Started
    get getStarted() {
      return this.started;
    },

    /**
     * @param {boolean} started
     */
    set setStarted(started) {
      this.started = started;
    },

    // Equal Once
    get getEqualOnce() {
      return this.equalOnce;
    },

    /**
     * @param {boolean} equalOnce
     */
    set setEqualOnce(equalOnce) {
      this.equalOnce = equalOnce;
    }
  };

  const generationsObject = {
    generations: 0,
    generationsArray: [],

    get getGenerations() {
      return this.generations;
    },

    /**
     * @param {number} generations
     */
    set setGenerations(generations) {
      this.generations = generations;
    },

    get getGenerationsArray() {
      return this.generationsArray;
    },

    /**
     * @param {never[]} generationsArray
     */
    set setGenerationsArray(generationsArray) {
      this.generationsArray = generationsArray;
    },

    increaseGenerations() {
      this.generations++;
    }
  };

  const aliveCountObject = {
    aliveCount: 0,
    aliveArray: [],

    get getAliveCount() {
      return this.aliveCount;
    },

    /**
     * @param {number} aliveCount
     */
    set setAliveCount(aliveCount) {
      this.aliveCount = aliveCount;
    },

    get getAliveArray() {
      return this.aliveArray;
    },

    /**
     * @param {never[]} aliveArray
     */
    set setAliveArray(aliveArray) {
      this.aliveArray = aliveArray;
    },

    countAlives(array) {
      this.aliveCount = 0;
      array.forEach(element => {
        element.forEach(index => {
          if (index === 1) {
            this.aliveCount += 1;
          }
       });
      });

      return this.aliveCount;
    },

    createArray(aliveCount) {
      if (this.aliveArray.length < 10) {
        this.aliveArray.push(aliveCount);
      } else {
        this.aliveArray.shift();
        this.aliveArray.push(aliveCount);
      }

      return this.aliveArray;
    }
  };

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
        typeLevel = typeObjects.getTypeLevel;
        spilleSpill(typeLevel);
        document.getElementById("pauseSpan").textContent = "Pause";
      }
    }
  };

  // Global variables
  let rowArray;
  let columnArray;
  let changedArray;

  // Object for cell size and colors
  const cell = new Cell(8, 7, "#0000FF", "#D3D3D3");

  // Used to show the speed name at the start
  selectSpeed();

  const bane = document.getElementById("bane");
  const innhold = bane.getContext("2d");

  // Buttons and their actions
  document.getElementById("populateKnapp").onclick = function() {
    typeObjects.setTypeSpill = 1;
    populateSpill();
  };
  document.getElementById("drawKnapp").onclick = function() {
    typeObjects.setTypeSpill = 2;
    populateSpill();
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

  //Creates board and chooses type of game
  function populateSpill() {
    generationsObject.setGenerations = 0;
    aliveCount = aliveCountObject.getAliveCount;

    typeObjects.setStarted = false;
    typeObjects.setEqualOnce = false;
    pauseObject.setPause = true;

    rowArray = [];
    columnArray = [];
    changedArray = [];
    aliveCountObject.setAliveArray = [];

    typeSpill = typeObjects.getTypeSpill;

    // The game auto-populates the board
    if (typeSpill == 1) {

      let percentageAlive = document.getElementById("prosent").value;
      if (percentageAlive <= 0) {
        percentageAlive = 10;
      } else if (percentageAlive >= 50) {
        percentageAlive = 50;
      }

      for (var i = 0; i <= bane.height/(cell.getRectSize); i++) {
        columnArray = [];
        for (var j = 0; j <= bane.width/(cell.getRectSize); j++) {
          randNum = Math.floor((Math.random() * (100/percentageAlive)) + 1);
          if (randNum <= 1) {
            columnArray[j] = 1;
          } else {
            columnArray[j] = 0;
          }
        }
        rowArray[i] = columnArray;
      }

      document.getElementById("populateSpan").textContent = "Repopulate";
      document.getElementById("drawSpan").textContent = "Draw";

      typeObjects.setDrawable = false;

    // The game is ready for drawing(dotting) the board
    } else if (typeSpill == 2) {

      for (var i = 0; i <= bane.height/(cell.getRectSize); i++) {
        columnArray = [];
        for (var j = 0; j <= bane.width/(cell.getRectSize); j++) {
          columnArray[j] = 0;
        }
        rowArray[i] = columnArray;
      }

      document.getElementById("populateSpan").textContent = "Populate";
      document.getElementById("drawSpan").textContent = "Redraw";

      typeObjects.setDrawable = true;
    }

    drawSpill();

    document.getElementById("pauseKnapp").style.display = "none";
    document.getElementById("playBoxedKnapp").style.display = "initial";
    document.getElementById("playInfinityKnapp").style.display = "initial";
    document.getElementById("stabilizedSpan").textContent = "";
  }

  bane.addEventListener('click', function (e) {
    paintLevel(bane, e)
  });

  //Allows painting on grid
  function paintLevel(bane, event) {
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

    aliveCount = aliveCountObject.countAlives(rowArray);

    document.getElementById("generationsSpan").textContent = generationsObject.getGenerations;
    document.getElementById("aliveSpan").textContent = aliveCount;
  }

  //Redraws the risen/killed cells
  function reDrawSpill(changedArray) {
    for (var i = 0; i < changedArray.length; i++) {
      // If the cell was alive, but is now dead
      if (rowArray[changedArray[i][0]][changedArray[i][1]] == 1) {
        innhold.fillStyle = cell.getBackgroundColor;
        innhold.fillRect(changedArray[i][1]*cell.getRectSize,changedArray[i][0]*cell.getRectSize,cell.getCubeSize,cell.getCubeSize);
        rowArray[changedArray[i][0]][changedArray[i][1]] = 0;
      // If the cell was dead, but is now alive
      } else if (rowArray[changedArray[i][0]][changedArray[i][1]] == 0) {
        innhold.fillStyle = cell.getCellColor;
        innhold.fillRect(changedArray[i][1]*cell.getRectSize,changedArray[i][0]*cell.getRectSize,cell.getCubeSize,cell.getCubeSize);
        rowArray[changedArray[i][0]][changedArray[i][1]] = 1;
      }
    }

    generationsObject.increaseGenerations();
    aliveCount = aliveCountObject.countAlives(rowArray);
    aliveArray = aliveCountObject.createArray(aliveCount);

    for (let i = 0; i < aliveArray.length; i++) {
      document.getElementById("aliveCell"+i).textContent = aliveArray[i];
    }

    if (!typeObjects.getEqualOnce) {
      if (aliveCount === 0) {
        document.getElementById("stabilizedSpan").textContent = "Life is dead"
        typeObjects.setEqualOnce = true;
        pauseObject.pauseSpill();
      }

      if (aliveArray.length >= 10) {
        equal = aliveArray.every((val, ind, arr) => val === arr[0]);
        if (equal) {
          document.getElementById("stabilizedSpan").textContent = "Life is stabilized"
          typeObjects.setEqualOnce = true;
          pauseObject.pauseSpill();
        }
      } 
    }

    document.getElementById("generationsSpan").textContent = generationsObject.getGenerations;
    document.getElementById("aliveSpan").textContent = aliveCount;
  }

  //Changes gamespeed
  function selectSpeed() {
    let gameSpeed = document.getElementById("fart").value;
    gameSpeed = parseInt(gameSpeed);
    switch (gameSpeed) {
      case 1:
        speedName = "Slowester";
        speed = 3000;
        break;
      case 2:
        speedName = "Slowest";
        speed = 2250;
        break;
      case 3:
        speedName = "Slower";
        speed = 1250;
        break;
      case 4:
        speedName = "Slow";
        speed = 750;
        break;
      case 5:
        speedName = "Normal";
        speed = 500;
        break;
      case 6:
        speedName = "Fast";
        speed = 250;
        break;
      case 7:
        speedName = "Faster";
        speed = 150;
        break;
      case 8:
        speedName = "Fastest";
        speed = 75;
        break;
      case 9:
        speedName = "Fastester"
        speed = 30;
        break;
      default:
        speedName = "Normal";
        speed = 500;
    }

    document.getElementById("speedOutSpan").textContent = speedName;
    speedObject.setSpeed = speed;
  }

  //Starts the game
  function startSpill() {

    typeObjects.setStarted = true;
    typeObjects.setDrawable = false;
    typeLevel = typeObjects.getTypeLevel;
    
    document.getElementById("playBoxedKnapp").style.display = "none";
    document.getElementById("playInfinityKnapp").style.display = "none";
    document.getElementById("pauseKnapp").style.display = "initial";
    document.getElementById("pauseSpan").textContent = "Pause";

    // Starts the game by unpausing
    pauseObject.pauseSpill();
  }

  //Runs the game
  function spilleSpill(typeLevel) {
    changedArray = [];
    speed = speedObject.getSpeed;

    if (!pauseObject.getPause && typeObjects.getStarted) {
      playGame = setTimeout(function () {
        isPaused(typeLevel);
      }, speed);
    }
  }

  function isPaused(typeLevel) {
    if (!pauseObject.getPause) {
      if (typeLevel === 1) {
        playBoxedSpill();
      } else if (typeLevel === 2) {
        playInfinitySpillV4();
      }
    }
  }

  // Without borders, new render, much faster than every other
  function playInfinitySpillV4() {
    // Get the length before the array to speed it up a little
    let rowArrayLength = rowArray.length;
    for (let row = 0; row < rowArrayLength; row++) {

      // Get the length before the array to speed it up a little
      let rowArrayRowLength = rowArray[row].length;
      for (let col = 0; col < rowArrayRowLength; col++) {
        // Finds the number of neighbors of one cell
        switchHelper(row, col, rowArray, changedArray,
          rowArray[mod(row - 1, rowArray.length)][mod(col - 1, rowArray[row].length)]
          + rowArray[mod(row - 1, rowArray.length)][col]
          + rowArray[mod(row - 1, rowArray.length)][mod(col + 1, rowArray[row].length)]
          + rowArray[row][mod(col - 1, rowArray[row].length)]
          + rowArray[row][mod(col + 1, rowArray[row].length)]
          + rowArray[mod(row + 1, rowArray.length)][mod(col - 1, rowArray[row].length)]
          + rowArray[mod(row + 1, rowArray.length)][col]
          + rowArray[mod(row + 1, rowArray.length)][mod(col + 1, rowArray[row].length)])
      }
    }

    typeLevel = typeObjects.getTypeLevel;

    reDrawSpill(changedArray);
    spilleSpill(typeLevel);
  }

  // With borders
  function playBoxedSpill() {
    // Get the length before the array to speed it up a little
    let rowArrayLength = rowArray.length;
    for (let row = 0; row < rowArrayLength; row++) {

      // Get the length before the array to speed it up a little
      let rowArrayRowLength = rowArray[row].length;
      for (let col = 0; col < rowArrayRowLength; col++) {
        // Top row
        if (row == 0) {
          // Top-left corner
          if (col == 0) {
            switchHelper(row, col, rowArray, changedArray, rowArray[row][col + 1]
              + rowArray[row + 1][col]
              + rowArray[row + 1][col + 1]);
          }
          // Top-right corner
          else if (col == rowArray[row].length - 1) {
            switchHelper(row, col, rowArray, changedArray, rowArray[row][col - 1]
              + rowArray[row + 1][col]
              + rowArray[row + 1][col - 1]);
          }
          // Rest of top row
          else {
            switchHelper(row, col, rowArray, changedArray, rowArray[row][col - 1]
              + rowArray[row][col + 1]
              + rowArray[row + 1][col - 1]
              + rowArray[row + 1][col]
              + rowArray[row + 1][col + 1]);
          }
        } // Top row end

        // Bottom row
        else if (row == rowArray.length - 1) {
          // Bottom-left corner
          if (col == 0) {
            switchHelper(row, col, rowArray, changedArray, rowArray[row][col + 1]
              + rowArray[row - 1][col]
              + rowArray[row - 1][col + 1]);
          }
          // Bottom-right corner
          else if (col == rowArray[row].length - 1) {
            switchHelper(row, col, rowArray, changedArray, rowArray[row][col - 1]
              + rowArray[row - 1][col]
              + rowArray[row - 1][col - 1]);
          }
          // Rest of bottom row
          else {
            switchHelper(row, col, rowArray, changedArray, rowArray[row][col - 1]
              + rowArray[row][col + 1]
              + rowArray[row - 1][col - 1]
              + rowArray[row - 1][col]
              + rowArray[row - 1][col + 1]);
          }
        } // Bottom row end

        //Between top and bottom row
        else {
          // Left column
          if (col == 0) {
            switchHelper(row, col, rowArray, changedArray, rowArray[row - 1][col]
              + rowArray[row - 1][col + 1]
              + rowArray[row][col + 1]
              + rowArray[row + 1][col]
              + rowArray[row + 1][col + 1]);
          }
          // Right column
          else if (col == rowArray[row].length - 1) {
            switchHelper(row, col, rowArray, changedArray, rowArray[row - 1][col]
              + rowArray[row - 1][col - 1]
              + rowArray[row][col - 1]
              + rowArray[row + 1][col]
              + rowArray[row + 1][col - 1]);
          }
          // Middle of map
          else {
            switchHelper(row, col, rowArray, changedArray, rowArray[row - 1][col - 1]
              + rowArray[row - 1][col]
              + rowArray[row - 1][col + 1]
              + rowArray[row][col - 1]
              + rowArray[row][col + 1]
              + rowArray[row + 1][col - 1]
              + rowArray[row + 1][col]
              + rowArray[row + 1][col + 1]);
          }
        }
      }
    }

    typeLevel = typeObjects.getTypeLevel;

    reDrawSpill(changedArray);
    spilleSpill(typeLevel);
  }

  function switchHelper(row, col, rowArray, changedArray, sum) {
    switch (sum) {
      case 2:
        // Stay alive/dead
        break;
      case 3:
        // Stay alive/awaken
        if (rowArray[row][col] == 0) {
          changedArray.push([row, col]);
        }
        break;
      default:
        // Killed
        if (rowArray[row][col] == 1) {
          changedArray.push([row, col]);
        }
        break;
    }
  }
}
